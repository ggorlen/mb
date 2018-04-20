// The Underwater Sub-Kingdom of Oceana
// Home to Mia the Mermaid / Siren

const oceanaState = {

    preload: function () {

        game.load.image('backdrop', 'img/oceanaKingdom.jpg');
        game.load.image('map', 'img/main.png');
        
    },

    create: function () {
        
        game.add.sprite(0, 0, 'backdrop');
        console.log("Oceana!");
        
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