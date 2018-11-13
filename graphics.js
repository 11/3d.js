/**
 * DDA Line Drawing Algorithm
 * Can upgrade to bresenham in situations where slope isn't negative.
 */
function drawLine(x1, y1, x2, y2){
    // Difference in x & y
    var diff_x = x2 - x1;
    var diff_y = y2 - y1;
    var slope = diff_x / diff_y;

    // the amount of steps is defined by the longest difference in either the x or y dimension
    var steps = (Math.abs(diff_x) > Math.abs(diff_y) ? Math.abs(diff_x) : Math.abs(diff_y));

    // x and y increment
    var xInc = diff_x / steps;
    var yInc = diff_y / steps

    // x and y values that are incremented until the line is drawn
    var x = x1;
    var y = y1;
    for(var i=0; i<=steps; i++){
        // draw the pixel
        putPixel(x, y);

        // increment x & y
        // This will probably need to change :(
        x += Math.ceil(xInc);
        y += Math.ceil(yInc);
    }
}


/**
 * Puts pixel in texture buffer at the correct coordinate
 */
function putPixel(x, y){
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(x, y, 1, 1, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
}
