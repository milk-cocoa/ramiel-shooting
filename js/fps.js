jThree( function( j3 ) {//j3 === jThree
    var milkcocoa = new MilkCocoa("https://io-fi0i1mtqo.mlkcca.com:443");
    //io-li0guk7u1
    var ds = milkcocoa.dataStore("sample");
    var ds_bullet = milkcocoa.dataStore("bullet");
    var speed = 3;
    var camera = new Camera(j3);
    var ioManager = new InputManager();
    var player_id = new Date().getTime().toString(36);
    var players = {};
    players[player_id] = {};
    var bullets = {};
    var is_gameOver = false;

    j3( "rdr" ).update( function( delta ) {
        ioManager.setCamera(camera);
        ioManager.setDS_Bullet(ds_bullet);
        ioManager.setPlayerID(player_id);
        var moveSpeed = delta * speed / 100;
        var player_vec = ioManager.getMoveVecor(moveSpeed);
        camera.getElem()
            .translate(player_vec.x, player_vec.y, player_vec.z)
            .rotateY(ioManager.getRot(delta));
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
                players[e.value.player_id]
                    .setPos(e.value.x, e.value.y, e.value.z);
            }
        }else if(e.value.cmd == "gameover"){
            players[e.value.player_id].vanish();
            delete players[e.value.player_id];
            GameManager.update_alives();
        }
    });

    ds_bullet.on("send", function(e) {
        EffectManager.render_bullet(
            j3,
            e.value.bullet_id,
            e.value.pos,
            e.value.vec,
            bullets
        );
    });

    $(window).on('beforeunload', function() {
        camera.gameover();
    });

    EffectManager.render_move(camera, ds, player_id);
    EffectManager.natural_heal();

    $(".loading").addClass("hidden");
},
        function() {//WebGL非対応ブラウザ向け
            alert( "Your browser does not support WebGL." );
        } );
