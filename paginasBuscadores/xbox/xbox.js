import { juegosPorCatalogo, mostrarPaginador } from "../../js/funciones.js";

/*Eventos*/
document.addEventListener('DOMContentLoaded', buscadorNintendo);
const resultadoJuegos = document.querySelector('#resultadoJuegos');
async function buscadorNintendo() {
    // Obtener el valor del parámetro 'id' desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page'); // Page
    if (page) {
        await juegosPorCatalogo(3, resultadoJuegos, page);
        mostrarPaginador('/paginasBuscadores/xbox/xbox.html', resultadoJuegos, 224, parseInt(page));

    } else {
        await juegosPorCatalogo(3, resultadoJuegos);
        mostrarPaginador('/paginasBuscadores/xbox/xbox.html', resultadoJuegos, 224);

    }
}

