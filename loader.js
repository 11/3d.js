function loadScript(script){
    //create new script tag
    var newScript = document.createElement("script");
    newScript.src = script;

    // append script to html file
    var headTag = document.getElementsByTagName("head")[0];
    headTag.appendChild(newScript)
}

// load these JS files on window.onload
window.onload = function(){
    loadScript('graphics.js');
    loadScript('main.js');
}

