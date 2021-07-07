import Phaser from 'phaser';

export const createDogekeyAnims = (anims) => {
    anims.create({
        key: 'dogekey-idle',
        frames: [{ key: 'dogeKey', frame: 'dogeKey_anims_f0.png' }]
    })

    anims.create({
        key: 'dogekey-open',
        frames: anims.generateFrameNames('dogeKey', { start: 0, end: 1, prefix: 'dogeKey_anims_f', suffix: '.png' }),
        repeat: -1,
        frameRate: 8
    })
}