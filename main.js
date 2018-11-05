var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function main(){
    drawLine(100,10, 200,20);
    drawLine(10,10, 10,200);
    drawLine(300,200, 400,200);
    drawLine(300,200, 400,300);
    drawLine(300,200, 100,300);
}


main();
