jThree( function( j3 ) {//j3 === jThree
    var appid = "flagi9edsvtg";
    // io-fi0i1mtqo //jthreefps.mlkcca-app.com
    // io-li0guk7u1 //ramiel.mlkcca-app.com
    var milkcocoa = new MilkCocoa(appid + ".mlkcca.com");
    chatpart.start({
        host :  appid + ".mlkcca.com",
        datastore  : "message",
        milkcocoa : milkcocoa
    });
    var ds = milkcocoa.dataStore("fps");
    var ds_bullet = ds.child("bullet");
    var speed = 3;
    var stage = new Stage();
    stage.init();
    var player_id = new Date().getTime().toString(36);
    var myself = new Myself(player_id, stage);
    var gameManager = new GameManager(ds, myself, stage);
    myself.setDataStore(ds);
    var ioManager = new InputManager();

    ioManager.on("shoot", function() {
        myself.shoot(ds_bullet);
    });

    ioManager.on("keyup", function(vec) {
        myself.broadcast("pos");
    });

    ioManager.on("move", function(vec) {
        myself.translate(vec.x, vec.y, vec.z);
    });

    ioManager.on("rotate", function(rotateY) {
        myself.rotate(rotateY);
    });

    ioManager.on("jump", function() {
        myself.jump();
        myself.broadcast("pos");
    });

    weapon = new Weapon(player_id);
    myself.initWeapon(weapon);
    ioManager.on("weaponchange", function() {
        weapon.addWeaponCount();
    });

    var userManager = new UserManager(ds.child("users"));
    var scoreManager = new ScoreManager(ds.child("users"));
    userManager.init();
    
    j3( "rdr" ).update( function( delta ) {
        ioManager.update(delta);
        gameManager.check_hit();
        myself.update();
    });


    var player_manager = new PlayerManager(ds);
    ViewManager.update_alives(player_manager.players);
    player_manager.on("update", function(players) {
        ViewManager.update_alives(players);
    });
    player_manager.on("gameover", function(e) {
        ViewManager.update_alives(e.players);
        if(myself.player_id == e.killer_id) {
            userManager.update_score(1, 0);
        }
    });
    player_manager.observe(player_id);

    /* 弾丸の発射後にレンダリングを命令:renderはbulletで */
    ds_bullet.on("send", function(e) {
        // gameManagerの当たり判定で使うユーザー情報などを登録
        var bullet = gameManager.add_bullet({
            bullet_id : e.value.bullet_id,
            player_id : e.value.player_id,
            bullet_pos : e.value.pos,
            bullet_vec : e.value.vec,
            weapon_id : e.value.weapon_id
        });
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