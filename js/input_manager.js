function InputManager(player){
    var self = this;
    self.moveX = 0;
    self.moveY = 0;
    self.moveZ = 0;
    self.rotateY = 0;
    self.listeners = {
        shoot : []
    }
    self.first = [];
    self.rat = {};

    $( window ).keydown( function( e ) {
        switch( e.keyCode ) {

        case 87: /*W*/ self.moveZ = -1; break;
        case 83: /*S*/ self.moveZ = 1; break;

        case 65: /*A*/ self.moveX = -1; break;
        case 68: /*D*/ self.moveX = 1; break;

        case 37: /*left*/ self.rotateY = 1; break;
        case 39: /*right*/ self.rotateY = -1; break;

            // case 82: /*R*/ speed += 1; break;
            // case 70: /*F*/ speed -= 1; break;
        case 32: self.emit_onshoot();break;

        }
    } ).keyup( function( e ) {
        switch( e.keyCode ) {

        case 87: /*W*/
        case 83: /*S*/ self.moveZ = 0; break;

        case 65: /*A*/
        case 68: /*D*/ self.moveX = 0; break;

            // case 38: /*up*/
            // case 40: /*down*/ moveY = 0; break;

        case 37: /*left*/
        case 39: /*right*/ self.rotateY = 0; break;

        }

    } );

    if(DeviceUtil.isMobile()) {
        window.addEventListener("deviceorientation", function( e ) {
            self.init_orientation(e);
            window.removeEventListener( "deviceorientation", arguments.callee, false );
            window.addEventListener( "deviceorientation", function(e) {
                self.rotateY = (e.alpha - self.first[0]) * -0.002;
        }, false );
        }, false );
    }
}

InputManager.prototype.init_orientation = function(e){
    this.first = [e.alpha, e.gamma, e.beta];
}

InputManager.prototype.update_orientation = function(e){
    this.rotateY = e.webkitCompassHeading - this.first;
}

InputManager.prototype.getMoveVecor = function(speed){
    return {x: speed*this.moveX, y: speed*this.moveY, z: speed*this.moveZ};
}

InputManager.prototype.getRot = function(delta){
    return this.myself.getElem().rotateY() + delta*this.rotateY/1500;
}

InputManager.prototype.on = function(event, cb){
    this.listeners[event].push(cb);
}

InputManager.prototype.emit_onshoot = function(e){
    this.listeners["shoot"].forEach(function(listener) {
        listener(e);
    });
}

InputManager.prototype.setMyself = function(myself){
    this.myself = myself;
}

InputManager.prototype.setPlayer = function(player){
    this.player = player;
}
