var map;
var cursors;
var music;

var upA;
var downA;
var leftA;
var rightA;

var moved = false;

function fade(sprite) {
            
    game.add.tween(sprite).to({alpha: 0}, 175, Phaser.Easing.Linear.None, true);
            
}
        
function fadeArrows() {
            
    fade(upA);
    fade(downA);
    fade(leftA);
    fade(rightA);
    
    moved = true;
            
}

function fadeIn(sprite) {
            
    game.add.tween(sprite).to({alpha: 1}, 175, Phaser.Easing.Linear.None, true);
            
}
        
function fadeInArrows() {
            
    fadeIn(upA);
    fadeIn(downA);
    fadeIn(leftA);
    fadeIn(rightA);
            
}

function fullArrows() {
    upA.alpha = 1;
    downA.alpha = 1;
    leftA.alpha = 1;
    rightA.alpha = 1;
}

// Create the main game state class
const gameState = {

    preload: function () {

        game.load.image('backdrop', 'img/flosina.png');
        game.load.image('blurpia', 'img/Asighnn.png');
        game.load.image('oceana', 'img/asighns.png');
        game.load.image('forest', 'img/Aasighn.png');
        game.load.image('sky', 'img/Asighn.png');
        
        game.load.image('upA', 'img/ShroooomsUp.gif');
        game.load.image('downA', 'img/ShroooomsDown.gif');
        game.load.image('leftA', 'img/ShroooomsLeft.gif');
        game.load.image('rightA', 'img/ShroooomsRight.gif');
	    
	game.load.audio('endlessJourney', ['music/endlessJourney.mp3', 'music/endlessJourney.ogg']);
        
    },

    create: function () {

        game.world.setBounds(0, 0, 1920, 1080);

        game.add.sprite(0, 0, 'backdrop');
    
	game.sound.stopAll();
	music = game.add.audio('endlessJourney');
	music.loop = true;
	music.play();
        

        // Game: 800x600
        upA = game.add.sprite(365, 20, 'upA');
        upA.scale.setTo(0.25);
        upA.fixedToCamera = true;
        
        downA = game.add.sprite(365, 520, 'downA');
        downA.scale.setTo(0.25);
        downA.fixedToCamera = true;
        
        leftA = game.add.sprite(20, 275, 'leftA');
        leftA.scale.setTo(0.25);
        leftA.fixedToCamera = true;
        
        rightA = game.add.sprite(715, 275, 'rightA');
        rightA.scale.setTo(0.25);
        rightA.fixedToCamera = true;
        
        fullArrows();
        
        
        
        
        
/*********************/
        
        // Add button to go to Blurpia game state
        
        
        const blurpia = game.add.sprite(200, 475, 'blurpia');
        blurpia.scale.setTo(0.5);
        blurpia.anchor.set(0.5);
        blurpia.inputEnabled = true;
        blurpia.input.useHandCursor = true;  // Change cursor style on mouseover

        // Add a function to the button to be called when the button is clicked
        blurpia.events.onInputDown.add(function () {
		musicTime = music.markers.currentTime;
		returned = true;
		music.pause();
            game.state.start('blurpia');
        }, this);
        
        
        
/*********************/
        
        
        
        
        
/*********************/
        
        // Add button to go to Oceana game state
        
        
        const oceana = game.add.sprite(1425, 1025, 'oceana');
        oceana.scale.setTo(0.45);
        oceana.anchor.set(0.5);
        oceana.inputEnabled = true;
        oceana.input.useHandCursor = true;  // Change cursor style on mouseover

        // Add a function to the button to be called when the button is clicked
        oceana.events.onInputDown.add(function () {
		returned = true;
		music.pause();
            game.state.start('oceana');
        }, this);
        
        
        
/*********************/
        

        
        

/*********************/
        
        // Add button to go to Forest game state
        
        
        const forest = game.add.sprite(100, 825, 'forest');
        forest.scale.setTo(0.4);
        forest.anchor.set(0.5);
        forest.inputEnabled = true;
        forest.input.useHandCursor = true;  // Change cursor style on mouseover

        // Add a function to the button to be called when the button is clicked
        forest.events.onInputDown.add(function () {
		returned = true;
		music.pause();
            game.state.start('forest');
        }, this);
        
        
        
/*********************/
        




/*********************/
        
        // Add button to go to Sky game state
        
        
        const sky = game.add.sprite(1400, 500, 'sky');
        sky.scale.setTo(0.2);
        sky.anchor.set(0.5);
        sky.inputEnabled = true;
        sky.input.useHandCursor = true;  // Change cursor style on mouseover

        // Add a function to the button to be called when the button is clicked
        sky.events.onInputDown.add(function () {
		returned = true;
		music.pause();
            game.state.start('sky');
        }, this);
        
        
        
/*********************/
        
        
        
        
        
        cursors = game.input.keyboard.createCursorKeys();
    
    },
        
        
        
        


    update: function () {
        
        var x = game.input.mousePointer.x;
        var y = game.input.mousePointer.y;
        
        if (x <= 0 || x >= 800 || y <= 0 || y >= 600) {
            return;
        }
        
        if (x <= 100) {
            // left
            game.camera.x -= 4;
            fadeArrows();
        }
        else if (x >= 700) {
            // right
            game.camera.x += 4;
            fadeArrows();
        }

        else if (y <= 100) {
            // up
            game.camera.y -= 4;
            fadeArrows();
        }
        else if (y >= 500) {
            // down
            game.camera.y += 4;
            fadeArrows();
        } else {
            game.time.events.add(5000,
                                 
                function () {
                    
                    if (moved) {
                        fadeInArrows();
                    }
                    else if (!moved) {
                        fullArrows();
                    }
                
                }
                                 
            );
        }
        
    }

};
