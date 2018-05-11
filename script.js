function Sprite(filename, left, top, ord) {
    this._node = document.createElement("IMG");
    this._node.src = filename;
    this._node.style.position = "absolute";
    this.direction = 'right';
    this._node.id = 'enemy_' + ord;
    document.getElementById('sectionjeu').appendChild(this._node);

    Object.defineProperty(this, "left", {
        get: function() {
            return this._left;
        },
        set: function(value) {
            this._left = value;
            this._node.style.left = value + "px";
        }
} );
    Object.defineProperty(this, "top", {
        get: function() {
            return this._top;
        },
        set: function(value) {
            this._top = value;
            this._node.style.top = value + "px";
        }
} );

Object.defineProperty(this,"display", {
    get: function(){
        return this._node.style.display;
    },
    set: function(value){
        this._node.style.display = value;
    }
});

this.left = left;
this.top = top;

Sprite.prototype.startAnimation = function (fct, interval){

    var oldThis = this;
    this._clock = window.setInterval(function() {
        fct(oldThis);
    }, interval);
};

Sprite.prototype.stopAnimation = function(){
    window.clearInterval(this._clock);
}

Sprite.prototype.checkCollision = function(other){
    return ! ( (this.top + this._node.height < other.top) || //retourne l'inverse de la ligne
                this.top > (other.top + other._node.height) ||
                (this.left + this._node.width < other.left) ||
                this.left > (other.left + other._node.width) );
}
}