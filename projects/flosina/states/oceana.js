// The Underwater Sub-Kingdom of Oceana
// Home to Mia the Mermaid / Siren

var mia;

const oceanaState = {

    preload: function () {

        game.load.image('backdrop', 'img/oceanaKingdom.png');
        game.load.image('map', 'img/main.png');
        
        game.load.spritesheet('mia', 'img/MermaidHelen.png', 256, 256, 13);
        
    },

    create: function () {
        
        game.world.setBounds(0, 0, 1042, 666);
        
        game.add.sprite(0, 0, 'backdrop');
        console.log("Oceana!");
        
         // Add some text
    game.add.text(
    350, 400,  // x, y position
      "Hi, my name is Mia.", 
      { fontSize: "16px", fill: "#fff" }
        );
        
        // Add some more text
    game.add.text(
    250, 425,  // x, y position
      "I'm a siren who lives in the ocean!", 
      { fontSize: "16px", fill: "#fff" }
        );
        
        // Add some more text
    game.add.text(
    700, 560,  // x, y position
      "My hobbies include:", 
      { fontSize: "16px", fill: "#fff" }
        );
        
        // Add some more text
    game.add.text(
    700, 580,  // x, y position
      "- Singing", 
      { fontSize: "16px", fill: "#fff" }
        );
        
        // Add some more text
    game.add.text(
    700, 600,  // x, y position
      "- Luring people to thier death", 
      { fontSize: "16px", fill: "#fff" }
        );
        

        // Add Mia character
        mia = game.add.sprite(550, 360, 'mia');
        
        mia.scale.setTo(0.8);
        
        // Add button to go to back to Map
        
        const map = game.add.sprite(50, 50, 'map');
        map.anchor.set(0.5);
        map.inputEnabled = true;
        map.input.useHandCursor = true;  // Change cursor style on mouseover
        map.fixedToCamera = true;
        
        // Add Mia animations
        const miaFrames = [];
        
        for (let i = 1; i < 14; i++) {
            miaFrames.push(i);
        }
        
        mia.animations.add('play', miaFrames, 10, true);

        // Add a function to the button to be called when the button is clicked
        map.events.onInputDown.add(function () {
            game.state.start('game');
        }, this);

    },

    update: function () {

        // Animate char: Mia
        mia.animations.play('play');
        
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