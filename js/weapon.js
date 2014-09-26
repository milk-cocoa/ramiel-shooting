function Weapon(gameManager, opts) {
    this.gameManager = gameManager;
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

Weapon.prototype.fire = function(myself, ds_bullet, player_id) {
    var self = this;

    if(!ViewManager.dec_mp(13)) return;
    var weapon_id = "00001";

    /* とりあえずhash値で武器選択 */
    var hash = decodeURI(location.hash.substr(1));
    if (hash == "1" || hash == "2" || hash == "3" || hash == "4") {
        weapon_id = "0000" + hash;
    }

    var bullet_id = new Date().getTime().toString(32);
    var x = -Math.cos(myself.getElem().rotateY() - Math.PI / 2) * 150;
    var y = 0;
    var z = Math.sin(myself.getElem().rotateY() - Math.PI / 2) * 150;

    ds_bullet.send({
        bullet_id : bullet_id,
        player_id : player_id,
        weapon_id : weapon_id,
        /* posで開始位置 */
        /* vecで方向 */
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
    });
}
