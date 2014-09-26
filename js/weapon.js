function Weapon(params) {
    this.owner = params.owner_id;
    this.size = params.size;
    this.damage = params.damage;
    this.speed = params.speed;
    this.range = params.range;
    this.angle = params.angle;
    this.amount = params.amount;
    this.span = params.span;
    this.position = params.position;
    this.expire = params.expire;
}

Weapon.prototype.getOwnerID = function(){
    return this.owner_id;
}

Weapon.fire = function(camera, ds_bullet, player_id) {
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
        //発射確認
        //console.log(e);
    });
}
