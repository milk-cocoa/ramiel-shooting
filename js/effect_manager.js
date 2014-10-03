function EffectManager() {
}

EffectManager.render_move = function(myself) {
    setInterval(function() {
        myself.broadcast();
    }, 1000);
}

EffectManager.natural_heal = function() {
    setInterval(function() {
        ViewManager.inc_mp(9);
    }, 500);
}
