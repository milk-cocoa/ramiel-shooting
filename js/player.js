function Player(j3, player_id, x, y, z) {
    j3( "scene" ).append('<obj id="'+player_id+'" style="rotateY: 1.57; position: 15 0 0;"><mesh geo="#player" mtl="#player-mtl" /></obj>');
    this.player_id = player_id;
    this.elem = j3("#" + player_id);
    this.prev = {
        x : x,
        y : y,
        z : z
    };
}

Player.prototype.setPos = function(x, y, z) {
    var xx = x - this.prev.x;
    var yy = y - this.prev.y;
    var zz = z - this.prev.z;
    this.elem.css("position", [ x, y, z ]);
    this.prev.x = this.elem.positionX();
    this.prev.y = this.elem.positionY();
    this.prev.z = this.elem.positionZ();
    this.elem.animate({positionX : "+="+(xx), positionY : "+="+(yy), positionZ : "+="+(zz)}, 1000);
}

Player.prototype.vanish = function() {
    var self = this;
    this.elem.animate({scaleX : "+=10", scaleY : "+=10", scaleZ : "+=10"}, 500);
    setTimeout(function() {
        self.elem.remove();
    }, 500);
}

Player.prototype.dec_hp = function(amount) {
    $("#lifebar").width(Number($("#lifebar").width()) - amount);
}

Player.prototype.dec_mp = function(amount) {
    if(Number($("#powerbar").width()) < 20) return false;
    $("#powerbar").width(Number($("#powerbar").width()) - amount);
    return true;
}

Player.prototype.inc_mp = function(amount) {
    if(Number($("#powerbar").width()) >= 200) return false;
    $("#powerbar").width(Number($("#powerbar").width()) + amount);
    return true;
}
