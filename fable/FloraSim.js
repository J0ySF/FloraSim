import { empty, cons, initialize, concat, singleton, append, map } from "./fable_modules/fable-library.4.1.4/List.js";

export const recursions = 7;

export const branching_factor = 8;

export const rotation_factor = 1;

export const scale_factor = 0.1;

export const final_rotation = 0.1;

export const final_scale = 0.95;

export function translate(t, _arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    return [[_arg[0][0], _arg[0][1] + t], [_arg[1][0], _arg[1][1] + t]];
}

export function rotate(r, _arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    const y1 = _arg[1][1];
    const y0 = _arg[0][1];
    const x1 = _arg[1][0];
    const x0 = _arg[0][0];
    const c = Math.cos(r);
    const s = Math.sin(r);
    return [[(x0 * c) - (y0 * s), (x0 * s) + (y0 * c)], [(x1 * c) - (y1 * s), (x1 * s) + (y1 * c)]];
}

export function scale(s, _arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    return [[_arg[0][0] * s, _arg[0][1] * s], [_arg[1][0] * s, _arg[1][1] * s]];
}

export function branch(rng, recursions_1) {
    if (recursions_1 > 0) {
        return map((tupledArg_4) => scale(0.5, tupledArg_4[0], tupledArg_4[1]), append(singleton([[0, 0], [0, 1]]), concat(map((tupledArg) => map((arg_1) => {
            let tupledArg_3;
            let tupledArg_2;
            const tupledArg_1 = arg_1;
            tupledArg_2 = rotate(tupledArg[1], tupledArg_1[0], tupledArg_1[1]);
            tupledArg_3 = scale(tupledArg[2], tupledArg_2[0], tupledArg_2[1]);
            return translate(tupledArg[0], tupledArg_3[0], tupledArg_3[1]);
        }, branch(rng, recursions_1 - 1)), map((t) => [t, (rng.NextDouble() - 0.5) * rotation_factor, 1 + ((rng.NextDouble() - 0.5) * scale_factor)], cons(1, initialize(rng.Next0() % branching_factor, (_arg) => rng.NextDouble())))))));
    }
    else {
        return empty();
    }
}

export function generate(rng) {
    let f2, r;
    const list = branch(rng, recursions);
    return map((f2 = ((r = ((rng.NextDouble() - 0.5) * final_rotation), (tupledArg_1) => rotate(r, tupledArg_1[0], tupledArg_1[1]))), (arg) => {
        let tupledArg;
        return f2((tupledArg = arg, scale(final_scale, tupledArg[0], tupledArg[1])));
    }), list);
}

