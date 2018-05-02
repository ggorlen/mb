// The Sky Sub-Kingdom
// Home to Aidan's Character

var angelw;

const skyState = {

    preload: function () {

        game.load.image('backdrop', 'img/skyKingdom.png');
        game.load.image('map', 'img/main.png');
        
         game.load.spritesheet('angelw', 'img/AngelWings.png', 256, 256, 13);
        
    },

    create: function () {
        
        game.world.setBounds(0, 0, 1042, 666);
        
        // Set backdrop
        game.add.sprite(0, 0, 'backdrop');
        console.log("Sky!");
        
        // Add AngelW character
        angelw = game.add.sprite(350, 200, 'angelw');
        
        angelw.scale.setTo(0.3);
        
        // Add button to go to back to Map
        const map = game.add.sprite(50, 50, 'map');
        map.anchor.set(0.5);
        map.inputEnabled = true;
        map.input.useHandCursor = true;  // Change cursor style on mouseover
        map.fixedToCamera = true;
        
        // Add AngelW animations
        const angelwFrames = [];
        
        for (let i = 1; i < 14; i++) {
            angelwFrames.push(i);
        }
        
        angelw.animations.add('play', angelwFrames, 10, true);

        // Add a function to the button to be called when the button is clicked
        map.events.onInputDown.add(function () {
            game.state.start('game');
        }, this);
        
    },
            
    update: function () {

        // Animate char: Angel WIngs
        angelw.animations.play('play');
        
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
