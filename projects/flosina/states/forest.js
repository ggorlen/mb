// The Forest in the Outskirts of Blurpia
// Home to Emi's Character

const forestState = {

    preload: function () {

        game.load.image('backdrop', 'img/forestKingdom.jpg');
        game.load.image('map', 'img/main.png');
        
    },

    create: function () {
        
        game.add.sprite(0, 0, 'backdrop');
        console.log("Forest!");
        
        // Add button to go to back to Map
        
        const map = game.add.sprite(50, 50, 'map');
        map.anchor.set(0.5);
        map.inputEnabled = true;
        map.input.useHandCursor = true;  // Change cursor style on mouseover

        // Add a function to the button to be called when the button is clicked
        map.events.onInputDown.add(function () {
            game.state.start('game');
        }, this);

    },

    update: function () {

        
        
    }

};