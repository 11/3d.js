/**
 * dda line drawing algorithm
 * can upgrade to bresenham in situations where slope isn't negative.
 */
function drawLine(vec2A, vec2B){
    // map vector coordinates to x1, y1, x2, y2
    let x1 = vec2A.x;
    let y1 = vec2A.y;
    let x2 = vec2B.x;
    let y2 = vec2B.y;

    // difference in x & y
    let diff_x = x2 - x1;
    let diff_y = y2 - y1;
    let slope = diff_x / diff_y;

    // the amount of steps is defined by the longest difference in either the x or y dimension
    let steps = (Math.abs(diff_x) > Math.abs(diff_y) ? Math.abs(diff_x) : Math.abs(diff_y));

    // x and y increment
    let xinc = diff_x / steps;
    let yinc = diff_y / steps

    // x and y values that are incremented until the line is drawn
    let x = x1;
    let y = y1;
    for(let i=0; i<=steps; i++){
        // draw the pixel
        putPixel(x, y);

        // increment x & y
        // this will probably need to change :(
        x += Math.ceil(xinc);
        y += Math.ceil(yinc);
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
