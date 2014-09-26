function GameManager(){
}

GameManager.check_hit = function(is_gameOver, bullets, camera){
    if(is_gameOver) return;
    Object.keys(bullets).map(function(key) {
        var bullet = bullets[key];
        var xx = camera.getElem().positionX() - bullet.elem.positionX();
        var yy = camera.getElem().positionY() - bullet.elem.positionY();
        var zz = camera.getElem().positionZ() - bullet.elem.positionZ();
        if(xx * xx + yy * yy + zz * zz < 20) {
            ViewManager.dec_hp(20);
            if(Number($("#lifebar").width()) <= 0) {
                is_gameOver = true;
                camera.gameover(ds, player_id);
                alert("HPが0になりました。");
                location.href = "/";
            }
        }
    });
}

