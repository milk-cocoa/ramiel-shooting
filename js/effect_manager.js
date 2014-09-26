function EffectManager() {
}

EffectManager.render_move = function(myself, ds, player_id) {
    setInterval(function() {
        myself.broadcast(ds, player_id);
    }, 1200);
}

EffectManager.natural_heal = function() {
    setInterval(function() {
        ViewManager.inc_mp(10);
    }, 500);
}
