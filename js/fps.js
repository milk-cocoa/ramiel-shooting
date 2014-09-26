jThree( function( j3 ) {//j3 === jThree
    var milkcocoa = new MilkCocoa("https://io-fi0i1mtqo.mlkcca.com:443");
    //io-li0guk7u1
    var ds = milkcocoa.dataStore("sample");
    var ds_bullet = milkcocoa.dataStore("bullet");
    var speed = 3;
    var gameManager = new GameManager();
    var player_id = new Date().getTime().toString(36);
    var myself = new Myself(gameManager, player_id);
    var players = {};
    players[player_id] = {};
    var is_gameOver = false;
    var ioManager = new InputManager();

    myself.initWeapon();
    ioManager.on("shoot", function() {
        myself.shoot(ds_bullet);
    });

    ioManager.setMyself(myself);

    var userManager = new UserManager(milkcocoa.dataStore("users"));
    var scoreManager = new ScoreManager(milkcocoa.dataStore("users"));
    userManager.init();
    scoreManager.fetch(function(err, scores) {
        //console.log(scores);
    });

    j3( "rdr" ).update( function( delta ) {
        var moveSpeed = delta * speed / 100;
        var player_vec = ioManager.getMoveVecor(moveSpeed);

        myself.getElem()
            .translate(player_vec.x, player_vec.y, player_vec.z)
            .rotateY(ioManager.getRot(delta));
        gameManager.check_hit(is_gameOver, myself);
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

    /* 弾丸の発射後にレンダリングを命令:renderはbulletで */
    ds_bullet.on("send", function(e) {
        var args = {
            bullet_id : e.value.bullet_id,
            bullet_pos : e.value.pos,
            bullet_vec : e.value.vec,
            weapon_id : e.value.weapon_id
        }
        gameManager.add_bullet(args).render_bullet();
    });


    $(window).on('beforeunload', function() {
        myself.gameover();
    });

    EffectManager.render_move(myself, ds, player_id);
    EffectManager.natural_heal();

    $(".loading").addClass("hidden");
},
        function() {//WebGL非対応ブラウザ向け
            alert( "Your browser does not support WebGL." );
        } );
