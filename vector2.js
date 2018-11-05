class Vector2{

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    /**
     * Static vector addition function that returns a new vector
     */
    static add(vec1, vec2){
        var x = vec1.x + vec2.x;
        var y = vec1.y + vec2.y;
        return new Vector2(x, y);
    }

    /**
     * Static vector subtraction function that returns a new vector
     */
    static subtract(vec1, vec2){
        var x = vec1.x - vec2.x;
        var y = vec1.y - vec2.y;
        return new Vector2(x, y);
    }

    /**
     * Static vector dot product function that returns a new vector
     */
    static dot(vec1, vec2){
    }

    /**
     * Static vector cross product function that returns a new vector
     */
    static cross(vec1, vec2){
    }

    /**
     * Generic addition function that adds one vector into the other
     * The goal of this function is to act as the += operator
     */
    plus(vec2){
        this.x += vec2.x;
        this.y += vec2.y;
    }

    /**
     * Generic addition function that adds one vector into the other
     * The goal of this function is to act as the += operator
     */
    minus(vec2){
        this.x -= vec2.x;
        this.y -= vec2.y;
    }

    dot(){

    }

    cross(){

    }

    length(){

    }


}
