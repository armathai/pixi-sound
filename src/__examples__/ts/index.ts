/* eslint-disable @typescript-eslint/no-var-requires */
/// <reference types="../../../bin/pixi-sound.js" />
/// <reference types="pixi.js" />
import '../../../bin/pixi-sound';

class Game extends PIXI.Application {
    public constructor() {
        super({ resizeTo: window, backgroundColor: 0xffffff });
        const sounds = {
            loop: require('../assets/loop.mp3'),
            lose: require('../assets/lose.mp3'),
            tap: require('../assets/tap.mp3'),
            win: require('../assets/win.mp3'),
        };
        Object.keys(sounds).forEach((s) => {
            PIXI.sound.add(s, {
                src: sounds[s],
            });
        });
        PIXI.sound.fadeIn('loop', 0.5, {
            loop: true,
            volume: 0.2,
        });

        const loseText = new PIXI.Text('LOSE');
        this.stage.addChild(loseText);
        loseText.interactive = true;
        loseText.buttonMode = true;
        loseText.on('pointerdown', () => this._playSFX('lose'));

        const winText = new PIXI.Text('WIN');
        winText.y = loseText.height;
        this.stage.addChild(winText);
        winText.interactive = true;
        winText.buttonMode = true;
        winText.on('pointerdown', () => this._playSFX('win'));

        const tapText = new PIXI.Text('TAP');
        tapText.y = winText.height + loseText.height;
        this.stage.addChild(tapText);
        tapText.interactive = true;
        tapText.buttonMode = true;
        tapText.on('pointerdown', () => this._playSFX('tap'));

        const pauseAllText = new PIXI.Text('PAUSE ALL');
        pauseAllText.y = winText.height + loseText.height + tapText.height;
        this.stage.addChild(pauseAllText);
        pauseAllText.interactive = true;
        pauseAllText.buttonMode = true;
        pauseAllText.on('pointerdown', () => PIXI.sound.pauseAll());

        const resumeAllText = new PIXI.Text('RESUME ALL');
        resumeAllText.y = winText.height + loseText.height + tapText.height + pauseAllText.height;
        this.stage.addChild(resumeAllText);
        resumeAllText.interactive = true;
        resumeAllText.buttonMode = true;
        resumeAllText.on('pointerdown', () => PIXI.sound.resumeAll());

        const muteAllText = new PIXI.Text('MUTE ALL');
        muteAllText.y = winText.height + loseText.height + tapText.height + pauseAllText.height + resumeAllText.height;
        this.stage.addChild(muteAllText);
        muteAllText.interactive = true;
        muteAllText.buttonMode = true;
        muteAllText.on('pointerdown', () => PIXI.sound.muteAll());

        const unmuteAllText = new PIXI.Text('UNMUTE ALL');
        unmuteAllText.y =
            winText.height +
            loseText.height +
            tapText.height +
            pauseAllText.height +
            resumeAllText.height +
            muteAllText.height;
        this.stage.addChild(unmuteAllText);
        unmuteAllText.interactive = true;
        unmuteAllText.buttonMode = true;
        unmuteAllText.on('pointerdown', () => PIXI.sound.unmuteAll());
    }

    private _playSFX(alias): void {
        PIXI.sound.play(alias);
    }
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const game = new Game();
        document.body.appendChild(game.view);
    }
};
