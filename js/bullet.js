function Bullet(gameManager, args) {
    this.gameManager = gameManager;
    this.bullet_id = args.bullet_id;
    this.player_id = args.player_id;
    this.bullet_pos = args.bullet_pos;
    this.bullet_vec = args.bullet_vec;
    this.weapon_id = args.weapon_id;
    this.elem = null;
    this.damage = 10;
}

Bullet.prototype.get_id = function (){
    return this.bullet_id;
}

Bullet.prototype.get_player_id = function (){
    return this.player_id;
}

Bullet.prototype.remove = function (){
    var self = this;
    self.gameManager.remove_bullet(self.get_id());
    self.elem.remove();
}

Bullet.prototype.render_bullet = function (){
    var self = this;

    /* 弾丸の形を定義する。デフォルトで1 1 1 */
    /* 10 10 10だとでかい球体 */
    var bullet_shape = "1 1 1";
    var range_coef = 1;
    var speed_coef = 1;

    self.damage = 10;
    console.log(this.weapon_id);
    switch (this.weapon_id) {
        case "00001": // large gun
        bullet_shape = "3 3 3";
        range_coef = 0.7;
        speed_coef = 0.7;
        self.damage = 15;
        break;
        case "00002": // canon
        bullet_shape = "5 5 5";
        range_coef = 4;
        speed_coef = 0.3;
        self.damage = 30;
        break;
        case "00003": // magnum
        bullet_shape = "0.5 1 1";
        range_coef = 1;
        speed_coef = 1;
        self.damage = 50;
        break;
        case "00004": // mine
        bullet_shape = "15 15 15";
        range_coef = 10;
        speed_coef = 10;
        self.damage = 15;
        break;
        case "00005": // poison fog
        bullet_shape = "50 100 100";
        range_coef = 10;
        speed_coef = 10;
        self.damage = 5;
        break;
    }

    /* この値が大きいと近くて遅い */
    var speed_and_range = 1500/(speed_coef*range_coef);
    /* この値が大きいと遠くまで届く */
    var range = 2000*range_coef;

    jThree("scene").append('<obj id="'+self.bullet_id+'" style="rotateY: 0;"><mesh geo="#bullet'+this.weapon_id+'" mtl="#bullet-mtl" /></obj>');
    jThree("#" + self.bullet_id).css("position", [ self.bullet_pos.x, self.bullet_pos.y, self.bullet_pos.z]);
    jThree("#" + self.bullet_id).animate({
        positionX : "+="+(self.bullet_vec.x),
        positionY : "+="+(self.bullet_vec.y),
        positionZ : "+="+(self.bullet_vec.z)
    }, speed_and_range);
    setTimeout(function() {
        self.remove();
    }, range);

    self.elem = jThree("#" + self.get_id());
}
