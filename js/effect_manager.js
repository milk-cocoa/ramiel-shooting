function EffectManager() {
}

EffectManager.render_move = function(myself) {
    setInterval(function() {
        myself.broadcast();
    }, 800);
}

EffectManager.natural_heal = function() {
    setInterval(function() {
        ViewManager.inc_mp(11);
    }, 500);
}
