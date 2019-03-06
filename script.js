//import { Disposer } from "bluebird";

// Variables constantes de la aplicación 
const MAX_TONE = 359;
const MIN_TONE = 0;
const DISTANCE = 360 / 5;

// Función para generar numeros aleatorios dentro de un intervalo dado
function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


// Funcición para agregar tiempos de espera
async function thinkTime(n) {
    console.log('Tomando un descanso...');
    await sleep(n);
    console.log('N segundos después');
}

// Función para obtener la combinación RGB en hexa
function rgbToHex(r, g, b) {
    let hexaValue = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hexaValue.toUpperCase();
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
        let rgb_color = hsvToRgb(pallete[i] / MAX_TONE, saturation, value);
        colorPallete.push(rgb_color);
        //console.log(rgb);
        $("#color" + (i + 1)).css("background-color", "rgb(" + Math.round(rgb_color[0]) + "," + Math.round(rgb_color[1]) + "," + Math.round(rgb_color[2]) + ")");
    }

    $("#css-rules").text("");

    var rules = ".website-background {color: " + rgbToHex(Math.round(colorPallete[0][0]), Math.round(colorPallete[0][1]), Math.round(colorPallete[0][2])) + "}\n\n" +
        ".element-text {color: " + rgbToHex(Math.round(colorPallete[1][0]), Math.round(colorPallete[1][1]), Math.round(colorPallete[1][2])) + "}\n\n" +
        ".element-border {color: " + rgbToHex(Math.round(colorPallete[2][0]), Math.round(colorPallete[2][1]), Math.round(colorPallete[2][2])) + "}\n\n" +
        ".element-background {color: " + rgbToHex(Math.round(colorPallete[3][0]), Math.round(colorPallete[3][1]), Math.round(colorPallete[3][2])) + "}\n\n" +
        ".header {color: " + rgbToHex(Math.round(colorPallete[4][0]), Math.round(colorPallete[4][1]), Math.round(colorPallete[4][2])) + "}\n";

    $("#css-rules").text(rules);

}

// Función para devolver la paleta a los colores iniciales
function resetPallete() {
    for (let i = 0; i < 5; i++) {

        $("#color" + (i + 1)).css("background-color", rgbToHex(255, 255, 255));
    }

    $("#css-rules").text("");

    var rules = ".website-background {color: " + rgbToHex(255, 255, 255) + "}\n\n" +
        ".element-text {color: " + rgbToHex(255, 255, 255) + "}\n\n" +
        ".element-border {color: " + rgbToHex(255, 255, 255) + "}\n\n" +
        ".element-background {color: " + rgbToHex(255, 255, 255) + "}\n\n" +
        ".header {color: " + rgbToHex(255, 255, 255) + "}\n";

    $("#css-rules").text(rules);

}

generateRules();