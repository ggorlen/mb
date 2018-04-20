var map;
var cursors;

// Create the main game state class
const gameState = {

    preload: function () {

        game.load.image('backdrop', 'img/flosina.png');
        game.load.image('blurpia', 'img/blurpia.png');
        game.load.image('oceana', 'img/oceana.png');
        game.load.image('forest', 'img/forest.png');
        game.load.image('sky', 'img/sky.png');
        
    },

    create: function () {

        game.world.setBounds(0, 0, 1920, 1080);

        game.add.sprite(0, 0, 'backdrop');

        
        
        
        
        
/*********************/
        
        // Add button to go to Blurpia game state
        
        
        const blurpia = game.add.sprite(400, 400, 'blurpia');
        blurpia.anchor.set(0.5);
        blurpia.inputEnabled = true;
        blurpia.input.useHandCursor = true;  // Change cursor style on mouseover

        // Add a function to the button to be called when the button is clicked
        blurpia.events.onInputDown.add(function () {
            game.state.start('blurpia');
        }, this);
        
        
        
/*********************/
        
        
        
        
        
/*********************/
        
        // Add button to go to Oceana game state
        
        
        const oceana = game.add.sprite(100, 100, 'oceana');
        oceana.anchor.set(0.5);
        oceana.inputEnabled = true;
        oceana.input.useHandCursor = true;  // Change cursor style on mouseover

        // Add a function to the button to be called when the button is clicked
        oceana.events.onInputDown.add(function () {
            game.state.start('oceana');
        }, this);
        
        
        
/*********************/
        

        
        

/*********************/
        
        // Add button to go to Forest game state
        
        
        const forest = game.add.sprite(100, 400, 'forest');
        forest.anchor.set(0.5);
        forest.inputEnabled = true;
        forest.input.useHandCursor = true;  // Change cursor style on mouseover

        // Add a function to the button to be called when the button is clicked
        forest.events.onInputDown.add(function () {
            game.state.start('forest');
        }, this);
        
        
        
/*********************/
        




/*********************/
        
        // Add button to go to Sky game state
        
        
        const sky = game.add.sprite(600, 100, 'sky');
        sky.anchor.set(0.5);
        sky.inputEnabled = true;
        sky.input.useHandCursor = true;  // Change cursor style on mouseover

        // Add a function to the button to be called when the button is clicked
        sky.events.onInputDown.add(function () {
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
