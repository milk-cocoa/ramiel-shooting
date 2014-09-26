function Bullet(gameManager, args) {
    this.gameManager = gameManager;
    this.bullet_id = args.bullet_id;
    this.bullet_pos = args.bullet_pos;
    this.bullet_vec = args.bullet_vec;
    this.weapon_id = args.weapon_id;
    this.speed_coef = args.speed_coef;
    this.range_coef = args.range_coef;
    this.elem = null;
}

Bullet.prototype.get_id = function (){
    return this.bullet_id;
}

Bullet.prototype.render_bullet = function (){
    var self = this;

    /* 弾丸の形を定義する。デフォルトで1 1 1 */
    /* 10 10 10だとでかい球体 */
    var bullet_shape = "1 1 1";
    switch (this.weapon_id) {
        case "00001":
        bullet_shape = "10 0 1"
        break;
        case "00002":
        bullet_shape = "5 5 5"
        break;
        case "00003":
        bullet_shape = "1 1 10"
        break;
        case "00004":
        bullet_shape = "100 1 1"
        break;
    }

    /* この値が大きいと近くて遅い */
    var speed_and_range = 1500/(self.speed_coef*self.range_coef);

    /* この値が大きいと遠くまで届く */
    var range = 2000*self.range_coef;
    jThree("head").append('<geo id="bullet" type="Sphere" param="' + bullet_shape + '" />')
    jThree("scene").append('<obj id="'+self.bullet_id+'" style="rotateY: 1.57; position: 15 0 0;"><mesh geo="#bullet" mtl="#bullet-mtl" /></obj>');
    jThree("#" + self.bullet_id).css("position", [ self.bullet_pos.x, self.bullet_pos.y, self.bullet_pos.z]);
    jThree("#" + self.bullet_id).animate({
        positionX : "+="+(self.bullet_vec.x),
        positionY : "+="+(self.bullet_vec.y),
        positionZ : "+="+(self.bullet_vec.z)
    }, speed_and_range);
    //jThree("geo#bullet")[0].attributes[2].value = "10 10 10";
    setTimeout(function() {
        self.gameManager.remove_bullet(self.get_id());
        jThree("#" + self.get_id()).remove();
    }, range);

    self.elem = jThree("#" + self.get_id());
}
