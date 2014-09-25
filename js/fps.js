jThree( function( j3 ) {//j3 === jThree
	var milkcocoa = new MilkCocoa("https://io-li0guk7u1.mlkcca.com");
	var ds = milkcocoa.dataStore("sample");
	var ds_bullet = milkcocoa.dataStore("bullet");
    var moveX = moveY = moveZ = rotateY = 0;
    var speed = 3;
    var camera = new Camera();
    var player_id = new Date().getTime().toString(36);
    var players = {};
    players[player_id] = {};
    var bullets = {};
    var is_gameOver = false;

    j3( "rdr" ).update( function( delta ) {

        var moveSpeed = delta * speed / 100;

        camera.getElem().translate( moveSpeed * moveX, moveSpeed * moveY, moveSpeed * moveZ )
        .rotateY( camera.getElem().rotateY() + delta * rotateY / 1500 );

        check_hit();
    });

    update_alives();

    ds.on("send", function(e) {
    	if(e.value.cmd == "move") {
	    	if(e.value.player_id != player_id) {
	    		if(!players.hasOwnProperty(e.value.player_id)) {
	    			players[e.value.player_id] = new Player(e.value.player_id, e.value.x, e.value.y, e.value.z);
	    			update_alives();
	    		}
	    		players[e.value.player_id].setPos(e.value.x, e.value.y, e.value.z);
	    	}
    	}else if(e.value.cmd == "gameover"){
    		players[e.value.player_id].vanish();
    		delete players[e.value.player_id];
    		update_alives();
    	}
    });

    ds_bullet.on("send", function(e) {
    	shooting_inner(e.value.bullet_id, e.value.pos, e.value.vec);
    });

    function check_hit() {
    	if(is_gameOver) return;
    	Object.keys(bullets).map(function(key) {
    		var bullet = bullets[key];
    		var xx = camera.getElem().positionX() - bullet.elem.positionX();
    		var yy = camera.getElem().positionY() - bullet.elem.positionY();
    		var zz = camera.getElem().positionZ() - bullet.elem.positionZ();
    		if(xx * xx + yy * yy + zz * zz < 20) {
    			dec_hp(20);
    			if(Number($("#lifebar").width()) <= 0) {
    				is_gameOver = true;
    				camera.gameover();
    				alert("HPが0になりました。");
    				location.href = "/";
    			}
    		}
    	});
    }

	$(window).on('beforeunload', function() {
    	camera.gameover();
	});

	function update_alives() {
		$("#alives").html("生存者" + Object.keys(players).length);
	}

    function dec_hp(amount) {
    	$("#lifebar").width(Number($("#lifebar").width()) - amount);
    }

    function inc_mp(amount) {
    	if(Number($("#powerbar").width()) >= 200) return false;
    	$("#powerbar").width(Number($("#powerbar").width()) + amount);
    	return true;
    }

    function dec_mp(amount) {
    	if(Number($("#powerbar").width()) < 20) return false;
    	$("#powerbar").width(Number($("#powerbar").width()) - amount);
    	return true;
    }

    function shooting_inner(id, pos, vec) {
		j3("scene").append('<obj id="'+id+'" style="rotateY: 1.57; position: 15 0 0;"><mesh geo="#bullet" mtl="#bullet-mtl" /></obj>');
	    j3("#" + id).css("position", [ pos.x, pos.y, pos.z]);
		j3("#" + id).animate({positionX : "+="+(vec.x), positionY : "+="+(vec.y), positionZ : "+="+(vec.z)}, 1500);
		setTimeout(function() {
			delete bullets[id];
			j3("#" + id).remove();
		}, 2000);
		bullets[id] = {
			pos : pos,
			vec : vec,
			elem : j3("#" + id)
		};
    }

    function shooting() {
    	if(!dec_mp(20)) return;
	    var id = new Date().getTime().toString(32);
	    var x = -Math.cos(camera.getElem().rotateY() - Math.PI / 2) * 150;
	    var y = 0;
	    var z = Math.sin(camera.getElem().rotateY() - Math.PI / 2) * 150;
		ds_bullet.send({
			bullet_id : id,
			player_id : player_id,
			pos : {
				x : camera.getElem().positionX() + x/20,
				y : camera.getElem().positionY() + y/20,
				z : camera.getElem().positionZ() + z/20
			},
			vec : {
				x : x,
				y : y,
				z : z
			}
		});
    }

    setInterval(function() {
    	camera.broadcast(player_id);
    }, 1200);

    setInterval(function() {
    	inc_mp(10);
    }, 500);

    function Camera() {
    	this.elem = j3( "camera" );
    	this.prev = {
    		x : 0,
    		y : 0,
    		z : 0
    	};
    	this.elem.css("position", [100 - Math.random() * 200, -25, 100  - Math.random() * 50]);
    }

    Camera.prototype.getElem = function() {
    	return this.elem;
    }

    Camera.prototype.translate = function(x, y, z) {
    	return this.elem.translate(x, y, z);
    }

    Camera.prototype.getDiff = function() {
	    var xx = this.prev.x - this.getElem().positionX();
	    var yy = this.prev.y - this.getElem().positionY();
	    var zz = this.prev.z - this.getElem().positionZ();
	    return xx * xx + yy * yy + zz * zz;
    }

    Camera.prototype.broadcast = function(player_id) {
    	if(this.getDiff() > 0) {
    		ds.send({
	    		cmd : "move",
    			player_id : player_id,
	        	x : this.getElem().positionX(),
	        	y : this.getElem().positionY(),
	        	z : this.getElem().positionZ()
	        });
	    	this.prev.x = this.getElem().positionX();
	    	this.prev.y = this.getElem().positionY();
	    	this.prev.z = this.getElem().positionZ();
    	}
    }

    Camera.prototype.gameover = function() {
    	ds.send({
    		cmd : "gameover",
    		player_id : player_id
	    });
    }

    function Player(id, x, y, z) {
		j3( "scene" ).append('<obj id="'+id+'" style="rotateY: 1.57; position: 15 0 0;"><mesh geo="#player" mtl="#player-mtl" /></obj>');
    	this.id = id;
    	this.elem = j3("#" + id);
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

    $( window ).keydown( function( e ) {
        switch( e.keyCode ) {

        case 87: /*W*/ moveZ = -1; break;
        case 83: /*S*/ moveZ = 1; break;

        case 65: /*A*/ moveX = -1; break;
        case 68: /*D*/ moveX = 1; break;

        case 37: /*left*/ rotateY = 1; break;
        case 39: /*right*/ rotateY = -1; break;

        case 82: /*R*/ speed += 1; break;
        case 70: /*F*/ speed -= 1; break;
        case 32: shooting();break;

        }


    } ).keyup( function( e ) {

        switch( e.keyCode ) {

        case 87: /*W*/
        case 83: /*S*/ moveZ = 0; break;

        case 65: /*A*/
        case 68: /*D*/ moveX = 0; break;

        case 38: /*up*/
        case 40: /*down*/ moveY = 0; break;

        case 37: /*left*/
        case 39: /*right*/ rotateY = 0; break;

        }

    } );
    $(".loading").addClass("hidden");
},
function() {//WebGL非対応ブラウザ向け
    alert( "Your browser does not support WebGL." );
} );