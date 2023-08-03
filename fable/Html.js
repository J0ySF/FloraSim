import { disposeSafe, getEnumerator, createAtom } from "./fable_modules/fable-library.4.1.4/Util.js";
import { min } from "./fable_modules/fable-library.4.1.4/Double.js";
import { generate } from "./FloraSim.js";
import { nonSeeded } from "./fable_modules/fable-library.4.1.4/Random.js";

export const canvas = document.getElementsByTagName("canvas")[0];

export let size = createAtom(0);

export function resize() {
    const os = size();
    size(~~(min(window.innerWidth, window.innerHeight) * 0.9));
    if (!(size() === os)) {
        canvas.width = size();
        canvas.height = size();
        return true;
    }
    else {
        return false;
    }
}

export function map_to_screen(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    return [(_arg[0] + 0.5) * size(), (1 - _arg[1]) * size()];
}

export const ctx = canvas.getContext('2d');

export let lines = createAtom(generate(nonSeeded()));

export function draw() {
    ctx.clearRect(0, 0, size(), size());
    const enumerator = getEnumerator(lines());
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const forLoopVar = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const p1 = forLoopVar[1];
            const p0 = forLoopVar[0];
            const patternInput = map_to_screen(p0[0], p0[1]);
            const patternInput_1 = map_to_screen(p1[0], p1[1]);
            ctx.beginPath();
            ctx.moveTo(patternInput[0], patternInput[1]);
            ctx.lineTo(patternInput_1[0], patternInput_1[1]);
            ctx.stroke();
        }
    }
    finally {
        disposeSafe(enumerator);
    }
}

canvas.onclick = ((_arg) => {
    lines(generate(nonSeeded()));
    draw();
});

window.onresize = ((_arg) => {
    if (resize()) {
        draw();
    }
});

resize();

draw();

