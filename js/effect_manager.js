function EffectManager() {
}

EffectManager.render_bullet = function(j3, id, pos, vec) {
    j3("scene").append('<obj id="'+id+'" style="rotateY: 1.57; position: 15 0 0;"><mesh geo="#bullet" mtl="#bullet-mtl" /></obj>');
    j3("#" + id).css("position", [ pos.x, pos.y, pos.z]);
    j3("#" + id).animate({positionX : "+="+(vec.x), positionY : "+="+(vec.y), positionZ : "+="+(vec.z)}, 1500);
    setTimeout(function() {
        delete bullets[id];
        j3("#" + id).remove();
    }, 2000);
    bullets[id] = {
        pos : pos,
        vec : vec,
        elem : j3("#" + id)
    };
}

EffectManager.render_move = function(camera, ds, player_id) {
    setInterval(function() {
        camera.broadcast(ds, player_id);
    }, 1200);
}

EffectManager.natural_heal = function() {
    setInterval(function() {
        ViewManager.inc_mp(10);
    }, 500);
}
