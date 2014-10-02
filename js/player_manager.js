function PlayerManager(ds) {
	this.players = {};
    this.listeners = {
        update : [],
        gameover : []
    }
    this.ds = ds;
}

PlayerManager.prototype.on = function(event, cb){
    this.listeners[event].push(cb);
}

PlayerManager.prototype.emit_onupdate = function(e){
    this.listeners["update"].forEach(function(listener) {
        listener(e);
    });
}

PlayerManager.prototype.emit_ongameover = function(e){
    this.listeners["gameover"].forEach(function(listener) {
        listener(e);
    });
}


PlayerManager.prototype.observe = function(player_id) {
    var self = this;
    self.ds.on("send", function(e) {
        if(e.value.cmd == "move") {
            if(e.value.player_id != player_id) {
                if(!self.players.hasOwnProperty(e.value.player_id)) {
                    self.players[e.value.player_id] = new Player(jThree, e.value.player_id, e.value.x, e.value.y, e.value.z);
                    self.emit_onupdate(self.players);
                }
                self.players[e.value.player_id]
                    .setMove(e.value.x, e.value.y, e.value.z);
            }
        }else if(e.value.cmd == "pos") {
            if(e.value.player_id != player_id) {
                if(!self.players.hasOwnProperty(e.value.player_id)) {
                    self.players[e.value.player_id] = new Player(jThree, e.value.player_id, e.value.x, e.value.y, e.value.z);
                    self.emit_onupdate(self.players);
                }
                self.players[e.value.player_id]
                    .setPos(e.value.x, e.value.y, e.value.z);
            }
        }else if(e.value.cmd == "gameover"){
            if(self.players[e.value.player_id]) {
                self.players[e.value.player_id].vanish();
                delete self.players[e.value.player_id];
                self.emit_ongameover(self.players);
            }
        }
    });
}
