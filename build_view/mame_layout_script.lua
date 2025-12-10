-- Keep track of the pointer managers
pointer_managers = {}

-- file is the layout file object
-- set a function to call after resolving tags
file:set_resolve_tags_callback(
	function ()
		for view_name, view in pairs(file.views) do
			-- Hide the warning about requiring the Layout plugin.
			view.items["plugin_warning"]:set_state(0)

			local manager = PointerManager:create(view)
			pointer_managers[view_name] = manager

--CODE--

		end
	end
)

-- Keep track of media change notifiers
media_change_notifiers = {}
function add_media_change_notifier(view, id, tag)
	local media_element = view.items[id]
	local image = machine.images[tag]
	media_element:set_state(image.exists and 1 or 0)
	return image:add_media_change_notifier(
		function(loaded)
			media_element:set_state(loaded == "loaded" and 1 or 0)
		end
	)
end

-----------------------------------------------------------------------
-- Keys and Sliders library starts.
-- Can be copied as-is to other layouts.
-- It is simplified from the original Slider library:
-- * This one never reads from the port, only writes to it.
-- * Only when clickling on the knob itself does it start to drag the knob.
-- * The value is calculated based on the position of the knob within the click area.
-- But also extended to handle keys on piano-like keyboard.
-----------------------------------------------------------------------

local function clamp(x, min, max)
	if x < min then return min elseif x > max then return max else return x end
end

local function find_ioport(port_name)
	local port

	if port_name:byte(1) == string.byte(":") then
		port = machine.ioport.ports[port_name]
	else
		port = file.device:ioport(port_name)
	end

	if port == nil then
		emu.print_error("Port: '" .. port_name .. "' not found.")
	end

	return port
end

local function find_ioport_field(port_name)
	local port = find_ioport(port_name)
	if port == nil then
		return nil
	end

	local field
	for k, val in pairs(port.fields) do
		field = val
		break
	end

	if field == nil then
		emu.print_error("Port: '" .. port_name .."' does not seem to have any fields.")
	end

	return field
end

local function set_field_value(field, new_value)
	if field.is_analog then
		field:set_value(new_value)
	else
		field.user_value = new_value
	end
end

PointerManager = {}

function PointerManager:create(view)
	local instance = {
		view = view,
		pointers = {},     -- Tracks pointer state.
		handlers = {},     -- the handlers for each target

		-- No setmetatable in the layout plugin. Manually copy methods across.
		addHandler = self.addHandler,
		pointerUpdated = self.pointerUpdated,
		releasePointer = self.releasePointer,
		pointerLeft = self.pointerLeft,
		pointerAborted = self.pointerAborted,
		forgetPointers = self.forgetPointers,
		registerCallbacks = self.registerCallbacks,
		unregisterCallbacks = self.unregisterCallbacks,
	}

	instance:registerCallbacks()
	return instance
end

function PointerManager:addHandler(handler)
	table.insert(self.handlers, handler)
end

function PointerManager:pointerUpdated(type, id, dev, x, y, btn, dn, up, cnt)
	local pointer = self.pointers[id]
	if pointer == nil then
		pointer = { id = id, active = nil }
		self.pointers[id] = pointer
	end

	-- If button 1 is released, reset the state of the current pointer.
	if up & 1 ~= 0 then
		self:releasePointer(id)
		return
	end

	if pointer.active ~= nil then
		-- give the current active handler a stab at this event.
		-- if it wants to continue processing these events, it returns itself;
		-- if it is done, it will return nil, thus allowing this method to look
		-- for a different handler.

		pointer.active = pointer.active.handler:pointerUpdated(pointer.active, type, id, dev, x, y, btn, dn, up, cnt)
	end

	if pointer.active == nil then
		-- No current active handler state, let's see if any handler wants to claim this event.
		for i, handler in ipairs(self.handlers) do
			pointer.active = handler:pointerUpdated(nil, type, id, dev, x, y, btn, dn, up, cnt)
			if pointer.active ~= nil then
				break
			end
		end
	end
end

function PointerManager:releasePointer(id)
	local pointer = self.pointers[id]

	if pointer ~= nil then
		if pointer.active ~= nil then
			pointer.active.handler:releasePointer(id, pointer.active)
		end
		pointer.active = nil
	end

	self.pointers[id] = nil
end

function PointerManager:pointerLeft(type, id, dev, x, y, up, cnt)
	self:releasePointer(id)
end

function PointerManager:pointerAborted(type, id, dev, x, y, up, cnt)
	self:releasePointer(id)
end

function PointerManager:forgetPointers()
	for id, pointer in pairs(self.pointers) do
		self:releasePointer(id)
	end
	self.pointers = {}
end

function PointerManager:registerCallbacks()
	self.view:set_pointer_updated_callback(function(type, id, dev, x, y, btn, dn, up, cnt)
		self:pointerUpdated(type, id, dev, x, y, btn, dn, up, cnt)
	end)

	self.view:set_pointer_left_callback(function(type, id, dev, x, y, up, cnt)
		self:pointerLeft(type, id, dev, x, y, up, cnt)
	end)

	self.view:set_pointer_aborted_callback(function(type, id, dev, x, y, up, cnt)
		self:pointerAborted(type, id, dev, x, y, up, cnt)
	end)

	self.view:set_forget_pointers_callback(function()
		self:forgetPointers()
	end)
end

function PointerManager:unregisterCallbacks()
	self.view:set_pointer_updated_callback(nil)
	self.view:set_pointer_left_callback(nil)
	self.view:set_pointer_aborted_callback(nil)
	self.view:set_forget_pointers_callback(nil)
end

--
-- The Slider Handler
--

SliderHandler = {}

-- The knob's Y position must be animated using <animate inputtag="{port_name}">.
-- The click area's vertical size must exactly span the range of the
-- knob's movement.

function SliderHandler:create(view, clickarea_id, knob_id, port_name, invert, autocenter)
	local instance = {
		view = view,
		invert = invert,
		autocenter = autocenter,
		clickarea = view.items[clickarea_id],
		knob = view.items[knob_id],
		field = find_ioport_field(port_name),

		-- No setmetatable in the layout plugin. Manually copy methods across.
		pointerUpdated = self.pointerUpdated,
		releasePointer = self.releasePointer,
	}

	if instance.clickarea == nil then
		emu.print_error("Slider element: '" .. clickarea_id .. "' not found.")
		return nil
	end

	if instance.knob == nil then
		emu.print_error("Slider knob element: '" .. knob_id .. "' not found.")
		return nil
	end

	if instance.field == nil then
		return nil
	end

	return instance
end

function SliderHandler:pointerUpdated(state, type, id, dev, x, y, btn, dn, up, cnt)
	if dn & 1 ~= 0 then
		-- It's a button press
		if self.knob.bounds:includes(x, y) then
			return {
				handler = self,
				dy = y - self.knob.bounds.y0
			}
		end
	else
		if state == nil then
			-- not a down event, and not already claimed - not for us to handle.
			return nil
		end

		-- not a button down (up is also handled elsewhere), so it must be a move
		local yy = y - state.dy
		local fraction = (yy - self.clickarea.bounds.y0) / (self.clickarea.bounds.height - self.knob.bounds.height)
		local new_value = 1023 * (1 - fraction)
		if self.invert then
			new_value = 1023 - new_value
		end
		new_value = math.floor(new_value + 0.5)
		clamped_value = clamp(new_value, 0, 1023)
		set_field_value(self.field, clamped_value)
		return state
	end
	return nil
end

function SliderHandler:releasePointer(id, state)
	if self.autocenter then
		set_field_value(self.field, 512)
	end
	return nil
end

--
-- The Keyboard Handler
--

local octave_shift = 164.5
local w_white = 22.5
local f_white = w_white / (w_white + 1)
local l_black = 88
local l_white = 138
local y_12 = (l_black + 2) / l_white
local y_12_0 = l_black / l_white

local strike_both_bottom = l_black - 3
local strike_both_top = l_black - 43

local strike_white_low_bottom = l_white - 3
local strike_white_low_top = l_white - 43

local strike_white_break = (strike_both_bottom + strike_white_low_top) / 2

local pressure_length = 25
local pressure_hysteresis = 3

-- The ranges where we can find the tops of the 12 keys within an octave
local k12 = {
	{ key=0,  x0=0,            x1=79027/1000000, black=false, l = l_white },
	{ key=1,  x0=1769/20000,   x1=807/5000,      black=true,  l = l_black },
	{ key=2,  x0=8541/50000,   x1=4997/20000,    black=false, l = l_white },
	{ key=3,  x0=25927/100000, x1=16611/50000,   black=true,  l = l_black },
	{ key=4,  x0=8541/25000,   x1=42067/100000,  black=false, l = l_white },
	{ key=5,  x0=1707/4000,    x1=4997/10000,    black=false, l = l_white },
	{ key=6,  x0=1591/3125,    x1=58207/100000,  black=true,  l = l_black },
	{ key=7,  x0=59149/100000, x1=16611/25000,   black=false, l = l_white },
	{ key=8,  x0=33693/50000,  x1=74681/100000,  black=true,  l = l_black },
	{ key=9,  x0=75623/100000, x1=41459/50000,   black=false, l = l_white },
	{ key=10, x0=4193/5000,    x1=18231/20000,   black=true,  l = l_black },
	{ key=11, x0=92097/100000, x1=3106/3125,     black=false, l = l_white },
}

-- 85 equally sized ranges that each contain exactly one key, and the key
-- thaty they contain, so we can check for being outside the edge
local x_to_k12 = {
	k12[1], k12[1], k12[1], k12[1], k12[1], k12[1], k12[1],
	k12[2], k12[2], k12[2], k12[2], k12[2], k12[2], k12[2],
	k12[3], k12[3], k12[3], k12[3], k12[3], k12[3], k12[3], k12[3],
	k12[4], k12[4], k12[4], k12[4], k12[4], k12[4], k12[4],
	k12[5], k12[5], k12[5], k12[5], k12[5], k12[5], k12[5],
	k12[6], k12[6], k12[6], k12[6], k12[6], k12[6], k12[6],
	k12[7], k12[7], k12[7], k12[7], k12[7], k12[7], k12[7],
	k12[8], k12[8], k12[8], k12[8], k12[8], k12[8], k12[8],
	k12[9], k12[9], k12[9], k12[9], k12[9], k12[9], k12[9],
	k12[10], k12[10], k12[10], k12[10], k12[10], k12[10], k12[10],
	k12[11], k12[11], k12[11], k12[11], k12[11], k12[11], k12[11],
	k12[12], k12[12], k12[12], k12[12], k12[12], k12[12], k12[12],
}

local makeFindKey = function(n_octaves)
	local octaves_width = n_octaves * octave_shift
	local full_width = octaves_width + w_white

	local function find_12_key(x, y, w, h)
		if x > octaves_width then
			return 12 * n_octaves
		end

		local octave, kx = math.modf((x / w) * (full_width / octave_shift))
		if octave == n_octaves then
			return 12 * octave
		end

		local ki = math.floor(85 * kx)
		local candidate = x_to_k12[ki + 1]
		if candidate == nil then
			return nil
		end
		local ci = 12 * octave + candidate.key
		if candidate.x0 <= kx and kx <= candidate.x1 then
			if candidate.black then
				rel_y = y / h
				if rel_y <= y_12_0 then
					return ci
				else
					return nil
				end
			else
				return ci
			end
		else
			return nil
		end
	end

	local function find_7_key(x, w)
		local octave, kx = math.modf((x / w) * (full_width / octave_shift))
		local ki, kkx = math.modf(7 * kx)
		if kkx <= f_white then
			if ki < 3 then
				return 12 * octave + 2 * ki
			else
				return 12 * octave + 2 * ki - 1
			end
		end
		return nil
	end

	return function (x, y, w, h)
		rel_y = y / h
		if rel_y < 0 or 1 < rel_y then
			return nil
		elseif rel_y < y_12 then
			return find_12_key(x, y, w, h)
		else
			return find_7_key(x, w)
		end
	end
end

KeyboardHandler = {}

function KeyboardHandler:create(view, clickarea_id, key_id_prefix, port_prefix, from_octave, n_octaves)
	local instance = {
		view = view,
		clickarea = view.items[clickarea_id],
		from_octave = from_octave,
		n_octaves = n_octaves,
		from_key = from_key,
		n_keys = n_keys,
		keys = {},
		findKey = makeFindKey(n_octaves),  -- plain function call to create the function!

		-- No setmetatable in the layout plugin. Manually copy methods across.
		pointerUpdated = self.pointerUpdated,
		releasePointer = self.releasePointer,
		keyDown = self.keyDown,
		velocity = self.velocity,
		pressure = self.pressure,
	}

	if instance.clickarea == nil then
		emu.print_error("Keyboard click area '"..clickarea_id.."' not found.")
		return nil
	end

	local from_key = 12 * from_octave
	local n_keys = 12 * n_octaves + 1

	for i = 0, n_keys -1 do
		local key_info = k12[(i % 12) + 1]
		local key = {
			id = key_id_prefix .. i,
			velocity = 0,
			pressure = 0,
			info = key_info,
			black = key_info.black,
			l = key_info.l,
		}

		key.item = view.items[key.id]
		if key.item == nil then
			emu.print_error("Key item '"..key.id.."' not found.")
			return nil
		end

		key.field = find_ioport_field(port_prefix .. (from_key + i - 36))
		if key.field == nil then
			return nil
		end

		function key:updateViewItemState()
			if self.pressure > 0 then
				self.item:set_state(127 + key.pressure)
			elseif self.velocity > 0 then
				self.item:set_state(self.velocity)
			else
				self.item:set_state(0)
			end
		end

		function key:setVelocity(velocity)
			if velocity ~= self.velocity or self.pressure ~= 0 then
				self.velocity = velocity & 0x7f
				self.pressure = 0
				set_field_value(self.field, self.velocity)
				self:updateViewItemState()
			end
		end

		function key:setPressure(pressure)
			if pressure ~= self.pressure then
				self.pressure = pressure & 0x7f
				set_field_value(self.field, (self.pressure << 7) | self.velocity)
				self:updateViewItemState()
			end
		end

		table.insert(instance.keys, key)
	end

	return instance
end

function KeyboardHandler:velocity(state)

	local function velocityWithin(pos, top, bottom)
		local fraction = (bottom - pos) / (bottom - top)
		local velocity = math.floor(1.5 + 126 * fraction)
		velocity = clamp(velocity, 1, 127)
		return velocity
	end

	local key = state.key
	local h = state.key.item.bounds.height

	local y = (state.y / h) * state.key.l
	if state.key.black or y < strike_white_break then
		return velocityWithin(y, strike_both_top, strike_both_bottom)
	else
		return velocityWithin(y, strike_white_low_top, strike_white_low_bottom)
	end
end

function KeyboardHandler:pressure(state)
	local key = state.key
	local h = state.key.item.bounds.height

	local y = (state.y / h) * key.l
	local y_max = (state.max_y / h) * key.l

	local fraction = ((y_max - pressure_hysteresis) - y) / pressure_length
	local pressure = math.floor(0.5 + 127 * fraction)
	pressure = clamp(pressure, 0, 127)
	return pressure
end

function KeyboardHandler:keyDown(x, y)
	local bounds = self.clickarea.bounds
	local w = bounds.width
	local h = bounds.height
	local dx = x - bounds.x0
	local dy = y - bounds.y0

	local state = {
		handler = self,
	}
	local key_number = self.findKey(dx, dy, w, h)

	state.key_number = key_number
	state.key = nil
	if key_number ~= nil then
		local key = self.keys[key_number + 1]
		if key ~= nil then
			state.key = key
			-- coordinates within the key of the latest pointer position
			state.x = x - key.item.bounds.x0
			state.y = y - key.item.bounds.y0
			state.max_y = state.y
			state.key:setVelocity(self:velocity(state))
		end
	end

	-- return the state to track this movement, claiming it as ours.
	return state
end

function KeyboardHandler:pointerUpdated(state, type, id, dev, x, y, btn, dn, up, cnt)
	local bounds = self.clickarea.bounds
	if bounds:includes(x, y) and (dn & 1 ~= 0) then
		-- This is a key down event on the keyboard, claim the pointer.
		return self:keyDown(x, y)
	end

	if state ~= nil then
		-- not a key down event, but a move after we claimed the pointer after a key down event

		local w = bounds.width
		local h = bounds.height
		local dx = x - bounds.x0
		local dy = y - bounds.y0

		local new_key_number = self.findKey(dx, dy, w, h)

		if new_key_number ~= state.key_number then
			-- this is a move across, or on, or off, keys
			if state.key ~= nil then
				state.key:setVelocity(0)
			end

			-- store the new key number, which may be nil, in the state.
			state.key_number = new_key_number

			if new_key_number ~= nil then
				-- it's a move onto a new key, treat it as a key-down event
				state.key = self.keys[new_key_number + 1]

				if state.key ~= nil then
					state.x = x - state.key.item.bounds.x0
					state.y = y - state.key.item.bounds.y0
					state.max_y = state.y
					state.key:setVelocity(self:velocity(state))
				end
			else
				-- set the key to nil as well.
				state.key = nil
			end
		else
			if state.key ~= nil then
				-- we're remaining on the same key
				state.x = x - state.key.item.bounds.x0
				state.y = y - state.key.item.bounds.y0
				if state.y > state.max_y then
					state.max_y = state.y
				end

				-- this is a potential change in key pressure.
				state.key:setPressure(self:pressure(state))
			end
			-- else we're remaining between keys and return the same state.
		end

		-- return the same state, still claiming this pointer
		return state

	end

	return nil
end

function KeyboardHandler:releasePointer(id, state)
	if state.key ~= nil then
		state.key:setVelocity(0)
	end
end

-----------------------------------------------------------------------
-- Slider library ends.
-----------------------------------------------------------------------


