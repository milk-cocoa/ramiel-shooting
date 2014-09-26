function EffectManager() {
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
