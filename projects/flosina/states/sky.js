// The Sky Sub-Kingdom
// Home to Aidan's Character

var angelw;
var music;

const skyState = {

    preload: function () {

        game.load.image('backdrop', 'img/skyKingdom.png');
        game.load.image('map', 'img/main.png');
        
         game.load.spritesheet('angelw', 'img/AngelWings.png', 256, 256, 13);
        
        game.load.audio('skyMusic', ['music/sky.mp3', 'music/sky.ogg']);
        
    },

    create: function () {
         
        game.world.setBounds(0, 0, 1042, 666);
	    
        // Set backdrop
        game.add.sprite(0, 0, 'backdrop');
        console.log("Sky!");
        
        game.sound.stopAll();
		music = game.add.audio('skyMusic');
	   	music.loop = true;
		music.play();
        
         game.add.text(
    195, 150,  // x, y position
      "Hi, my name is Angel Wings,nice to meet you!", 
      { fontSize: "16px", fill: "#fff" }
        );
        
    game.add.text(
    190,175,  // x, y position
      "I like to fly", 
      { fontSize: "16px", fill: "#58f229" }
        );
        
    game.add.text(
    85, 200,  // x, y position
      "I like hanging out with my friends.", 
      { fontSize: "16px", fill: "#5bc0ef" }
        );
         game.add.text(
    125, 225,  // x, y position
      "I like to eat sushi.", 
      { fontSize: "16px", fill: "#ef5bea" }
        );
        game.add.text(
    75,250,  // x, y position
      "I like to be in open spaces.", 
      { fontSize: "16px", fill: "#d30ccd" }
        );
         game.add.text(
    30,275,  // x, y position
      "I enjoy singing to  my favorite songs.", 
      { fontSize: "16px", fill: "#5406a8" }
        );
          game.add.text(
    75,300,  // x, y position
      "I enjoy dancing to the beat.", 
      { fontSize: "16px", fill: "#a11adb" }
        );
         game.add.text(
    75,325,  // x, y position
      "I enjoy talking a lot.", 
      { fontSize: "16px", fill: "#f9980e" }
        );
        game.add.text(
    75,350,  // x, y position
      "I don't like mean comments said  about me.", 
      { fontSize: "16px", fill: "#58f229" }
        );
        game.add.text(
    75,375,  // x, y position
      "I'm scared of being lonely.", 
      { fontSize: "16px", fill: "#5bc0ef" }
        );
        game.add.text(
    75,400,  // x, y position
      "I'm afraid of the dark.", 
      { fontSize: "16px", fill: "#ef5bea" }
        );
         game.add.text(
    75,425,  // x, y position
      "I don't like the feeling of depression.", 
      { fontSize: "16px", fill: "#d30ccd" }
        );
         game.add.text(
    75,450,  // x, y position
      "I'm an easy-going person.", 
      { fontSize: "16px", fill: "#5406a8" }
        );
        game.add.text(
    75,475,  // x, y position
      "I can be a scaredy cat.", 
      { fontSize: "16px", fill: "#alladb" }
        );
        game.add.text(
    75,500,  // x, y position
      "I can get nervous at times.", 
      { fontSize: "16px", fill: "#f9980e" }
        );
        game.add.text(
    75,525,  // x, y position
      "I try to be funny.", 
      { fontSize: "16px", fill: "#58f229" }
        );
        game.add.text(
    75,550,  // x, y position
      "I might jump the gun a few times.", 
      { fontSize: "16px", fill: "#5bc0ef" }
        );
        game.add.text(
    75,575,  // x, y position
      "I am hard-working.", 
      { fontSize: "16px", fill: "#ef5bea" }
        );
        // Add AngelW character
        angelw = game.add.sprite(300, 150, 'angelw');
        
        angelw.scale.setTo(0.7);
        
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

        // Animate char: Angel Wings
        angelw.animations.play('play');
        
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

}
