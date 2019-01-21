let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let WIDTH = 640;
let HEIGHT = 480;

let ASPECT_RATIO = WIDTH/HEIGHT;
let FOV = 90.0;


class Vec4{

    constructor(x, y, z, w){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}
class Mat4{
    constructor(v1, v2, v3, v4){
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
        this.v4 = v4;
    }
}

class Vec3{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Triangle{
    constructor(v1, v2, v3){
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }
}

class Mesh{
    constructor(triangles){
        this.triangles = triangles;
    }
}



let unit_cube = new Mesh([
    // back face
    new Triangle(new Vec3(0, 0, 0), new Vec3(0, 1, 0), new Vec3(1, 1, 0)),
    new Triangle(new Vec3(0, 0, 0), new Vec3(1, 1, 0), new Vec3(1, 0, 0)),

    // right face
    new Triangle(new Vec3(1, 0, 0), new Vec3(1, 1, 0), new Vec3(1, 1, 1)),
    new Triangle(new Vec3(1, 0, 0), new Vec3(1, 1, 1), new Vec3(1, 0, 1)),

    // front face
    new Triangle(new Vec3(1, 0, 1), new Vec3(1, 1, 1), new Vec3(0, 1, 1)),
    new Triangle(new Vec3(1, 0, 1), new Vec3(0, 1, 1), new Vec3(0, 0, 1)),

    // left face
    new Triangle(new Vec3(0, 0, 1), new Vec3(0, 1, 1), new Vec3(0, 1, 0)),
    new Triangle(new Vec3(0, 0, 1), new Vec3(0, 1, 1), new Vec3(0, 0, 1)),

    // top face
    new Triangle(new Vec3(0, 1, 0), new Vec3(0, 1, 1), new Vec3(1, 1, 1)),
    new Triangle(new Vec3(0, 1, 0), new Vec3(1, 1, 1), new Vec3(1, 1, 0)),

    // bottom face
    new Triangle(new Vec3(1, 0, 1), new Vec3(0, 0, 1), new Vec3(0, 0, 0)),
    new Triangle(new Vec3(1, 0, 1), new Vec3(0, 0, 0), new Vec3(1, 0, 0)),
]);


//projection matrix
let z_near = 0.1;
let z_far = 1000.0;
let fov_radians = 1.0 / Math.tan(FOV * 0.5 / 180.0 * Math.PI);
let projection_matrix = new Mat4(
    new Vec4(ASPECT_RATIO * fov_radians, 0.0, 0.0, 0.0),
    new Vec4(0.0, fov_radians, 0.0, 0.0),
    new Vec4(0.0, 0.0, z_far / (z_far - z_near), 1.0),
    new Vec4(0.0, 0.0, 0.0, 0.0)
);

let theta=0.01;
let rotZ = new Mat4(
    new Vec4(Math.cos(theta), Math.sin(theta), 0, 0),
    new Vec4(-Math.sin(theta), Math.cos(theta), 0, 0),
    new Vec4(0, 0, 1, 0),
    new Vec4(0, 0, 0, 1)
);

function multiply(v, mat){

    /*
     *     v1      v2     v3     v4
     * x [(0,0), (0,1), (0,2), (0,3)]
     * y [(1,0), (1,1), (1,2), (1,3)]
     * z [(2,0), (2,1), (2,2), (2,3)]
     * w [(3,0), (3,1), (3,2), (3,3)]
     */

    // output vector calculations
    let x = (v.x * mat.v1.x) + (v.y * mat.v2.x) + (v.z * mat.v3.x) + mat.v4.x;
    let y = (v.x * mat.v1.y) + (v.y * mat.v2.y) + (v.z * mat.v3.y) + mat.v4.y;
    let z = (v.x * mat.v1.z) + (v.y * mat.v2.z) + (v.z * mat.v3.z) + mat.v4.z;
    let w = (v.x * mat.v1.w) + (v.y * mat.v2.w) + (v.z * mat.v3.w) + mat.v4.w;

    // if w is not 0, scale everything by w
    if(w != 0){
        x /= w;
        y /= w;
        z /= w;
    }

    return new Vec3(x, y, z);
}


function drawTriangle(x1, y1, x2, y2, x3, y3){
    ctx.beginPath();

    ctx.strokeStyle = "#F0F0F0";
    //(x1, y1) -> (x2, y2)
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    //(x2, y2) -> (x3, y3)
    ctx.moveTo(x2, y2);
    ctx.lineTo(x3, y3);

    //(x3, y3) -> (x1, y1)
    ctx.moveTo(x3, y1);
    ctx.lineTo(x1, y1);

    ctx.stroke();
}


function run(){
    //CLEAR PREVIOUS FRAME
    //ctx.clearRect(0,0,canvas.width, canvas.height);

    //update
    theta += 0.01;

    //render
    for(let x = 0; x<unit_cube.triangles.length; x++){

        let tri = unit_cube.triangles[x];

        // rotate
        tri.v1 = multiply(tri.v1, rotZ);
        tri.v2 = multiply(tri.v2, rotZ);
        tri.v3 = multiply(tri.v3, rotZ);

        // translate
        tri.v1.z += 3.0;
        tri.v2.z += 3.0;
        tri.v3.z += 3.0;

        //project triangles
        tri.v1 = multiply(tri.v1, projection_matrix);
        tri.v2 = multiply(tri.v2, projection_matrix);
        tri.v3 = multiply(tri.v3, projection_matrix);

        // scale into view
        tri.v1.x += 1.0; tri.v1.y += 1.0;
        tri.v2.x += 1.0; tri.v2.y += 1.0;
        tri.v3.x += 1.0; tri.v3.y += 1.0;

        tri.v1.x *= 0.5 * WIDTH;
        tri.v1.y *= 0.5 * HEIGHT;
        tri.v2.x *= 0.5 * WIDTH;
        tri.v2.y *= 0.5 * HEIGHT;
        tri.v3.x *= 0.5 * WIDTH;
        tri.v3.y *= 0.5 * HEIGHT;

        //draw triangles
        drawTriangle(tri.v1.x, tri.v1.y,
            tri.v2.x, tri.v2.y,
            tri.v3.x, tri.v3.y);
    }

    //setInterval(run, 10);
}
run();
run();
run();
run();
run();
run();
run();
run();
run();
run();
run();
run();
run();
run();
run();
run();
run();
