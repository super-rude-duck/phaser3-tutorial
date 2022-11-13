import * as Phaser from 'phaser'

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene')
    this.score = 0
    this.collectStar = function collectStar(
      player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
      star: Phaser.Types.Physics.Arcade.GameObjectWithBody
    ) {
      // console.log('in collectStar')
      // console.log('player', player, 'star', star)
      star.destroy()
      this.score += 1
      // console.log('score', this.score)
      this.scoreDisplay?.setText(`Score: ${this.score}`)
    }
  }

  collectStar?: (
    player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    star: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) => void
  platforms?: Phaser.Physics.Arcade.StaticGroup
  stars?: Phaser.Physics.Arcade.Group
  player?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  scoreDisplay?: Phaser.GameObjects.Text
  score: number

  preload() {
    this.load.image('sky', 'assets/sky.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.image('star', 'assets/star.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
  }

  create() {
    const sky = this.add.image(0, 0, 'sky').setOrigin(0, 0)
    this.platforms = this.physics.add.staticGroup()

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()
    this.platforms.create(600, 400, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(750, 220, 'ground')

    this.player = this.physics.add.sprite(100, 450, 'dude')
    this.scoreDisplay = this.add.text(32, 8, `Score: 0`, {
      fontSize: '32px',
      color: '#000',
    })

    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })

    this.physics.add.collider(this.player, this.platforms)

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 50, stepX: 70 },
      bounceY: Phaser.Math.FloatBetween(0.4, 0.8),
      collideWorldBounds: true,
    })

    this.physics.add.collider(this.stars, this.platforms)

    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      undefined,
      this
    )
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys()
    if (cursors.left.isDown) {
      this.player?.setVelocityX(-160)
      this.player?.anims.play('left', true)
    } else if (cursors.right.isDown) {
      this.player?.setVelocityX(160)
      this.player?.anims.play('right', true)
    } else {
      this.player?.setVelocityX(0)
      this.player?.anims.play('turn')
    }

    if (cursors.up.isDown && this.player?.body.touching.down) {
      this.player.setVelocityY(-330)
    }
  }
}
