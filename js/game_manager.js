function GameManager(){
    this.bullets = {};
}

GameManager.prototype.add_bullet = function(args){
    switch (args.weapon_id) {
        case "00001":
        args.speed_coef = 1;
        args.range_coef = 1;
        break;
        case "00002":
        args.speed_coef = 1.2;
        args.range_coef = 1.2;
        break;
        case "00003":
        args.speed_coef = 1.4;
        args.range_coef = 1.4;
        break;
        case "00004":
        args.speed_coef = 2;
        args.range_coef = 2;
        break;
    }
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
            ViewManager.dec_hp(12);
            if(Number($("#lifebar").width()) <= 0) {
                is_gameOver = true;
                myself.gameover(ds, player_id);
                alert("HPが0になりました。");
                location.href = "/play.html";
            }
        }
    });
}

