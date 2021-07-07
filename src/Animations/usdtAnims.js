import Phaser from 'phaser';

export const createUSDTkeyAnims = (anims) => {
    anims.create({
        key: 'usdtKey-idle',
        frames: [{ key: 'usdtKey', frame: 'USDTkey_anims_f0.png' }]
    })

    anims.create({
        key: 'usdtKey-open',
        frames: anims.generateFrameNames('usdtKey', { start: 0, end: 1, prefix: 'USDTkey_anims_f', suffix: '.png' }),
        repeat: -1,
        frameRate: 8
    })
}