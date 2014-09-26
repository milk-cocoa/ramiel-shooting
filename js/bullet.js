function Bullet(gameManager, args) {
    this.gameManager = gameManager;
    this.bullet_id = args.bullet_id;
    this.bullet_pos = args.bullet_pos;
    this.bullet_vec = args.bullet_vec;
    this.weapon_id = args.weapon_id;
    if(this.weapon_id == "00001") {
        this.speed_coef = 4;
        this.range_coef = 1;
    }
    this.elem = null;
}

Bullet.prototype.get_id = function (){
    return this.bullet_id;
}

Bullet.prototype.render_bullet = function (){
    var self = this;
    /* この値が大きいと近くて遅い */
    var speed_and_range = 1500/(self.speed_coef*self.range_coef);

    /* この値が大きいと遠くまで届く */
    var range = 2000*self.range_coef;

    jThree("scene").append('<obj id="'+self.bullet_id+'" style="rotateY: 1.57; position: 15 0 0;"><mesh geo="#bullet" mtl="#bullet-mtl" /></obj>');
    jThree("#" + self.bullet_id).css("position", [ self.bullet_pos.x, self.bullet_pos.y, self.bullet_pos.z]);
    jThree("#" + self.bullet_id).animate({
        positionX : "+="+(self.bullet_vec.x),
        positionY : "+="+(self.bullet_vec.y),
        positionZ : "+="+(self.bullet_vec.z)
    }, speed_and_range);

    setTimeout(function() {
        self.gameManager.remove_bullet(self.get_id());
        jThree("#" + self.get_id()).remove();
    }, range);

    self.elem = jThree("#" + self.get_id());
}
