class Vector2{

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    /**
     * Static vector addition function that returns a new vector
     */
    static plus(vec1, vec2){
        var x = vec1.x + vec2.x;
        var y = vec1.y + vec2.y;
        return new Vector2(x, y);
    }

    /**
     * Static vector subtraction function that returns a new vector
     */
    static minus(vec1, vec2){
        var x = vec1.x - vec2.x;
        var y = vec1.y - vec2.y;
        return new Vector2(x, y);
    }

    /**
     * Static vector dot product function that returns a new vector
     */
    static dot(vec1, vec2){
        var u = vec1.x * vec2.x;
        var v = vec1.y * vec2.y;

        return x + y;
    }

    /**
     * Static vector cross product function that returns a new vector
     */
    static times(vec1, vec2){
        var u = vec1.x * vec2.y;
        var v = vec1.y * vec2.x;

        return new Vector2(u, v);
    }

    /**
     * Generic addition function that adds one vector into the other
     * The goal of this function is to act as the += operator
     */
    add(vec2){
        this.x += vec2.x;
        this.y += vec2.y;
    }

    /**
     * Generic addition function that adds one vector into the other
     * The goal of this function is to act as the += operator
     */
    subtract(vec2){
        this.x -= vec2.x;
        this.y -= vec2.y;
    }

    cross(vec1, vec2){
        var u = this.x * vec2.y;
        var v = this.y * vec2.x;

        this.x = u;
        this.y = y;
    }

}
