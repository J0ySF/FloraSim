module FloraSim

open System

let recursions = 7
let branching_factor = 8
let rotation_factor = 1.0
let scale_factor = 0.1
let final_rotation = 0.1
let final_scale = 0.95

type Point = float * float
type Line = Point * Point

let translate (t: float) (((x0, y0), (x1, y1)): Line) : Line = (x0, y0 + t), (x1, y1 + t)

let rotate (r: float) (((x0, y0), (x1, y1)): Line) : Line =
    let c = Math.Cos r
    let s = Math.Sin r
    (x0 * c - y0 * s, x0 * s + y0 * c), (x1 * c - y1 * s, x1 * s + y1 * c)

let scale (s: float) (((x0, y0), (x1, y1)): Line) : Line = (x0 * s, y0 * s), (x1 * s, y1 * s)

let rec branch (rng: Random) (recursions: int) : Line list =
    match recursions with
    | recursions when recursions > 0 ->
        1.0 :: List.init (rng.Next() % branching_factor) (fun _ -> rng.NextDouble())
        |> List.map (fun t -> (t, (rng.NextDouble() - 0.5) * rotation_factor, 1.0 + (rng.NextDouble() - 0.5) * scale_factor))
        |> List.map (fun (t, r, s) -> (branch rng (recursions - 1)) |> List.map (rotate r >> scale s >> translate t))
        |> List.concat
        |> List.append [ ((0.0, 0.0), (0.0, 1.0)) ]
        |> List.map (scale 0.5)
    | _ -> []

let generate (rng: Random) : Line list =
    branch rng recursions
    |> List.map ((scale final_scale) >> (rotate ((rng.NextDouble() - 0.5) * final_rotation)))
