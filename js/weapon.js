function Weapon(player_id) {
    this.player_id =player_id;
    this.weapon_count = 0;
    this.weapon_max = 5;
    this.weapon_id = "00000";
}

Weapon.prototype.addWeaponCount = function(){
    if (this.weapon_count < this.weapon_max){
        this.weapon_count += 1;
    } else {
        this.weapon_count = 0;
    }
    var weapon_names = [
        '通常弾',
        '強化弾',
        '砲弾',
        'ライフル弾',
        '遠方機雷',
        'マスタードガス'
    ];
    switch(true){
    case this.weapon_count <= this.weapon_max:
        this.weapon_id = "0000" + this.weapon_count;
        break;
    default:
        this.weapon_id = "00000";
        break;
    }
    ViewManager.update_weapon(weapon_names[this.weapon_count]);
}

Weapon.prototype.fire = function(myself, ds_bullet) {
    var self = this;

    if(!ViewManager.dec_mp(10)) return;

    var bullet_id = new Date().getTime().toString(36);
    var x = -Math.cos(myself.getElem().rotateY() - Math.PI / 2) * 150;
    var y = 0;
    var z = Math.sin(myself.getElem().rotateY() - Math.PI / 2) * 150;

    ds_bullet.send({
        bullet_id : bullet_id,
        player_id : this.player_id,
        weapon_id : self.weapon_id,
        /* posで開始位置 */
        /* vecで方向 */
        pos : {
            x : Math.floor(myself.getElem().positionX()),
            y : Math.floor(myself.getElem().positionY()) + 1,
            z : Math.floor(myself.getElem().positionZ())
        },
        vec : {
            x : x,
            y : y,
            z : z
        }
    });
}
