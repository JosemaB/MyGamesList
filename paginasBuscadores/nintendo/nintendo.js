import { catalogoPlataformas } from '../../js/API.js';
import { mostrarPlataforma, generos, quitarContenidoAdulto } from "../../js/funciones.js";

/*Eventos*/
document.addEventListener('DOMContentLoaded', buscadorNintendo);
const resultadoJuegos = document.querySelector('#resultadoJuegos');
async function buscadorNintendo() {
    // Obtener el valor del parámetro 'id' desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page'); // Page
    if (page) {
        await juegosPorResultado(page);
        mostrarPaginador(parseInt(page));

    } else {
        await juegosPorResultado();
        mostrarPaginador();

    }
}

async function juegosPorResultado(page = 1) {

    const juegos = await catalogoPlataformas(page, 7);
    const juegosFiltrados = quitarContenidoAdulto(juegos);
    juegosFiltrados.slice(0, 20).forEach((juego, index) => {
        const articulo = document.createElement('article');
        // Añadiendo múltiples clases correctamente card col-lg-3 
        articulo.classList.add('card', 'hover-card', 'zindex-0', 'col-lg-3', 'col-md-4', 'col-sm-6', 'mb-2'); // Añadimos las clases de Bootstrap
        const divTest = document.createElement('div');
        divTest.classList.add('containerCardTest');

        /*Creamos el carrusel para la card de juegos*/
        const divCarrusel = document.createElement('div');
        divCarrusel.classList.add('carousel', 'slide', 'carousel-fade');
        divCarrusel.id = "carousel" + index;
        divCarrusel.innerHTML +=
            `
                    <a href="../../pagGame/infoGame.html?id=${juego['id']}" >
                    <div class="carousel-inner">
                    </div>
                        `;

        // Seleccionamos la sección interna del carrusel donde irán las imágenes
        const innerDiv = divCarrusel.querySelector('.carousel-inner');

        juego["short_screenshots"].slice(0, 3).forEach((img, index) => {
            /*Actulizamos si solo hay una captura poner solo una img proximamente */
            const div = document.createElement('div');
            div.classList.add('custom-img-size', 'carousel-item'); // Añadimos las clases de Bootstrap
            if (index === 0) {
                div.classList.add('active');
            }

            div.innerHTML +=
                ` 
                        <img src="${img["image"]}?q=50" class="d-block" alt="${juego["name"]}">
                        `;
            innerDiv.appendChild(div);
        });
        divCarrusel.innerHTML +=
            ` 
                    
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel${index}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel${index}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                    </a>
                    `;

        divTest.appendChild(divCarrusel);
        const geners = generos(juego); //Nos devuelve una lista de generos
        //Despues de agregar el carrusel agregamos el contenido de la  targeta
        divTest.innerHTML +=
            ` 
                        <div class="card-body">
                            <a class="text-decoration-none text-white link-primary" href="../../pagGame/infoGame.html?id=${juego['id']}" >
                                <h5 class="card-title fw-bold">${juego["name"]}</h5>   
                            </a>
                            <div id="plataformas"></div> 
                        </div>
                        
                        <div class="extra-content">
                            <ul class="list-group fw-bold ">
                                <li class="list-group-item letraPequena d-flex justify-content-between"><span>Fecha de lanzamiento: </span>${juego["released"]}</li>
                                <li class="list-group-item letraPequena d-flex justify-content-between"><span>Géneros: </span> ${geners}</li>
                                <li class="list-group-item letraPequena d-flex justify-content-between"><span>Promedio jugado: </span>${juego["playtime"] == 0 ? "No Disponible" : `${juego["playtime"]} horas`} </li>
                            </ul>
                            <p class="d-flex card-text d-flex justify-content-between text-uniform m-2">
                                <span class="fs-7 d-none d-sm-inline">
                                    <strong class="fw-bold">Calificación:</strong> 
                                    <span class="rounded-5 bg-success fw-bold p-1"> ${!juego["metacritic"] ? "?" : juego["metacritic"]} </span>
                                </span>
                                <span class="text-warning fs-7">
                                    <i class="bi bi-star-fill"></i> <span class="fw-bold">${juego["ratings_count"]}  valoraciones </span>
                                </span>
                            </p>
                        </div>
                `;
        divTest.querySelector('#plataformas').appendChild(mostrarPlataforma(juego));
        articulo.appendChild(divTest);
        resultadoJuegos.appendChild(articulo);
    });
}

function mostrarPaginador(pageActual = 1) {
    const divPaginador = document.createElement('div');
    divPaginador.classList.add('d-flex', 'justify-content-center', 'mt-4');
    // Crear el contenedor principal <nav>
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Page navigation example');

    // Crear el <ul> con clase "pagination"
    const ul = document.createElement('ul');
    ul.className = 'pagination';

    // Crear el primer elemento "Previous"
    const liPrevious = document.createElement('li');
    liPrevious.className = `page-item ${pageActual == 1 ? 'disabled' : ''}`;
    const aPrevious = document.createElement('a');
    aPrevious.className = 'page-link';
    aPrevious.href = `/paginasBuscadores/nintendo/nintendo.html?page=${(pageActual - 1)}`;;
    aPrevious.textContent = 'Previous';
    liPrevious.appendChild(aPrevious);
    ul.appendChild(liPrevious);
    // Crear el elemento "1"
    const li1 = document.createElement('li');
    if (pageActual == 1) {
        // Si es la página activa
        li1.className = 'page-item active zindex-0 ';
        li1.setAttribute('aria-current', 'page');

        const span1 = document.createElement('span');
        span1.className = 'page-link';
        span1.textContent = '1';

        li1.appendChild(span1);
    } else {
        // Si no es la página activa
        li1.className = 'page-item';

        const a1 = document.createElement('a');
        a1.className = 'page-link';
        a1.href = `/paginasBuscadores/nintendo/nintendo.html?page=1`;
        a1.textContent = '1';

        li1.appendChild(a1);
    }
    // Agregamos el previuos y next

    ul.appendChild(li1);


    if ([1, 2, 3].includes(pageActual)) {
        for (let i = 2; i <= 4; i++) {
            const li1 = document.createElement('li');
            if (pageActual == i) {
                // Si es la página activa
                li1.className = 'page-item active zindex-0 ';
                li1.setAttribute('aria-current', 'page');

                const span1 = document.createElement('span');
                span1.className = 'page-link';
                span1.textContent = `${i}`;

                li1.appendChild(span1);
            } else {
                // Si no es la página activa
                li1.className = 'page-item';
                const a1 = document.createElement('a');
                a1.className = 'page-link';
                a1.href = `/paginasBuscadores/nintendo/nintendo.html?page=${i}`;
                a1.textContent = `${i}`;

                li1.appendChild(a1);
            }

            ul.appendChild(li1);
        }
        ul.appendChild(crearEllipsis());

    } else if ([248, 249, 250].includes(pageActual)) {
        ul.appendChild(crearEllipsis());
        for (let i = 247; i < 250; i++) {
            const li1 = document.createElement('li');
            if (pageActual == i) {
                // Si es la página activa
                li1.className = 'page-item active zindex-0 ';
                li1.setAttribute('aria-current', 'page');

                const span1 = document.createElement('span');
                span1.className = 'page-link';
                span1.textContent = `${i}`;

                li1.appendChild(span1);
            } else {
                // Si no es la página activa
                li1.className = 'page-item';
                const a1 = document.createElement('a');
                a1.className = 'page-link';
                a1.href = `/paginasBuscadores/nintendo/nintendo.html?page=${i}`;
                a1.textContent = `${i}`;

                li1.appendChild(a1);
            }

            ul.appendChild(li1);
        }


    } else {
        ul.appendChild(crearEllipsis());
        for (let i = 0; i < 3; i++) {
            let resultado = null;
            if (i === 0) {
                resultado = pageActual - 1;
            } else if (i === 2) {
                resultado = pageActual + 1;
            } else {
                resultado = pageActual;
            }

            const li = document.createElement('li');
            if (i == 1) {
                // Si es la página activa
                li.className = 'page-item active zindex-0 ';
                li.setAttribute('aria-current', 'page');

                const span = document.createElement('span');
                span.className = 'page-link';
                span.textContent = resultado;
                li.appendChild(span);
            } else {
                li.className = 'page-item';
                const a = document.createElement('a');
                a.className = 'page-link';
                a.href = `/paginasBuscadores/nintendo/nintendo.html?page=${resultado}`;
                a.textContent = `${resultado}`;
                li.appendChild(a);
            }
            ul.appendChild(li);
        }
        ul.appendChild(crearEllipsis());
    }


    // Crear el elemento "250"
    const li250 = document.createElement('li');
    if (pageActual == 250) {
        // Si es la página activa
        li250.className = 'page-item active zindex-0 ';
        li250.setAttribute('aria-current', 'page');

        const span250 = document.createElement('span');
        span250.className = 'page-link';
        span250.textContent = '250';

        li250.appendChild(span250);
    } else {
        // Si no es la página activa
        li250.className = 'page-item';

        const a250 = document.createElement('a');
        a250.className = 'page-link';
        a250.href = `/paginasBuscadores/nintendo/nintendo.html?page=250`;
        a250.textContent = '250';

        li250.appendChild(a250);
    }

    // Crear el último elemento "Next"
    const liNext = document.createElement('li');
    liNext.className = `page-item ${pageActual == 250 ? 'disabled' : ''}`;
    const aNext = document.createElement('a');
    aNext.className = 'page-link';
    aNext.href = `/paginasBuscadores/nintendo/nintendo.html?page=${(pageActual + 1)}`;
    aNext.textContent = 'Next';
    liNext.appendChild(aNext);
    /*Los ultimos 250 y next */
    ul.appendChild(li250);
    ul.appendChild(liNext);

    // Agregar el <ul> al <nav>
    nav.appendChild(ul);
    divPaginador.appendChild(nav);
    // Agregar el <nav> al body
    resultadoJuegos.appendChild(divPaginador);
}

// Función auxiliar para crear puntos suspensivos
function crearEllipsis() {
    const ellipsisItem = document.createElement('li');
    ellipsisItem.classList.add('page-item', 'disabled');
    const ellipsisSpan = document.createElement('span');
    ellipsisSpan.classList.add('page-link');
    ellipsisSpan.textContent = '...';
    ellipsisItem.appendChild(ellipsisSpan);
    return ellipsisItem;
}