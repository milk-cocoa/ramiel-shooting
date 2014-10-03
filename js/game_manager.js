function GameManager(ds, myself, stage){
    this.bullets = {};
    this.ds = ds;
    this.myself = myself;
    this.stage = stage;
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
        if(xx * xx + yy * yy + zz * zz < (bullet.size + 2) * (bullet.size + 2) && self.myself.player_id != bullet.get_player_id()) {
            console.log(self.myself.player_id);
            console.log(bullet.get_player_id());
            ViewManager.dec_hp(bullet.damage);
            if(Number($("#lifebar").width()) <= 0) {
                self.is_gameover = true;
                self.myself.gameover(self.ds);
                alert("コアを損傷、形状崩壊しました。");
                location.href = "/play.html";
            }
        }
        if(self.stage.check_collision({
            x : bullet.elem.positionX(),
            y : bullet.elem.positionY(),
            z : bullet.elem.positionZ()})) {
            bullet.remove();
        }
    });
}
