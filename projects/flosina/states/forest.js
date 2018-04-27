// The Forest in the Outskirts of Blurpia
// Home to Emi's Character

var lily;

const forestState = {

    preload: function () {

        game.load.image('backdrop', 'img/forestKingdom.png');
        game.load.image('map', 'img/main.png');
        
        game.load.spritesheet('lily', 'img/Lily.png', 256, 256, 12);
    },
    
    create: function () {
        
        game.world.setBounds(0, 0, 1042, 666);
        
        // Set backdrop
        game.add.sprite(0, 0, 'backdrop');
        console.log("Forest!");
        
        // Add lily character
        lily = game.add.sprite(100, 320, 'lily');
        
        // Add button to go to back to Map
        const map = game.add.sprite(50, 50, 'map');
        map.anchor.set(0.5);
        map.inputEnabled = true;
        map.input.useHandCursor = true;  // Change cursor style on mouseover
        
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

    },

    update: function () {
        
        game.world.setBounds(0, 0, 1042, 666);

        // Animate char: Lily
        lily.animations.play('play');
        
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
