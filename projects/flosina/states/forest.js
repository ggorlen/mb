// The Forest in the Outskirts of Blurpia
// Home to Emi's Character

//add scroling feature

var lily;
var music;

const forestState = {

    preload: function () {

        game.load.image('backdrop', 'img/forestKingdom.png');
        game.load.image('map', 'img/main.png');
        
        game.load.spritesheet('lily', 'img/Lily.png', 256, 256, 12);
        
        game.load.audio('forestStream', ['music/forestStream.mp3', 'music/forestStream.ogg']);
    },
    
    create: function () {
            
        game.world.setBounds(0, 0, 1042, 666);
        
        // Set backdrop
        game.add.sprite(0, 0, 'backdrop');
        console.log("Forest!");
        
        game.sound.stopAll();
        music = game.add.audio('forestStream');
        music.loop = true;
        music.play();
        
        // Add some text
    game.add.text(
    328, 135,  // x, y position
      "Hi, my name is Lily.\nI'm a wolf hybrid and I live in this little cottage.\nI like to make butter and bake.\nI also enjoy gardening.", 
      { fontSize: "16px", fill: "#fff" }
        );
      
        // Even moooore text
    game.add.text(
    725, 560, // x, y position
        "I'm generally a shy person but when",
        { fontSize: "16px", fill: "#fff"}
    );
        
        // Even moooore text
    game.add.text(
    700, 580, // x, y position
        " someone messing with something dear to",
        { fontSize: "16px", fill: "#fff"}
    );
      
        // Even moooore text
    game.add.text(
    725, 600, // x, y position
        " me I can get angry quickly.",
        { fontSize: "16px", fill: "#fff"}
    );
        
        // TEXT
    game.add.text(
    160, 580, // x, y position
        "Fun fact about me:\nI have Heterochromia.\nMy left eye is yellow and my right is blue.",
        { fontSize: "16px", fill: "#fff"}
    );
        
        // Add lily character
        lily = game.add.sprite(225, 100, 'lily');
        
        //hello my name is lily. I like to 
        
        lily.scale.setTo(0.6);
        
        // Add button to go to back to Map
        const map = game.add.sprite(50, 50, 'map');
        map.anchor.set(0.5);
        map.inputEnabled = true;
        map.input.useHandCursor = true;  // Change cursor style on mouseover
        map.fixedToCamera = true;
        
        // Add Lily animations
        const lilyFrames = [];
        
        for (let i = 1; i <= 12; i++) {
            lilyFrames.push(i);
        }
        
        lily.animations.add('play', lilyFrames, 10, true);

        // Add a function to the button to be called when the button is clicked
        map.events.onInputDown.add(function () {
            game.state.start('game');
        }, this);

        // Animate char: Lily
        lily.animations.play('play');

    },

    update: function () {
        
        game.world.setBounds(0, 0, 1042, 666);
        
        var x = game.input.mousePointer.x;
        var y = game.input.mousePointer.y;
        
        if (x <= 0 || x >= 800 || y <= 0 || y >= 600) {
            return;
        }
        
        if ((x <= 100)) {
            // left
            game.camera.x -= 4;
        }
        else if ((x >= 700)) {
            // right
            game.camera.x += 4;
        }

        if ((y <= 100)) {
            // up
            game.camera.y -= 4;
        }
        else if ((y >= 500)) {
            // down
            game.camera.y += 4;
        }
        
    }

};
