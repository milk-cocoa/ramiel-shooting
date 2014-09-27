function GameManager(ds, player_id){
    this.bullets = {};
    this.ds = ds;
    this.player_id = player_id;
}

GameManager.prototype.add_bullet = function(args){
    var bullet = new Bullet(this, args);
    this.bullets[bullet.get_id()] = bullet;
    return bullet;
}

GameManager.prototype.remove_bullet = function(bullet_id){
    delete this.bullets[bullet_id];
}

GameManager.prototype.check_hit = function(is_gameOver, myself){
    var self = this;
    if(is_gameOver) return;
    Object.keys(self.bullets).map(function(key) {
    var bullet = self.bullets[key];
        var xx = myself.getElem().positionX() - bullet.elem.positionX();
        var yy = myself.getElem().positionY() - bullet.elem.positionY();
        var zz = myself.getElem().positionZ() - bullet.elem.positionZ();
        if(xx * xx + yy * yy + zz * zz < 20) {
            ViewManager.dec_hp(bullet.damage);
            if(Number($("#lifebar").width()) <= 0) {
                is_gameOver = true;
                myself.gameover(this.ds, self.player_id);
                alert("HPが0になりました。");
                location.href = "/play.html";
            }
        }
    });
}
