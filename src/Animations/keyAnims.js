import Phaser from 'phaser';

export const createkeyAnims = (anims) => {
    anims.create({
        key: 'key-idle',
        frames: [{ key: 'key', frame: 'Key_anims_f0.png' }]
    })

    anims.create({
        key: 'key-open',
        frames: anims.generateFrameNames('key', { start: 0, end: 1, prefix: 'Key_anims_f0', suffix: '.png' }),
        repeat: -1,
        frameRate: 8
    })
}