[![brackets.io](http://brackets.io/favicon.png)](https://brackets.io) Welcome to brackets.io
=============================================================================
This is the offcial repository for the brackets.io website

# Development

While the js, and html can be modified right in the repository, the sass stylesheets for brackets.io exist in another repository - [brackets-site-sass](https://github.com/adobe/brackets-site-sass), and are included in as a submodule.

This is because the same style sheets are shared by [brackets-registry](https://github.com/adobe/brackets-registry) as well.

Refer to the section below for assistance on how to develop the css for brackets.io

### Developing CSS
- Requirements 
    - Git command line tools — follow the setup instructions on [GitHub](https://help.github.com/articles/set-up-git) or download [here](http://git-scm.com/downloads)
    - [NodeJS installed](https://nodejs.org/en/download/current/)
- Steps to follow
    - Open gitbash (or any other command line shell of your choice, that supports git & node) & clone the repository  
    
        ```bash
        git clone https://github.com/adobe/brackets.io.git
        cd brackets.io
        ```  
        
    - Update the brackets-site-sass submodule
    
        ```bash
        git submodule update --init
        ```  
        
    - Change directory to the brackets-site-sass submodule  
    
        ```bash
        cd dev
        ```  
        
    - Get the development dependencies for the submodule  
    
        ```bash
        npm install
        ```  
        
      The brackets-site-sass folder contains the scss folder, which contains the sass files that were used to develop the minified css(brackets.min.css). Any modification that needs to be made to the minified css must be made by compiling these scss files.
    
    - And then run the auto-compile grunt task  
    
        ```bash
        grunt watch
        ```  
        
    The above task will watch the _scss_ folder for any changes. Post this, you can modify the files in the scss folder and _brackets.min.css_ will be automatically generated in the css folder.
      
    **Note:** You must keep the grunt task running for the automatic compilation to work, so don't close the
    shell running the task.  
    
    **Note:** Also, test the new styles with brackets-registry as well, and update the minified css there as well.
    
    
### Running brackets.io locally
- Requirements 
    - _http-server_   
    
        ```bash
        npm install -g http-server
        ```  
- Steps to follow
    - Open gitbash (or any other command line shell of your choice, that supports git & node)
    - Change directory to local brackets.io repository
    - Start the http-server  
    
        ```bash
        http-server ./
        ```  
        
      This will start a local http-server on the 8080 port. The site can then be viewed using **_http://localhost:8080_** in browser.  
      
      http-server can also be started with options for port, address etc. [Check the npm page for more details](https://www.npmjs.com/package/http-server)
      
    **Note:** Chrome generally caches resources, and so sometimes, even on reloading, code changes are not reflected. In such a case, use the [Empty Cache and Hard Reload](http://www.thewindowsclub.com/empty-cache-hard-reload-chrome) option in Chrome.