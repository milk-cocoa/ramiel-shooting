function Camera(j3) {
    this.elem = j3( "camera" );
    this.prev = {
        x : 0,
        y : 0,
        z : 0
    };
    this.elem.css("position", [100 - Math.random() * 200, -25, 100  - Math.random() * 50]);
}

Camera.prototype.getElem = function() {
    return this.elem;
}

Camera.prototype.translate = function(x, y, z) {
    return this.elem.translate(x, y, z);
}

Camera.prototype.getDiff = function() {
    var xx = this.prev.x - this.getElem().positionX();
    var yy = this.prev.y - this.getElem().positionY();
    var zz = this.prev.z - this.getElem().positionZ();
    return xx * xx + yy * yy + zz * zz;
}

Camera.prototype.broadcast = function(ds, player_id) {
    if(this.getDiff() > 0) {
        ds.send({
            cmd : "move",
            player_id : player_id,
            x : this.getElem().positionX(),
            y : this.getElem().positionY(),
            z : this.getElem().positionZ()
        });
        this.prev.x = this.getElem().positionX();
        this.prev.y = this.getElem().positionY();
        this.prev.z = this.getElem().positionZ();
    }
}

Camera.prototype.gameover = function(ds, player_id) {
    ds.send({
        cmd : "gameover",
        player_id : player_id
    });
}
