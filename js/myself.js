function Myself(gameManager, player_id, stage) {
    this.gameManager = gameManager;
    this.player_id = player_id;
    this.stage = stage;
    this.elem = jThree( "camera" );
    this.prev = {
        x : 0,
        y : 0,
        z : 0
    };
    this.vy = 0;
    this._is_onfloor = false;
    this._is_onfloor_counter = 0;
    this.elem.css("position", [100 - Math.random() * 200, -30, 100  - Math.random() * 50]);
}


Myself.prototype.setDataStore = function(ds) {
    this.ds = ds;
}

Myself.prototype.getElem = function() {
    return this.elem;
}

Myself.prototype.update = function() {
    if(!this._is_onfloor) {
        this.vy -= 0.1;
        if(this.vy < -1.2) this.vy = -1.2;
    }
    if(this.stage.check_collision({x : this.elem.positionX(), y : this.elem.positionY() + this.vy, z : this.elem.positionZ()})) {
        this.elem.positionY(this.elem.positionY());
        this.vy = 0;
        this._is_onfloor = true;
    }else{
        this.elem.positionY(this.elem.positionY() + this.vy);
        this._is_onfloor_counter++;
        if(this._is_onfloor_counter > 10) {
            this._is_onfloor_counter = 0;
            this._is_onfloor = false;
        }
    }
}

Myself.prototype.translate = function(x, y, z) {
    var prev = this.elem.position();

    this.elem.translate(x, 0, z);

    var pos = this.elem.position();

    if(this.stage.check_collision({x : pos[0], y : prev[1], z : prev[2]})) {
        this.elem.positionX(prev[0]);
    }
    if(this.stage.check_collision({x : prev[0], y : prev[1], z : pos[2]})) {
        this.elem.positionZ(prev[2]);
    }

    return this.elem;
}

Myself.prototype.rotate = function(r) {
    return this.elem.rotateY(this.elem.rotateY() + r);
}

Myself.prototype.getDiff = function() {
    var xx = this.prev.x - this.getElem().positionX();
    var yy = this.prev.y - this.getElem().positionY();
    var zz = this.prev.z - this.getElem().positionZ();
    return xx * xx + yy * yy + zz * zz;
}

Myself.prototype.broadcast = function() {
    var self = this;
    if(this.getDiff() > 0) {
        this.ds.send({
            cmd : "move",
            player_id : self.player_id,
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

Myself.prototype.jump = function() {
    if(this._is_onfloor) {
        this._is_onfloor = false;
        this.vy = 2.8;
    }
}

Myself.prototype.initWeapon = function() {
    var opts = {
        owner_id : this.player_id,
    };
    var weapon  = new Weapon(self.gameManager, opts);
    this.weapon = weapon;
}
