//import { Disposer } from "bluebird";

const MAX_TONE = 359;
const MIN_TONE = 0;
const DISTANCE = 360 / 5;

// Función para generar numeros aleatorios dentro de un intervalo dado
function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Funcion para generar la escala de tonalidad equidistante para los 5 colores complementarios
function randomPalette(hue) {
    let pallete = [];
    color = hue;
    for (let i = 0; i < 5; i++) {
        pallete.push(color);
        color = color + DISTANCE;
        if (color > MAX_TONE) {
            color = color - MAX_TONE;
        }
    }
    return pallete;
}

// Se calculan y cargan colores rgb a pagina html
function generateRules() {
    let hue = randomNumber(MIN_TONE, MAX_TONE);
    let pallete = randomPalette(hue);
    let saturation = Math.random();
    let value = Math.random();
    let colorPallete = [];

    for (let i = 0; i < 5; i++) {
        let rgb = hsvToRgb(pallete[i] / MAX_TONE, saturation, value);
        colorPallete.push(rgb);
        console.log(rgb);
        $("#color" + (i + 1)).css("background-color", "rgb(" + Math.round(rgb[0]) + "," + Math.round(rgb[1]) + "," + Math.round(rgb[2]) + ")");
    }

}

generateRules();