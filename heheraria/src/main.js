import './style.css'
import Phaser from 'phaser';
import Game from './scenes/Game';

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 400,
            },
            debug: true,
        }
    },
    scene: Game,
})