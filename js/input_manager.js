function InputManager(){
    var self = this;
    self.moveX = 0;
    self.moveY = 0;
    self.moveZ = 0;
    self.rotateY = 0;

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
        case 32: shooting();break;

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
}

InputManager.prototype.getMoveVecor = function(speed){
    return {x: speed*this.moveX, y: speed*this.moveY, z: speed*this.moveZ};
}

InputManager.prototype.getRot = function(camera, delta){
    return camera.getElem().rotateY() + delta*this.rotateY/1500;
}
