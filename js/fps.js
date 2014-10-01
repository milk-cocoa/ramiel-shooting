$(window).on('hashchange', function(){
    location.reload();
});

jThree( function( j3 ) {//j3 === jThree
    var milkcocoa = new MilkCocoa("https://io-fi0i1mtqo.mlkcca.com:443");
    //io-li0guk7u1
    var ds = milkcocoa.dataStore("sample");
    var ds_bullet = milkcocoa.dataStore("bullet");
    var speed = 3;
    var player_id = new Date().getTime().toString(36);
    var myself = new Myself(gameManager, player_id);
    var gameManager = new GameManager(ds, myself);
    myself.setDataStore(ds);
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
        gameManager.check_hit();
    });


    var player_manager = new PlayerManager(ds);
    ViewManager.update_alives(player_manager.players);
    player_manager.on("update", function(players) {
        ViewManager.update_alives(players);
    });
    player_manager.on("gameover", function(players) {
        GameManager.update_alives(players);
    });
    player_manager.observe(player_id);

    /* 弾丸の発射後にレンダリングを命令:renderはbulletで */
    ds_bullet.on("send", function(e) {
        var args = {
            bullet_id : e.value.bullet_id,
            bullet_pos : e.value.pos,
            bullet_vec : e.value.vec,
            weapon_id : e.value.weapon_id
        }
        var bullet = gameManager.add_bullet(args);
        bullet.render_bullet();
    });

    $(window).on('beforeunload', function() {
        myself.gameover();
    });

    EffectManager.render_move(myself);
    EffectManager.natural_heal();

    $(".loading").addClass("hidden");
},
        function() {//WebGL非対応ブラウザ向け
            alert( "Your browser does not support WebGL." );
        } );
