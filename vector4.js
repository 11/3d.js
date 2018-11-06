class Vector4{

    constructor(x, y, z, w){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    /**
     * Static vector addition function that returns a new vector
     */
    static plus(vec1, vec2){
        var x = vec1.x + vec2.x;
        var y = vec1.y + vec2.y;
        var z = vec1.z + vec2.z;
        var w = vec1.w + vec2.w
        return new Vector3(x, y, z, w);
    }

    /**
     * Static vector subtraction function that returns a new vector
     */

    static minus(vec1, vec2){
        var x = vec1.x - vec2.x;
        var y = vec1.y - vec2.y;
        var z = vec1.z - vec2.z;
        var w = vec1.w - vec2.w;
        return new Vector3(x, y, z, w);
    }

    /**
     * Static vector dot product function that returns a new vector
     */
    static dot(vec1, vec2){
        var x = vec1.x * vec2.x;
        var y = vec1.y * vec2.y;
        var z = vec1.z * vec2.z;
        var w = vec1.w * vec2.w;

        return x + y + z + w;
    }

    /**
     * Static vector cross product function that returns a new vector
     */
    static times(vec1, vec2){
        var u = (vec1.y * vec2.z) - (vec1.z * vec2.y);
        var v = (vec1.z * vec2.x) - (vec1.x * vec2.z);
        var w = (vec1.x * vec2.y) - (vec1.y * vec2.x);

        return new Vector3(u,v,w);
    }

    /**
     * Generic addition function that adds one vector into the other
     * The goal of this function is to act as the += operator
     */
    add(vec2){
        this.x += vec2.x;
        this.y += vec2.y;
        this.z += vec2.z;
        this.w += vec2.w;
    }

    /**
     * Generic addition function that adds one vector into the other
     * The goal of this function is to act as the += operator
     */
    subtract(vec2){
        this.x -= vec2.x;
        this.y -= vec2.y;
        this.z -= vec2.z;
        this.w -= vec2.w;
    }

    /**
     * Converts the current instance of a Vector3 to the cross product of another Vector3
     */
    cross(vec2){
        this.x = (this.y * vec2.z) - (this.z * vec2.y);
        this.y = (this.z * vec2.x) - (this.x * vec2.z);
        this.z = (this.x * vec2.y) - (this.y * vec2.x);
    }

}
