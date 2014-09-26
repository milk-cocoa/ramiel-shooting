function GameManager(){
}

GameManager.check_hit = function(is_gameOver, bullets, myself){
    if(is_gameOver) return;
    Object.keys(bullets).map(function(key) {



				var bullet = bullets[key];
        var xx = myself.getElem().positionX() - bullet.elem.positionX();
        var yy = myself.getElem().positionY() - bullet.elem.positionY();
        var zz = myself.getElem().positionZ() - bullet.elem.positionZ();
        if(xx * xx + yy * yy + zz * zz < 20) {
            ViewManager.dec_hp(20);
            if(Number($("#lifebar").width()) <= 0) {
                is_gameOver = true;
                myself.gameover(ds, player_id);
                alert("HPが0になりました。");
                location.href = "/play.html";
            }
        }
    });
}

