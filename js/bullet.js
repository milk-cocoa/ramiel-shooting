function Bullet(gameManager, args) {
    this.gameManager = gameManager;
    this.bullet_id = args.bullet_id;
    this.player_id = args.player_id;
    this.bullet_pos = args.bullet_pos;
    this.bullet_vec = args.bullet_vec;
    this.weapon_id = args.weapon_id;
    this.elem = null;
    this.damage = 10;
    this.range = 4.2;
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
    var range_coef;
    var speed_coef;

    switch (this.weapon_id) {
    case "00001": // large gun
        range_coef = 0.7;
        speed_coef = 0.7;
        self.damage = 20;
        self.range = 2;
        break;
    case "00002": // canon
        range_coef = 4;
        speed_coef = 0.3;
        self.damage = 15;
        self.range = 3;
        break;
    case "00003": // magnum
        range_coef = 1;
        speed_coef = 1;
        self.damage = 40;
        self.range = 1;
        break;
    case "00004": // mine
        range_coef = 10;
        speed_coef = 10;
        self.damage = 3;
        self.range = 15;
        break;
    case "00005": // jaming
        range_coef = 10;
        speed_coef = 10;
        self.damage = 0.2;
        self.range = 25;
        break;
    default:
        range_coef = 1;
        speed_coef = 1;
        break;
    }

    /* この値が大きいと近くて遅い */
    var speed_and_range = 1500/(speed_coef*range_coef);
    /* この値が大きいと遠くまで届く */
    var range = 2000*range_coef;

    if(this.weapon_id != "00005"){
        jThree("scene").append('<obj id="'+self.bullet_id+'" style="rotateY: 0;"><mesh geo="#bullet'+this.weapon_id+'" mtl="#bullet-mtl" /></obj>');
    } else {
        //ジャミングエフェクト
        //何故かundefinedな値をmtlに渡すとスケルトンになるので
        //とりあえずそれで(ひどい)
        var bullet_color_decoy;
        jThree("scene").append('<obj id="'+self.bullet_id+'" style="rotateY: 0;"><mesh geo="#bullet'+this.weapon_id+'" mtl="#bullet-mtl' + bullet_color_decoy + '" /></obj>');
    }
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
