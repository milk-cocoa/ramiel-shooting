function Bullet(args) {
    this.bullet_id = args.bullet_id;
    this.bullet_pos = args.bullet_pos;
    this.bullet_vec = args.bullet_vec;
    this.speed_coef = args.speed_coef;
    this.range_coef = args.range_coef;
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
        delete bullets[id];
        j3("#" + id).remove();
    }, self.range);
    bullets[id] = {
        pos : self.bullet_pos,
        vec : self.bullet_vec,
        elem : jThree("#" + id)
    };
}
