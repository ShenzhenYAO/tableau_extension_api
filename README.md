Reference:
https://tableau.github.io/extensions-api/docs/trex_getstarted.html


A. set up a local virtual server
1. To make Tableau work on a local virtual server, but launch Tableau in debug mode:
    -- make a shortcut and set the launch command like "C:\Program Files\Tableau\Tableau 2021.3\bin\tableau.exe" --remote-debugging-port=8696
    This enables Tableau to start its debug mode at port 8696 (http://localhost:8696)

    Now, do not get confused. http://localhost:8696 is NOT the local server for the html file. It is the site for tableau to enable its debugging mode. 

2. Launch a virtual server. In my case, I just use the live server provided by VSCode extention "Live server" to launch the index.html. My browser is Chrome. 

3. In the datasource_local.trex file, specify "<url>http://localhost:5500/index.html</url>". Note: not http://localhost:8696. The former is the local virtual server for the index.html, the latter the Tableau debugging site. 

Ref: https://community.tableau.com/s/question/0D54T00000C5OjfSAF/extension-initialization-error
and a more complete guide at:
https://tableau.github.io/extensions-api/docs/trex_debugging.html

4. Drag an extension obj to the dashboard, select the datasource_local.trex file, and confirm to permit connection  

5. As the VSCode live server updates the index.html whenever a file in the current project (e.g., the README.md I am typing now, index.html, or main.ls), it automatically freshes the server. This will cause the Tableau extention to lose connection to the local index.html. Users will need to  Reload the extension object. 


B. link to a webpage on remote server.  

1. Make datasource_remote.trex, specify "<url>https://shenzhenyao.github.io/tableau_extension_api/index.html</url>".

2. Drag another extension obj to the dashboard, select datasource_remote.trex this time and confirm permission. This allows the remote page to get data from tableau. 

    Note: the remote page need to be updated by committing to github after changes are made for index.html, etc

Note: each time a trex file is changed (its content even), users have to delete the original extension object, and add it back.


C. Visit http://localhost:8696/. On that page, a list of inspectable pages are shown, including like:

datasources: http://localhost:5500/index.html
datasources: https://shenzhenyao.github.io/tableau_extension_api/index.html

click on these links to goto these pages. THe web page will show the Console of the devtool, instead of the page itself. Actually no data from tableau will be shown on the page. Tableau forbids to show data on these pages. Thus, the pages are more for debugging purpose. Note: after debugging, better to disable the console.log as the arrays or other data that is displayed in console.log() will be exposed on these pages if others knows to inspect the console.

D. Other notes.

1. The tableau.extensions.1.latest.js is the lib provided by Tableau, just have to download it (or maybe it is available on cdns, as d3 or jquery libraries, https://github.com/tableau/extensions-api. )

2. The main.js does most of the job to listen to: a) get the summary data from tableau (on the current dashboard); b) listen to filter changes, etc.
    Pay attention to the async settings appropirately (async is not always right...)

3. the .trex files have to be named as .trex files as .trex is the only extension name recogized when adding extension objects, although .trex is just xml files! 