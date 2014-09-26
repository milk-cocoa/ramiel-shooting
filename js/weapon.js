function Weapon(opts) {
    this.weapon_id = new Date().getTime().toString(32);
    this.owner = opts.owner_id;
    this.size_coef = opts.size;
    this.damage_coef = opts.damage;
    this.speed_coef = opts.speed;
    this.range_coef = opts.range;
    this.span_coef = opts.span;
    this.angle = opts.angle;
    this.amount = opts.amount;
}

Weapon.prototype.getOwnerID = function(){
    return this.owner_id;
}

Weapon.prototype.getWeaponID = function(){
    return this.weapon_id;
}

Weapon.prototype.fire = function(myself, ds_bullet, player_id) {
    var self = this;

    if(!ViewManager.dec_mp(20)) return;
    var id = new Date().getTime().toString(32);
    var x = -Math.cos(myself.getElem().rotateY() - Math.PI / 2) * 150;
    var y = 0;
    var z = Math.sin(myself.getElem().rotateY() - Math.PI / 2) * 150;
    ds_bullet.send({
        bullet_id : id,
        player_id : player_id,
        pos : {
            x : myself.getElem().positionX() + x/20,
            y : myself.getElem().positionY() + y/20,
            z : myself.getElem().positionZ() + z/20
        },
        vec : {
            x : x,
            y : y,
            z : z
        }
    },function(e){
        var args = {
            bullet_id : e.value.bullet_id,
            bullet_pos : e.value.pos,
            bullet_vec : e.value.vec,
            speed_coef : self.speed_coef,
            range_coef : self.range_coef
        }
        var bullet = new Bullet(args);
        bullet.render_bullet();
    });
}
