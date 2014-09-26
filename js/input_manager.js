function InputManager(){
    this.moveX = 0;
    this.moveY = 0;
    this.moveZ = 0;
    this.rotateY = 0;

    $( window ).keydown( function( e ) {
        switch( e.keyCode ) {

        case 87: /*W*/ this.moveZ = -1; break;
        case 83: /*S*/ this.moveZ = 1; break;

        case 65: /*A*/ this.moveX = -1; break;
        case 68: /*D*/ this.moveX = 1; break;

        case 37: /*left*/ this.rotateY = 1; break;
        case 39: /*right*/ this.rotateY = -1; break;

            // case 82: /*R*/ speed += 1; break;
            // case 70: /*F*/ speed -= 1; break;
        case 32: shooting();break;

        }


    } ).keyup( function( e ) {

        switch( e.keyCode ) {

        case 87: /*W*/
        case 83: /*S*/ this.moveZ = 0; break;

        case 65: /*A*/
        case 68: /*D*/ this.moveX = 0; break;

            // case 38: /*up*/
            // case 40: /*down*/ moveY = 0; break;

        case 37: /*left*/
        case 39: /*right*/ this.rotateY = 0; break;

        }

    } );
}

InputManager.prototype.getMoveVecor = function(speed){
    return {X: speed*this.moveX, Y: speed*this.moveY, Z: speed*this.moveZ};
}

InputManager.prototype.getRot = function(camera, delta){
    return camera.getElem().rotateY() + delta*this.rotateY/1500;
}
