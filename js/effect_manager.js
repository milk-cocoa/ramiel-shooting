function EffectManager() {
}

EffectManager.render_move = function(myself, ds, player_id) {
    setInterval(function() {
        myself.broadcast(ds, player_id);
    }, 800);
}

EffectManager.natural_heal = function() {
    setInterval(function() {
        ViewManager.inc_mp(11);
    }, 500);
}
