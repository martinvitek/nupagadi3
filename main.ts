function createEgg (eggNum: number) {
    if (lastEggX <= 1) {
        nextEggX = randint(0, 2)
    } else {
        nextEggX = randint(1, 3)
    }
    if (nextEggX > 1) {
        nextEggX = nextEggX + 1
    }
    lastEggX = nextEggX
    if (eggNum == 0) {
        egg0 = game.createSprite(nextEggX, 0)
    } else if (eggNum == 1) {
        egg1 = game.createSprite(nextEggX, 0)
    } else if (eggNum == 2) {
        egg2 = game.createSprite(nextEggX, 0)
    } else {
        egg3 = game.createSprite(nextEggX, 0)
    }
}
function playWeWishYou () {
    music.playMelody("A5:2 D6:4 D6:2 E6:2 D6:2 C#6:2 B5:4 G5:4", 120)
    music.playMelody("B5:2 E6:4 E6:2 F#6:2 E6:2 D6:2 C#6:4 A5:4", 120)
    music.playMelody("C#6:2 F#6:4 F#6:2 G6:2 F#6:2 E6:2 D6:4 B5:4", 120)
    music.playMelody("A5:2 B5:2 E6:2 C#6:2 D6:6", 120)
}
input.onButtonPressed(Button.A, function () {
    if (player.get(LedSpriteProperty.X) == 1) {
        player.set(LedSpriteProperty.X, 0)
    } else {
        player.set(LedSpriteProperty.X, 1)
    }
})
function showDelayLevel () {
    delayLevel = (maxDelay - delay) / 50
    if (delayLevel == 0) {
        delayBar.set(LedSpriteProperty.Brightness, 0)
        return
    }
    delayLevel = delayLevel - 1
    delayBar.set(LedSpriteProperty.Brightness, 100)
    delayBar.set(LedSpriteProperty.Y, Math.floor(delayLevel / 2))
    if (delayLevel % 2 == 1) {
        delayBar.set(LedSpriteProperty.Blink, 0)
    } else {
        delayBar.set(LedSpriteProperty.Blink, 300)
    }
}
function playBeep2 () {
    music.playTone(262, music.beat(BeatFraction.Sixteenth))
    music.playTone(330, music.beat(BeatFraction.Sixteenth))
    music.playTone(392, music.beat(BeatFraction.Sixteenth))
}
function checkFallenEgg () {
    if (eggCount < 4) {
        return true
    }
    if (nextEggNum == 0) {
        eggFallen = egg0
    } else if (nextEggNum == 1) {
        eggFallen = egg1
    } else if (nextEggNum == 2) {
        eggFallen = egg2
    } else {
        eggFallen = egg3
    }
    if (player.get(LedSpriteProperty.X) == eggFallen.get(LedSpriteProperty.X)) {
        game.setScore(game.score() + 1)
        eggFallen.delete()
        if (game.score() < 500) {
            return true
        } else {
            game.pause()
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                # . . . #
                . # # # .
                `)
            playWeWishYou()
            game.gameOver()
        }
    } else {
        life = life - 1
        if (life == 0) {
            music.playMelody("C5 B A G F E D C ", 2000)
            music.playMelody("C C C C C C C C ", 2000)
            game.gameOver()
        } else {
            music.playMelody("C5 C C5 C C5 C C5 C ", 2000)
            resetEggs()
            basic.pause(500)
        }
    }
    return false
}
input.onButtonPressed(Button.B, function () {
    if (player.get(LedSpriteProperty.X) == 3) {
        player.set(LedSpriteProperty.X, 4)
    } else {
        player.set(LedSpriteProperty.X, 3)
    }
})
function adjustDelay () {
    if (game.score() == 0) {
        return false
    }
    if (step < 4) {
        return false
    }
    if (game.score() % 10 == 0) {
        delay = delay - 50
        if (delay < 350) {
            playBeep3()
            if (life < 3) {
                life = life + 1
            }
            delay = maxDelay
        } else {
            playBeep2()
        }
        showDelayLevel()
        return true
    } else {
        return false
    }
}
function resetEggs () {
    eggFallen.delete()
    egg0.delete()
    egg1.delete()
    egg2.delete()
    egg3.delete()
    step = 0
    eggCount = 0
    nextEggNum = 0
    lastEggX = 0
    delay = maxDelay
    music.setTempo(120)
    showDelayLevel()
}
function moveEggs () {
    if (eggCount >= 1) {
        egg0.change(LedSpriteProperty.Y, 1)
    }
    if (eggCount >= 2) {
        egg1.change(LedSpriteProperty.Y, 1)
    }
    if (eggCount >= 3) {
        egg2.change(LedSpriteProperty.Y, 1)
    }
    if (eggCount == 4) {
        egg3.change(LedSpriteProperty.Y, 1)
    }
}
function playBeep3 () {
    music.playMelody("C D E F G A B C5 ", 1500)
    music.playMelody("C D E F G A B C5 ", 1200)
    music.playMelody("C D E F G A B C5 ", 800)
    music.setTempo(120)
}
function playBeep () {
    music.playTone(262, music.beat(BeatFraction.Sixteenth))
}
let eggFallen: game.LedSprite = null
let nextEggNum = 0
let delayLevel = 0
let egg3: game.LedSprite = null
let egg2: game.LedSprite = null
let egg1: game.LedSprite = null
let egg0: game.LedSprite = null
let nextEggX = 0
let delay = 0
let maxDelay = 0
let lastEggX = 0
let life = 0
let eggCount = 0
let step = 0
let delayBar: game.LedSprite = null
let player: game.LedSprite = null
player = game.createSprite(0, 4)
delayBar = game.createSprite(2, 0)
delayBar.set(LedSpriteProperty.Brightness, 0)
step = 0
eggCount = 0
life = 3
lastEggX = 0
maxDelay = 850
delay = maxDelay
basic.forever(function () {
    if (step < 4) {
        eggCount = step
    } else {
        eggCount = 4
    }
    moveEggs()
    nextEggNum = step % 4
    if (checkFallenEgg() == true) {
        createEgg(nextEggNum)
        if (adjustDelay() == false) {
            playBeep()
        }
        step = step + 1
    }
    basic.pause(delay)
})
