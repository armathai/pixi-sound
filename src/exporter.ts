/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="pixi.js" />
/// <reference path="../typings/global.d.ts" />

namespace pixisound {
    (PIXI as any).sound = pixisound;
}
