function Myself(gameManager, player_id) {
    this.gameManager = gameManager;
    this.player_id = player_id;
    this.elem = jThree( "camera" );
    this.prev = {
        x : 0,
        y : 0,
        z : 0
    };
    this.elem.css("position", [100 - Math.random() * 200, -25, 100  - Math.random() * 50]);
}

Myself.prototype.setDataStore = function(ds) {
    this.ds = ds;
}

Myself.prototype.getElem = function() {
    return this.elem;
}

Myself.prototype.translate = function(x, y, z) {
    return this.elem.translate(x, y, z);
}

Myself.prototype.getDiff = function() {
    var xx = this.prev.x - this.getElem().positionX();
    var yy = this.prev.y - this.getElem().positionY();
    var zz = this.prev.z - this.getElem().positionZ();
    return xx * xx + yy * yy + zz * zz;
}

Myself.prototype.broadcast = function(ds, player_id) {
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

Myself.prototype.gameover = function() {
    this.ds.send({
        cmd : "gameover",
        player_id : this.player_id
    });
}

Myself.prototype.shoot = function(ds_bullet) {
    this.weapon.fire(this, ds_bullet);
}

Myself.prototype.initWeapon = function() {
    var opts = {
        owner_id : this.player_id,
    };
    var weapon  = new Weapon(self.gameManager, opts);
    this.weapon = weapon;
}
