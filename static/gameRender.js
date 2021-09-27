const config = {
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_VERTICALLY,
    width: 1000,
    height: 600,
  },
  type: Phaser.AUTO,

  physics: {
    default: 'arcade',
    arcade: {
      fps: 60,
      gravity: { y: 0 },
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

const SEAFLOOR = config.scale.height;
const LANDHEIGHT = 200;

//collection of game objects
const gameObjects = {}

function preload() {

  // window.game = this;
  this.load.image('sky', 'static/assets/sky.png');
  this.load.audio('music', ['static/assets/music_luke.wav',])
}

function create() {
  this.sound.pauseOnBlur = false;
  this.sound.volume = 1;
  gameObjects.music = this.sound.add('music')
  gameObjects.music.play()

  //background (sky)
  this.add.image(0, 0, 'sky').setOrigin(0, 0);


  //ocean
  gameObjects.ocean = this.add.rectangle(0,SEAFLOOR,600, state.seaLevelHeight, 0x0289C1, 0.5).setOrigin(0,1);

  //land
  gameObjects.land = this.add.rectangle(600,SEAFLOOR,400, LANDHEIGHT, 0x00ff00).setOrigin(0,1);
  gameObjects.beach = this.add.triangle(600,SEAFLOOR,300,0,0,LANDHEIGHT,300,200,0xffff00).setOrigin(1,1)
  this.beachLength = 0;
  //sea wall
  gameObjects.wall = this.add.rectangle(600,SEAFLOOR-LANDHEIGHT,20,1,0x6A6B6C).setOrigin(0,1)
}

function update() {
  // if (state.seaLevelHeight < 800){
  //   state.seaLevelHeight = state.seaLevelHeight + 0.1
  // }

  //seawall related rendering
  if (state.wallStrength > gameObjects.wall.displayHeight / 20) gameObjects.wall.displayHeight = state.wallStrength * 20;
  if (state.flooded == true){
    gameObjects.wall.displayHeight = state.seaLevelHeight - gameObjects.wall.displayHeight / 2;
    gameObjects.ocean.displayWidth = 1000;
  }

  
  if (state.beachLength != this.beachLength) {
    this.beachLength = state.beachLength
    gameObjects.beach.displayWidth = 300 + state.beachLength * 30;
  }
  
  gameObjects.ocean.displayHeight = state.seaLevelHeight
  
}