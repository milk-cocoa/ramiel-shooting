(function(global){

	var ua = {};
	ua.name = window.navigator.userAgent.toLowerCase();
	 
	ua.isIE = (ua.name.indexOf('msie') >= 0 || ua.name.indexOf('trident') >= 0);
	ua.isiPhone = ua.name.indexOf('iphone') >= 0;
	ua.isiPod = ua.name.indexOf('ipod') >= 0;
	ua.isiPad = ua.name.indexOf('ipad') >= 0;
	ua.isiOS = (ua.isiPhone || ua.isiPod || ua.isiPad);
	ua.isAndroid = ua.name.indexOf('android') >= 0;
	ua.isTablet = (ua.isiPad || (ua.isAndroid && ua.name.indexOf('mobile') < 0));

	ua.isPC = !(ua.isiPad || ua.isiPhone || ua.isAndroid);

	function DeviceUtil() {

	}

	DeviceUtil.isPC = function() {
		return ua.isPC;
	}

	DeviceUtil.isMobile = function() {
		return !ua.isPC;
	}
	
	global.DeviceUtil = DeviceUtil;
}(window))
