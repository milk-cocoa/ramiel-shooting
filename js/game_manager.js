function GameManager(ds, myself){
    this.bullets = {};
    this.ds = ds;
    this.myself = myself;
    this.is_gameover = false;
}

GameManager.prototype.add_bullet = function(args){
    var bullet = new Bullet(this, args);
    this.bullets[bullet.get_id()] = bullet;
    return bullet;
}

GameManager.prototype.remove_bullet = function(bullet_id){
    delete this.bullets[bullet_id];
}

GameManager.prototype.check_hit = function(){
    var self = this;
    if(self.is_gameover) return;
    Object.keys(self.bullets).map(function(key) {
        var bullet = self.bullets[key];
        var xx = self.myself.getElem().positionX() - bullet.elem.positionX();
        var yy = self.myself.getElem().positionY() - bullet.elem.positionY();
        var zz = self.myself.getElem().positionZ() - bullet.elem.positionZ();
        if(xx * xx + yy * yy + zz * zz < 20) {
            console.log("aaa");
            ViewManager.dec_hp(bullet.damage);
            if(Number($("#lifebar").width()) <= 0) {
                self.is_gameover = true;
                self.myself.gameover(self.ds);
                alert("HPが0になりました。");
                location.href = "/play.html";
            }
        }
    });
}
