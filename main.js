let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "#F0F0F0";

let WIDTH = 640;
let HEIGHT = 640;

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
    new Vec4(0.0, 0.0, (z_far) / (z_far - z_near), (-z_far * z_near)/(z_far - z_near)),
    new Vec4(0.0, 0.0, 1.0, 0.0)
);

var theta=12;
let rotZ = new Mat4(
    new Vec4(Math.cos(theta), Math.sin(theta), 0, 0),
    new Vec4(-Math.sin(theta), Math.cos(theta), 0, 0),
    new Vec4(0, 0, 1, 0),
    new Vec4(0, 0, 0, 1)
);

let rotX = new Mat4(
    new Vec4(1, 0, 0, 0,),
    new Vec4(0, Math.cos(theta), Math.sin(theta), 0),
    new Vec4(0, -Math.sin(theta), Math.cos(theta), 0),
    new Vec4(0, 0, 0, 1)
);

function rotate(theta){
    rotZ.v1.x = Math.cos(theta);
    rotZ.v1.y = Math.sin(theta);
    rotZ.v2.x = -Math.sin(theta);
    rotZ.v2.y = Math.cos(theta);

    rotX.v2.y = Math.cos(theta);
    rotX.v2.z = Math.sin(theta);
    rotX.v3.y = -Math.sin(theta);
    rotX.v3.z = Math.cos(theta);
}

function multiply(v, mat){

    /** Matrix Ledger
     *     v1      v2     v3     v4
     * x [(0,0), (0,1), (0,2), (0,3)]
     * y [(1,0), (1,1), (1,2), (1,3)]
     * z [(2,0), (2,1), (2,2), (2,3)]
     * w [(3,0), (3,1), (3,2), (3,3)]
     */

    // output vector calculations
    let x = (v.x * mat.v1.x) + (v.y * mat.v1.y) + (v.z * mat.v1.z) + mat.v1.w;
    let y = (v.x * mat.v2.x) + (v.y * mat.v2.y) + (v.z * mat.v2.z) + mat.v2.w;
    let z = (v.x * mat.v3.x) + (v.y * mat.v3.y) + (v.z * mat.v3.z) + mat.v3.w;

    // used to scale x y & z
    let w = (v.x * mat.v4.x) + (v.y * mat.v4.y) + (v.z * mat.v4.z) + mat.v4.w;

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

    //(x1, y1) -> (x2, y2)
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    //(x2, y2) -> (x3, y3)
    ctx.moveTo(x2, y2);
    ctx.lineTo(x3, y3);

    //(x3, y3) -> (x1, y1)
    ctx.moveTo(x3, y3);
    ctx.lineTo(x1, y1);

    ctx.stroke();
}


function run(){
    //CLEAR PREVIOUS FRAME
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#F0F0F0";

    //update
    theta += 0.0001;
    rotate(theta);
    //render
    for(let x = 0; x<unit_cube.triangles.length; x++){

        let triRotate    = new Triangle(new Vec3(0,0,0), new Vec3(0,0,0), new Vec3(0,0,0));
        let triTranslate = new Triangle(new Vec3(0,0,0), new Vec3(0,0,0), new Vec3(0,0,0));
        let triProject   = new Triangle(new Vec3(0,0,0), new Vec3(0,0,0), new Vec3(0,0,0));

        let tri = unit_cube.triangles[x];

        // rotate
        triRotate.v1 = multiply(tri.v1, rotZ);
        triRotate.v2 = multiply(tri.v2, rotZ);
        triRotate.v3 = multiply(tri.v3, rotZ);

        triRotate.v1 = multiply(triRotate.v1, rotX);
        triRotate.v2 = multiply(triRotate.v2, rotX);
        triRotate.v3 = multiply(triRotate.v3, rotX);

        // translate
        triTranslate.v1 = triRotate.v1;
        triTranslate.v2 = triRotate.v2;
        triTranslate.v3 = triRotate.v3;
        triTranslate.v1.z = triRotate.v1.z + 2.0;
        triTranslate.v2.z = triRotate.v2.z + 2.0;
        triTranslate.v3.z = triRotate.v3.z + 2.0;

        //project triangles
        triProject.v1 = multiply(triTranslate.v1, projection_matrix);
        triProject.v2 = multiply(triTranslate.v2, projection_matrix);
        triProject.v3 = multiply(triTranslate.v3, projection_matrix);

        // scale into view
        triProject.v1.x += 1.0; triProject.v1.y += 1.0;
        triProject.v2.x += 1.0; triProject.v2.y += 1.0;
        triProject.v3.x += 1.0; triProject.v3.y += 1.0;
        triProject.v1.x *= 0.5 * WIDTH;
        triProject.v1.y *= 0.5 * HEIGHT;
        triProject.v2.x *= 0.5 * WIDTH;
        triProject.v2.y *= 0.5 * HEIGHT;
        triProject.v3.x *= 0.5 * WIDTH;
        triProject.v3.y *= 0.5 * HEIGHT;

        //draw triangles
        drawTriangle(triProject.v1.x, triProject.v1.y,
            triProject.v2.x, triProject.v2.y,
            triProject.v3.x, triProject.v3.y);
    }

    setInterval(run, 1);
}
run();
