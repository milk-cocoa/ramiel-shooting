jThree( function( j3 ) {//j3 === jThree
    var milkcocoa = new MilkCocoa("https://io-fi0i1mtqo.mlkcca.com:443");
    //io-li0guk7u1
    var ds = milkcocoa.dataStore("sample");
    var ds_bullet = milkcocoa.dataStore("bullet");
    var ioManager = new InputManager();
    var speed = 3;
    var camera = new Camera(j3);
    var player_id = new Date().getTime().toString(36);
    var players = {};
    players[player_id] = {};
    var bullets = {};
    var is_gameOver = false;

    j3( "rdr" ).update( function( delta ) {
        var moveSpeed = delta * speed / 100;
        var vec = ioManager.getMoveVecor(moveSpeed);
        camera.getElem()
            .translate(vec.x, vec.y, vec.z)
            .rotateY(ioManager.getRot(camera, delta));
        GameManager.check_hit(is_gameOver, bullets, camera);
    });

    ViewManager.update_alives(players);

    ds.on("send", function(e) {
        if(e.value.cmd == "move") {
            if(e.value.player_id != player_id) {
                if(!players.hasOwnProperty(e.value.player_id)) {
                    players[e.value.player_id] = new Player(j3, e.value.player_id, e.value.x, e.value.y, e.value.z);
                    ViewManager.update_alives(players);
                }
                players[e.value.player_id].setPos(e.value.x, e.value.y, e.value.z);
            }
        }else if(e.value.cmd == "gameover"){
            players[e.value.player_id].vanish();
            delete players[e.value.player_id];
            GameManager.update_alives();
        }
    });

    ds_bullet.on("send", function(e) {
        EffectManager
            .render_bullet(e.value.bullet_id, e.value.pos, e.value.vec);
    });

    $(window).on('beforeunload', function() {
        camera.gameover();
    });

    function shooting() {
        if(!ViewManager.dec_mp(20)) return;
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
    EffectManager.render_move(camera, ds, player_id);
    EffectManager.natural_heal();

    $(".loading").addClass("hidden");
},
        function() {//WebGL非対応ブラウザ向け
            alert( "Your browser does not support WebGL." );
        } );
