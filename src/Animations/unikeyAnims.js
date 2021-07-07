import Phaser from 'phaser';

export const createUnikeyAnims = (anims) => {
    anims.create({
        key: 'uniKey-idle',
        frames: [{ key: 'uniKey', frame: 'UniKey_anims_f0.png' }]
    })

    anims.create({
        key: 'uniKey-open',
        frames: anims.generateFrameNames('uniKey', { start: 0, end: 1, prefix: 'UniKey_anims_f', suffix: '.png' }),
        repeat: -1,
        frameRate: 8
    })
}