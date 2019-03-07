const compareImages = require("resemblejs/compareImages");
const fs = require("mz/fs");

async function getDiff(img1, img2, img_diff) {
    const options = {
        output: {
            errorColor: {
                red: 255,
                green: 0,
                blue: 255
            },
            errorType: "movement",
            transparency: 0.3,
            largeImageThreshold: 1200,
            useCrossOrigin: false,
            outputDiff: true
        },
        scaleToSameSize: true,
        ignore: "antialiasing"
    };

    // The parameters can be Node Buffers
    // data is the same as usual with an additional getBuffer() function
    const data = await compareImages(
        await fs.readFile(img1),
        await fs.readFile(img2),
        options
    );

    await fs.writeFile(img_diff, data.getBuffer());
}

function loadImages() {
    let images = [{
            'image1': './images/buscar_profesor_spec.js/2_Buscar_Profesor.png',
            'image2': './images/buscar_profesor_spec.js/3_Salir.png',
            'diferences': './images/buscar_profesor_spec.js/diferences.png'
        },
        {
            'image1': './images/filtros_materia_spec.js/2_Buscar_Profesor.png',
            'image2': './images/filtros_materia_spec.js/3_Filtros.png',
            'diferences': './images/filtros_materia_spec.js/diferences.png'
        },
        {
            'image1': './images/login_spec.js/1_Inicio.png',
            'image2': './images/login_spec.js/3_home_estudiante.png',
            'diferences': './images/login_spec.js/diferences.png'
        },
        {
            'image1': './images/pagina_profesor_spec.js/2_Buscar_Profesor.png',
            'image2': './images/pagina_profesor_spec.js/4_Salir.png',
            'diferences': './images/pagina_profesor_spec.js/diferences.png'
        },
        {
            'image1': './images/registro_existente_spec.js/1_Inicio_Registro.png',
            'image2': './images/registro_existente_spec.js/2_Formulario_lleno.png',
            'diferences': './images/registro_existente_spec.js/diferences.png'
        },
        {
            'image1': './images/simple_spec.js/2_Login.png',
            'image2': './images/simple_spec.js/3_Error_Login.png',
            'diferences': './images/simple_spec.js/diferences.png'
        }
    ];

    images.forEach(compare => {
        getDiff(compare.image1, compare.image2, compare.diferences);
    });
}

loadImages();