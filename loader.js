function loadScript(script){
    //create new script tag
    var newScript = document.createElement("script");
    newScript.src = script;

    // append script to html file
    var headTag = document.getElementsByTagName("head")[0];
    headTag.appendChild(newScript)
}


window.onload = function(){
    loadScript('colors.js')
    loadScript('vector.js');
    loadScript('matrix.js');
    loadScript('main.js');
    loadScript('graphics.js');
    loadScript('main.js');
}
