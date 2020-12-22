/// <reference types="pixi.js" />
/// <reference path="../typings/global.d.ts" />

namespace pixisound {
    const sounds: { [key: string]: Sound } = {};
    const internalPausedSounds: Sound[] = [];

    export type Options = HowlOptions;

    export type PlayOptions = {
        loop?: boolean;
        volume?: number;
        complete?: () => void;
    };

    export class Sound extends window.Howl {}

    export function add(alias: string, options: Options): Sound {
        return (sounds[alias] = new Sound(options));
    }

    export function play(alias: string, options: PlayOptions = {}): void {
        const sound = sounds[alias];
        if (!sound) {
            return;
        }
        const { loop = sound.loop(), volume = sound.volume(), complete = null } = options;
        sound.volume(volume);
        sound.loop(loop);
        complete && sound.once('end', complete);
        sound.play();
    }

    export function stop(alias: string): void {
        sounds[alias] && sounds[alias].stop();
    }

    export function pause(alias: string): void {
        sounds[alias] && sounds[alias].pause();
    }

    export function resume(alias: string): void {
        sounds[alias] && sounds[alias].play();
    }

    export function find(alias: string): Sound {
        return sounds[alias];
    }

    export function fadeIn(alias: string, duration: number, options: PlayOptions = {}): void {
        const sound = sounds[alias];
        play(alias, options);
        const { volume = sound.volume() } = options;
        sound.fade(0, volume, duration * 1000);
    }

    export function fadeOut(alias: string, duration: number): void {
        const sound = sounds[alias];
        sound.fade(sound.volume(), 0, duration * 1000);
        sound.once('fade', () => sound.stop());
    }

    export function muteAll(): void {
        window.Howler.mute(true);
    }

    export function unmuteAll(): void {
        window.Howler.mute(false);
    }

    export function pauseAll(): void {
        Object.keys(sounds).forEach((s) => internalPause(s));
        !PIXI.utils.isMobile.apple.device && window.Howler._autoSuspend();
    }

    export function resumeAll(): void {
        Object.keys(sounds).forEach((s) => internalResume(s));
    }

    function internalPause(alias: string): void {
        const sound = sounds[alias];
        if (!sound.playing()) {
            return;
        }
        sound.pause();
        internalPausedSounds.push(sound);
    }

    function internalResume(alias: string): void {
        const sound = sounds[alias];
        if (sound.playing() || internalPausedSounds.indexOf(sound) === -1) {
            return;
        }
        sound.play();
        const index = internalPausedSounds.indexOf(sound);
        internalPausedSounds.splice(index, 1);
    }
}
