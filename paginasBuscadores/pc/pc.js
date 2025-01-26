import { juegosPorCatalogo, mostrarPaginador } from "../../js/funciones.js";

/*Eventos*/
document.addEventListener('DOMContentLoaded', buscadorNintendo);
const resultadoJuegos = document.querySelector('#resultadoJuegos');
async function buscadorNintendo() {
    // Obtener el valor del parámetro 'id' desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page'); // Page
    if (page) {
        await juegosPorCatalogo(1, resultadoJuegos, page);
        mostrarPaginador('/paginasBuscadores/pc/pc.html', resultadoJuegos, 250, parseInt(page));

    } else {
        await juegosPorCatalogo(1, resultadoJuegos);
        mostrarPaginador('/paginasBuscadores/pc/pc.html', resultadoJuegos, 250 );

    }
}

