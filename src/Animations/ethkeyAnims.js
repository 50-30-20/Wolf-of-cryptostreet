import Phaser from 'phaser';

export const createETHkeyAnims = (anims) => {
    anims.create({
        key: 'ethKey-idle',
        frames: [{ key: 'ethKey', frame: 'ETHkey_anims_f0.png' }]
    })

    anims.create({
        key: 'ethKey-open',
        frames: anims.generateFrameNames('ethKey', { start: 0, end: 1, prefix: 'ETHkey_anims_f', suffix: '.png' }),
        repeat: -1,
        frameRate: 8
    })
}