function Weapon() {
    this.weapon_count = 0;
    this.weapon_max = 5;
}

Weapon.prototype.getOwnerID = function(){
    return this.owner_id;
}

Weapon.prototype.setOwnerID = function(owner_id){
    this.owner = owner_id;
}

Weapon.prototype.getWeaponID = function(){
    return this.weapon_id;
}

Weapon.prototype.setWeaponID = function(weapon_id){
    this.weapon_id = weapon_id;
}

Weapon.prototype.addWeaponCount = function(){
    if (this.weapon_count < this.weapon_max){
        this.weapon_count += 1;
    } else {
        this.weapon_count = 0;
    }
}

Weapon.prototype.fire = function(myself, ds_bullet, player_id) {
    // [TODO]
    // このへんの武器決定処理を
    // コンストラクタに持って行きたい
    var self = this;

    if(!ViewManager.dec_mp(10)) return;

    switch(true){
    case this.weapon_count <= this.weapon_max:
        this.weapon_id = "0000" + this.weapon_count;
        break;
    default:
        this.weapon_id = "00000";
        break;
    }

    var bullet_id = new Date().getTime().toString(36);
    var x = -Math.cos(myself.getElem().rotateY() - Math.PI / 2) * 150;
    var y = 0;
    var z = Math.sin(myself.getElem().rotateY() - Math.PI / 2) * 150;

    ds_bullet.send({
        bullet_id : bullet_id,
        player_id : self.owner_id,
        weapon_id : this.weapon_id,
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
