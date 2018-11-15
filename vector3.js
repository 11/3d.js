class Vector3{

    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Static vector addition function that returns a new vector
     */
    static plus(vec1, vec2){
        var x = vec1.x + vec2.x;
        var y = vec1.y + vec2.y;
        var z = vec1.z + vec2.z;
        return new Vector3(x, y, z);
    }

    /**
     * Static vector subtraction function that returns a new vector
     */

    static minus(vec1, vec2){
        var x = vec1.x - vec2.x;
        var y = vec1.y - vec2.y;
        var z = vec1.z - vec2.z;
        return new Vector3(x, y, z);
    }

    /**
     * Static vector dot product function that returns a new vector
     */
    static dot(vec1, vec2){
        var x = vec1.x * vec2.x;
        var y = vec1.y * vec2.y;
        var z = vec1.z * vec2.z;

        return x + y + z;
    }

    /**
     * Static vector cross product function that returns a new vector
     */
    static times(vec1, vec2){
        var x = (vec1.y * vec2.z) - (vec1.z * vec2.y);
        var y = (vec1.z * vec2.x) - (vec1.x * vec2.z);
        var z = (vec1.x * vec2.y) - (vec1.y * vec2.x);

        return new Vector3(x, y, z);
    }

    /**
     * Generic addition function that adds one vector into the other
     * The goal of this function is to act as the += operator
     */
    add(vec2){
        this.x += vec2.x;
        this.y += vec2.y;
        this.z += vec2.z;
    }

    /**
     * Generic addition function that adds one vector into the other
     * The goal of this function is to act as the += operator
     */
    subtract(vec2){
        this.x -= vec2.x;
        this.y -= vec2.y;
        this.z -= vec2.z;
    }

    /**
     * Converts the current instance of a Vector3 to the cross product of another Vector3
     */
    cross(vec2){
        var u = (this.y * vec2.z) - (this.z * vec2.y);
        var v = (this.z * vec2.x) - (this.x * vec2.z);
        var w = (this.x * vec2.y) - (this.y * vec2.x);

        this.x = u;
        this.y = v;
        this.z = w;
    }
}
