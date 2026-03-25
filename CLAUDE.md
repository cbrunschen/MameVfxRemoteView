  # MameVfxRemoteView - Project Guidelines
                                                                                
  ## Overview                                                                   
  This project provides a visual interface for MAME (Multiple Arcade Machine    
  Emulator) using Python scripts to generate MAME layout with Lua scripts,
  and JavaScript code. It renders MAME 
  artwork, layouts, and view configurations.
                                                                                
  ## Architecture                                                               
  - **Python**: Core logic in `build_view.py`, `view.py`, `view_builders.py`,
  `build_view.py`                                              
  - **Python**: MAME layout generator in `mame_layout.py`, JavaScript generator in `js_html.py`
  - **JavaScript**: Frontend view in `ViewCode.js`
  - **Lua**: MAME Lua script for view interaction in`mame_layout_script.lua`                                                    
                                                                                
  ## Key Components                                                             
  - `ViewCode.js` - Main view configuration with text rendering options
  - `build_view.py` - Python build script for generating views
  - `view_builders.py` - View builder utilities                                 
  - `view.py` - Core view processing logic                                      
  - `mame_layout.py` - MAME layout definitions                                  
  - `straight_segments.py` - Geometric segmentation logic
                                                                                
  ## Development Guidelines                                                     
                                                                                
  ### Safety & Security                                                         
  - Do not use `--no-verify` or bypass safety checks
  - Investigate unexpected files/branches before deleting or overwriting        
  - Merge conflicts must be resolved, not discarded                           
  - Lock files must be investigated, not deleted                              
  - Before pushing sensitive data, review for personal information              
  - Uploading to third-party tools may cache/index content                      
                                                                                
  ### Tool Usage                                                                
  - Use dedicated tools over Bash when available:                               
    - `Read` instead of `cat`/`head`/`tail`/`sed`                               
    - `Edit` instead of `sed`/`awk`                                             
    - `Write` instead of `cat` heredoc                                          
    - `Glob` instead of `find`/`ls`                                             
    - `Grep` instead of `grep`/`rg`                                             
  - Use `Bash` only for system commands                                         
  - Avoid excessive subagent usage for simple searches                          
                                                                                
  ### Code Changes                                                              
  - Measure twice, cut once - investigate root causes before destructive actions
  - Prefer incremental changes over bulk modifications                          
  - Keep changes focused and minimal                                            
  - Update configurations at runtime when possible (see recent commit 0e533dc)  
                                                                                
  ### Git Workflow                                                              
  - Commit frequently with descriptive messages                                 
  - Recent patterns:                                                            
    - Factor functions into reusable utilities (11cd31a)                        
    - Use Lua scripts for media file presence checks (3a9ca4e)                  
    - Regenerate artwork periodically (57aa970)                                 
    - Adjust floating-point formatting precision (11cd31a, b8b85ac)             
                                                                                
  ### Text Rendering                                                            
  - Text rendering is configurable at runtime                                   
  - Use 5 digits of precision for text paths (b8b85ac)                          
  - Consider stripping trailing zeros when appropriate (11cd31a)                
                                                                                
  ## Memory File Usage                                                          
  - Store persistent state in                                                   
  `/home/cb/.claude/projects/-home-cb-Projects-MameVfxRemoteView/memory/`       
  - Organize by topic, not chronologically
  - Check existing memories before creating new ones                            
  - Update memories when corrected                                              
                                                                                
  ## Important Files to Monitor                                                 
  - `ViewCode.js` - View configuration and text rendering options               
  - `mame_layout_script.lua` - Cartridge/floppy detection logic                 
  - `straight_segments.py` - Geometric operations                               
                                                                                
  ## Environment                                                                
  - Platform: Linux 6.17.0-19-generic                                           
  - Shell: bash                                                                 
  - Git repository on main branch                                               
