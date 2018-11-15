let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let WIDTH = canvas.width;
let HEIGHT = canvas.height;

/**
 * This is temporary, but we're assuming that the viewport
 * of our program is inside a (1,1,1) cube
 */
let VIEWPORT_WIDTH = 1;
let VIEWPORT_HEIGHT = 1;
let PROJ_PLANE_Z = 1;


/**
 * Mapping a scaled 2D vector to the proper part of the canvas
 */
function viewportToCanvas(vector2){
    let x = vector2.x;
    let y = vector2.y;

    let u = x * WIDTH / VIEWPORT_WIDTH;
    let v = y * HEIGHT / VIEWPORT_HEIGHT;

    return new Vector2(u, v);
}

/**
 * Mapping R3 -> R2
 * (Not complete, but so far works with positive depth values)
 */
function projectVertex(vector3){
    // grabbing functions from input vector3
    let x = vector3.x;
    let y = vector3.y;
    let z = vector3.z;

    // transform from 3D to 2D (scaling by z)
    let u = x * PROJ_PLANE_Z / z;
    let v = y * PROJ_PLANE_Z / z;
    let transform_vec = new Vector2(u, v);

    result_vector = viewportToCanvas(transform_vec);
    return result_vector;
}

// all vertexs on a cube
let vA = new Vector3(-2, -0.5, 5);
let vB = new Vector3(-2, 0.5, 5);
let vC = new Vector3(-1, 0.5, 5);
let vD = new Vector3(-1, -0.5, 5);
let vAb = new Vector3(-2, -0.5, 6);
let vBb = new Vector3(-2, 0.5, 6);
let vCb = new Vector3(-1, 0.5, 6);
let vDb = new Vector3(-1, -0.5, 6);

drawLine(projectVertex(vA), projectVertex(vB));
// drawLine(projectVertex(vB), projectVertex(vC));
// drawLine(projectVertex(vC), projectVertex(vD));
// drawLine(projectVertex(vD), projectVertex(vA));
//
// drawLine(projectVertex(vAb), projectVertex(vBb));
// drawLine(projectVertex(vBb), projectVertex(vCb));
// drawLine(projectVertex(vCb), projectVertex(vDb));
// drawLine(projectVertex(vDb), projectVertex(vAb));
//
// drawLine(projectVertex(vA), projectVertex(vAb));
// drawLine(projectVertex(vB), projectVertex(vBb));
// drawLine(projectVertex(vC), projectVertex(vCb));
// drawLine(projectVertex(vD), projectVertex(vDb));
