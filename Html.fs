module Html

open System
open Browser.Types
open Browser

let canvas = document.getElementsByTagName("canvas").[0] :?> HTMLCanvasElement
let mutable size = 0.0

let resize () =
    let os = size
    size <- int (Math.Min(window.innerWidth, window.innerHeight) * 0.9)

    if size = os |> not then
        canvas.width <- size
        canvas.height <- size
        true
    else
        false

let map_to_screen ((x, y): FloraSim.Point) = (x + 0.5) * size, (1.0 - y) * size

let ctx = canvas.getContext_2d ()
let mutable lines = FloraSim.generate (Random())

let draw () =
    ctx.clearRect (0, 0, size, size)

    for p0, p1 in lines do
        let x0, y0 = map_to_screen p0
        let x1, y1 = map_to_screen p1
        ctx.beginPath ()
        ctx.moveTo (x0, y0)
        ctx.lineTo (x1, y1)
        ctx.stroke ()

canvas.onclick <-
    (fun _ ->
        lines <- FloraSim.generate (Random())
        draw ())

window.onresize <-
    (fun _ ->
        if resize () then
            draw ())

resize () |> ignore
draw ()
