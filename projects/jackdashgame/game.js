/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
var game;

var line;
var graphics;
var circle;
var player;
var offset = 0;
var enemies = [];
var score = 0;
var scoreText;
var textTwo;
var emitter;
var emitter2;
var gameTime;
var enemyRate;
var lastEnemy;
var level = 1;
var alive = true;
var highScore = 0;
var bass;
var mainState = {
    preload: preload,
    create: create,
    update: update
};

// Initialize Phaser
game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');
 
// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');

var enemy = {
    shape: 0,
    speed: 1.5,
    game: 0,
    width: 30,
    height: 30,
    xvelocity: 100,
    yvelocity: 100,
    setup: function(game){
        this.width = (Math.random()* 40 +20)
        this.height = this.width
        this.shape = game.add.graphics( (game.world.width / 2.0), game.world.height / 2.0 + 40);
        game.physics.arcade.enable(this.shape);
        this.shape.body.width = this.width
        this.shape.body.height = this.height
        this.game = game;
        this.xvelocity = (Math.random()* 225 -120);
    },
    update: function(){
        this.shape.body.velocity.x = this.xvelocity;
        this.shape.body.velocity.y = this.yvelocity;
    },
    draw: function(){
        this.shape.clear();
        this.shape.lineStyle(2.0, 0x15c2d6, 1.0);
        this.shape.beginFill(0x15c2d6,0.5);
        this.shape.drawRect(0 , 0 , this.width, this.height);
    },
    death: function(){
        this.shape.destroy();
    }
};

function preload(){
    game.load.audio('bass', 'mp3audio/jackdashdrums.mp3');
    // game.load.image('circle', 'assets/images/particle3.png');
    // game.load.image('enemy', 'assets/images/particle2.png');

}

function create(){

    //add physics for the emitters
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //set the sound for jackdash
    bass = game.add.audio('bass');
    sounds = [ bass]
    game.sound.setDecodedCallback(sounds, startsound, this);

    //add text that gives instructions to the user
    text = game.add.text(170, 90, 'Use Arrow Keys', { fontSize: '42px', fill: '#dd00ff', font: 'georgia',});
    setTimeout(function(){
        text.setText("");
    }, 2550);

    //add reset text
    textTwo = game.add.text(110, 90, ' ', { fontSize: '42px', fill: '#dd00ff', font: 'georgia',});

    // This function is called after the preload function
    // Here we set up the game, display sprites, etc.
    // Create a new graphics object to draw the moving lines
    // Position it 200 pixels left of the center of our game world,
    // and at the bottom of our game world (game.world.height pixels)
    // Since we'll update the moving lines every frame, we only draw to this in our update function.
    graphics = game.add.graphics( (game.world.width / 2.0) - 200, game.world.height);

    //Create a second graphics object to draw a floating circle in the upper left, for demonstration. 
    //For the collision of the player 
    player = game.add.graphics( 320, 440);
    game.physics.arcade.enable(player);
    player.body.width = 50;
    player.body.height = 50;
    player.body.isCircle = true;
    player.body.offset.x = -25;
    player.body.offset.y = -25;

    //Draw a 2px wide line, red, fully transparent
    player.lineStyle(2.0, 0xff0000, 1.0);

    //Fill our shape with a medium red
    player.beginFill(0x660000,0.5);

    //Draw a circle
    circle = player.drawCircle(0, 0, 50);
    player.endFill();

    //for the particles for the collision
    emitter = game.add.emitter(0, 0, 100);

    emitter.makeParticles('circle');
    emitter.gravity = 800;
    emitter.minParticleAlpha = 0.1;
    emitter.maxParticleAlpha = 0.8;

    emitter.minParticleScale = 0.5;
    emitter.minParticleScale = 2.0;
    emitter.minParticleSpeed = new Phaser.Point(-400, -400);
    emitter.maxParticleSpeed = new Phaser.Point(300, 300);


    emitter2 = game.add.emitter(0, 0, 100);
    emitter2.makeParticles('enemy');
    emitter2.gravity = -200;
    emitter2.minParticleAlpha = 0.1;
    emitter2.maxParticleAlpha = 0.5;
    emitter2.minParticleScale = 2.0;
    emitter2.minParticleScale = 5.0;

    //add the text for the score
    scoreText = game.add.text(285, 16, '0', { fontSize: '64px', fill: '#00ff00'});
    highScoreText = game.add.text (15, 16, 'High Score: 0', { fontSize: '25px', fill: '#00ff00', font: 'georgia',});
    
    //give the definition of the variables for the enemy spawn time
    gameTime = Date.now();
    lastEnemy = Date.now();
    enemyRate = 2;
}

function update(){

    //enemy spawning, creating an enemy after the other enemy goes
    if ((((Date.now() - lastEnemy)/1000) > enemyRate) && (alive == true)){
    enemy1 = Object.create(enemy);
    enemy1.setup(game);
    enemies.push(enemy1);
    lastEnemy = Date.now();
    }

    //to create the "levels" of code, enemies coming at different speeds
    //number of seconds the game has been running to determine the level of the game 
    level = (((Date.now() - gameTime)/1000) / 25) + 1 
    if (level > 2.5){
        level = 2.5
    }
    //increase the enemy speed
    enemyRate = 3.0 - level

    //Hold down the "j" key to reverse the line movement
    if (game.input.keyboard.isDown(Phaser.Keyboard.J)){
        offset += 1.0;
    }
    else{
        offset -= 1.0;
    }   

    //reset game
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && alive == false){
        reset();
    }

    //to move jackjack left and right
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        player.x -= 4.0;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        player.x += 4.0;
    }

   //if jackjack goes off the track
    if (player.x < game.world.width/2.0-197 || player.x > game.world.width/2.0+197){

        death();
    }

    // Limit offset to 20px max
    //% is a modulus that means remainder
    //it means divide offset by 20 and leave remainder
    offset = offset % 20;

    //Clear the graphics object -- note that we are doing this is the update function,
    // so once per frame we'll clear and re-draw everything.
    graphics.clear();

    //Draw 2px wide, green lines that are fully transparent.
    graphics.lineStyle(2.0, 0x00ff00, 1.0);

    //Draw our leftmost line from the bottom left corner of our graphics object
    // to the center of the screen and 200px up
    graphics.moveTo(0,0);
    graphics.lineTo(200, -200);

    //Draw our rightmost line from the bottom of our graphics object, 200px right of our center (so 400px total)
    // to the center of the screen and 200px up
    graphics.moveTo(400, 0);
    graphics.lineTo(200, -200);

    //Change our line style to draw 1px wide green lines
    graphics.lineStyle(1.0, 0x00ff00, 1.0);

    //Draw vertical lines starting on the bottom every 50px between our two outer lines, going to 
    // the center of the screen 200px up
    for(i = 50; i < 400; i += 50){
        graphics.moveTo(i, 0);
        graphics.lineTo(200, -200);
    }
    
    //Draw horizontal lines every 20px plus our offset from the leftmost vertical line to the rightmost vertical line
    for(i = 0; i < 200; i += 20){
        lineOffset = offset + i;

        graphics.moveTo(lineOffset, -lineOffset);
        graphics.lineTo((400 - lineOffset), -lineOffset);
    }

    //loop for the enemies
    for(i = 0; i < enemies.length; i ++){
        enemies[i].update();
        enemies[i].draw();
        game.physics.arcade.overlap(enemies[i].shape, player, collisionHandler);
        if (enemies[i].shape.y > game.world.height) {
            if (alive == true) { 
                score += 1;
                scoreText.text = score;
            }
            enemies.splice(i, 1);  
        
        }
        
     }

     if (alive == false) {
        death();
     }

    // game.debug.body(player);
 
}

function collisionHandler (){
    alive = false;
    emitter.x = player.x;
    emitter.y = player.y;
    emitter.start(true, 2000, null, 8000);

}

function death () {
    text.setText("");
    player.exists = false;
    alive = false;
    textTwo.exists = true;
    textTwo.text = 'Press Space To Restart';   
    for(i = 0; i < enemies.length; i ++){
        enemies[i].death();
    }
    enemies = [];

    //update score
    scoreText.text = score;
    if (score > highScore) {
        highScore = score;
        score = 0; 
        highScoreText.text = 'High Score: ' + highScore;
        scoreText.text = score;

    }
    else{
        score = 0;
    }   

}

function reset () {
    textTwo.exists = false;
    player.exists = true; 
    alive = true;
    player.x = 320;
    player.y = 440;
    text.setText("Use Arrow Keys");
    setTimeout(function(){
        text.setText("");
    }, 2550);
    gameTime = Date.now();
    lastEnemy = Date.now();
    enemyRate = 2;
}

function startsound () {
    bass.loopFull(0.6);

}


