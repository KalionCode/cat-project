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
  this.load.image('land', 'static/assets/landSprite.png')
  this.load.image('house', 'static/assets/house.png')

  this.load.image('brick', 'static/assets/brick1.png')
  this.load.image('damaged-brick', 'static/assets/brick2.png')

  this.load.audio('music', ['static/assets/music_luke.wav',])

  this.load.image('water1', 'static/assets/water/1.png')
  this.load.image('water2', 'static/assets/water/2.png')
  this.load.image('water3', 'static/assets/water/3.png')
  this.load.image('water4', 'static/assets/water/4.png')
  this.load.image('water5', 'static/assets/water/5.png')
  this.load.image('water6', 'static/assets/water/6.png')
  this.load.image('water7', 'static/assets/water/7.png')
  this.load.image('water8', 'static/assets/water/8.png')
  this.load.image('water9', 'static/assets/water/9.png')
  this.load.image('water10', 'static/assets/water/10.png')
  this.load.image('water11', 'static/assets/water/11.png')
  this.load.image('water12', 'static/assets/water/12.png')
  this.load.image('water13', 'static/assets/water/13.png')
  this.load.image('water14', 'static/assets/water/14.png')
  this.load.image('water15', 'static/assets/water/15.png')
  this.load.image('water16', 'static/assets/water/16.png')
  this.load.image('water17', 'static/assets/water/17.png')

}

function create() {
  this.sound.pauseOnBlur = false;
  this.sound.volume = 1;
  gameObjects.music = this.sound.add('music')
  gameObjects.music.play({
    loop: true,
    delay: 3,
  })

  this.anims.create({
    key: 'seawave',
    frames: [
      { key: 'water1' },
      { key: 'water2' },
      { key: 'water3' },
      { key: 'water4' },
      { key: 'water5' },
      { key: 'water6' },
      { key: 'water7' },
      { key: 'water8' },
      { key: 'water9' },
      { key: 'water10' },
      { key: 'water11' },
      { key: 'water12' },
      { key: 'water13' },
      { key: 'water14' },
      { key: 'water15' },
      { key: 'water16' },
      { key: 'water17' },
    ],
    frameRate: 10,
    repeat: -1,
  })

  //background (sky)
  this.add.image(0, 0, 'sky').setOrigin(0, 0);

  //house
  gameObjects.house = this.add.image(800, SEAFLOOR - LANDHEIGHT, 'house').setOrigin(0, 1)

  //ocean
  gameObjects.oceanBlock = this.add.rectangle(0, SEAFLOOR + 1, 600, 1, 0x3CBFF0).setOrigin(0, 1);
  gameObjects.ocean = [];
  for (let i = 0; i < 10; i++) {
    gameObjects.ocean.push(this.add.sprite(i * 128, SEAFLOOR + (110 - state.seaLevelHeight), 'water1').setOrigin(0, 1).play('seawave'))
  }
  //land
  gameObjects.land = this.add.image(600, SEAFLOOR, 'land').setOrigin(0, 1);
  gameObjects.beach = this.add.triangle(600, SEAFLOOR, 300, 0, 0, LANDHEIGHT, 300, 200, 0xFFCF5C).setOrigin(1, 1)
  this.beachLength = 0;



  //sea wall
  // gameObjects.wall = this.add.image(600,SEAFLOOR-LANDHEIGHT, 'brick').setOrigin(0,1)
  this.wallHeight = 0
  gameObjects.wall = [];
}

function update() {
  // if (state.seaLevelHeight < 800){
  //   state.seaLevelHeight = state.seaLevelHeight + 0.1
  // }

  //seawall related rendering
  if (state.wallStrength > this.wallHeight) {

    gameObjects.wall.push(this.add.image(600, (SEAFLOOR - LANDHEIGHT) - this.wallHeight * 30, 'brick').setOrigin(0, 1))
    this.wallHeight = state.wallStrength;
  }

  if (state.wallStrength < this.wallHeight / 2) {
    for (let i of gameObjects.wall) {
      i.setTexture('damaged-brick')
    }
  } else {
    for (let i of gameObjects.wall) {
      i.setTexture('brick')
    }
  }

  if (state.flooded == true) {
    for (let i of gameObjects.wall) {
      i.destroy()
    }
    gameObjects.oceanBlock.displayWidth = 1000;
  }


  //beach related rendering
  if (state.beachLength != this.beachLength) {
    this.beachLength = state.beachLength
    gameObjects.beach.displayWidth = 300 + state.beachLength * 30;
  }

  for (let i of gameObjects.ocean) {
    i.y = SEAFLOOR - (state.seaLevelHeight - 110)
  }
  gameObjects.oceanBlock.displayHeight = (state.seaLevelHeight - 110) + 1

}