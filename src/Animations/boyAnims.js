export const createCharacterAnims = (anims) => {
    anims.create({
        key: 'boy-run-down',
        frames: anims.generateFrameNames('boy', { start: 0, end: 3, prefix: 'boy_anims_f', suffix: '.png' }),
        repeat: -1,
        frameRate: 8
    })

    anims.create({
        key: 'boy-run-up',
        frames: anims.generateFrameNames('boy', { start: 0, end: 3, prefix: 'boy_anims_up_f', suffix: '.png' }),
        repeat: -1,
        frameRate: 8
    })

    anims.create({
        key: 'boy-run-left',
        frames: anims.generateFrameNames('boy', { start: 0, end: 3, prefix: 'boy_anims_left_f', suffix: '.png' }),
        repeat: -1,
        frameRate: 8
    })

    anims.create({
        key: 'boy-run-right',
        frames: anims.generateFrameNames('boy', { start: 0, end: 3, prefix: 'boy_anims_right_f', suffix: '.png' }),
        repeat: -1,
        frameRate: 8
    })
}
