(function(global){

	function DeviceUtil() {

	}

	DeviceUtil.rat = {};

	DeviceUtil.init = function() {
		switchOrientation();
		var agent = navigator.userAgent;
		if(agent.search(/iPhone/) != -1){
			window.onorientationchange = switchOrientation;
		}else{
			window.onresize = switchOrientation;
		}
		window.addEventListener("deviceorientation", function( e ) {
			DeviceUtil.init_orientation(e);
			window.removeEventListener( "deviceorientation", arguments.callee, false );
			window.addEventListener( "deviceorientation", DeviceUtil.update, false );
		}, false );
	}

	DeviceUtil.init_orientation = function(e) {
		this.first = [ e.alpha, e.gamma, e.beta ];
	}

	DeviceUtil.update = function(e) {
		this.rat.a = e.alpha;
		this.rat.b = e.beta;
		this.rat.g = e.gamma;
	}

	function switchOrientation() {
		var orientation = window.orientation;
		if(orientation == 0){
		}else{
		}
	}

	var agent = navigator.userAgent;

		this.camera.quaternion.setFromEuler( {
			x: this.degToRad( e.gamma - this.first[ 1 ] ),
			y: this.degToRad( e.alpha - this.first[ 0 ] ),
			z: this.degToRad( e.beta - this.first[ 2 ] ) / 2
		} );

	global.DeviceUtil = DeviceUtil;
}(window))
