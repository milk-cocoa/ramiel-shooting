function Weapon(j3, opts) {
    this.j3 = j3;
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

Weapon.prototype.fire = function(camera, ds_bullet, player_id) {
    var self = this;

    if(!ViewManager.dec_mp(20)) return;
    var id = new Date().getTime().toString(32);
    var x = -Math.cos(camera.getElem().rotateY() - Math.PI / 2) * 150;
    var y = 0;
    var z = Math.sin(camera.getElem().rotateY() - Math.PI / 2) * 150;
    ds_bullet.send({
        bullet_id : id,
        player_id : player_id,
        pos : {
            x : camera.getElem().positionX() + x/20,
            y : camera.getElem().positionY() + y/20,
            z : camera.getElem().positionZ() + z/20
        },
        vec : {
            x : x,
            y : y,
            z : z
        }
    },function(e){
        render_bullet(
            e.value.bullet_id,
            e.value.pos,
            e.value.vec,
            bullets
        );
        //発射確認
        //console.log(e);
    });
}

function render_bullet(bullets_id, bullets_pos, bullets_vec, bullets){
    /* この値が大きいと近くて遅い */
    var speed_and_range = 1500/(self.speed_coef*self.range_coef);

    /* この値が大きいと遠くまで届く */
    var range = 2000*range_coefficient;

    self.j3("scene").append('<obj id="'+id+'" style="rotateY: 1.57; position: 15 0 0;"><mesh geo="#bullet" mtl="#bullet-mtl" /></obj>');
    self.j3("#" + id).css("position", [ pos.x, pos.y, pos.z]);
    self.j3("#" + id).animate({
        positionX : "+="+(vec.x),
        positionY : "+="+(vec.y),
        positionZ : "+="+(vec.z)
    }, speed_and_range);

    setTimeout(function() {
        delete bullets[id];
        j3("#" + id).remove();
    }, range);
    bullets[id] = {
        pos : pos,
        vec : vec,
        elem : j3("#" + id)
    };
}
