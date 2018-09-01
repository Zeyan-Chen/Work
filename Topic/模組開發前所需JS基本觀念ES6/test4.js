class Point {
    constructor(x, y) {
        this.first = x;
        this.second = y;
    }
    toStringx() {
        return '(' + this.first + ', ' + this.second + ')';
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
    }
    toString() {
        return super.toStringx() + ' in ' + this.color;
    }
    // 錯誤example
    thisX = (e) => {
      	return this.color;
    }
}

let x = new ColorPoint(1, 2, 'red');

console.log(x.first);
console.log(x.second);
console.log(x.toStringx());
