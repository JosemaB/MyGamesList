import { detallesDelJuego, mostrarCapturas } from '../js/API.js';
import { limpiarHTML } from '../js/funciones.js';

/*Eventos*/
document.addEventListener('DOMContentLoaded', iniciarInfoGame);



async function iniciarInfoGame() {
    /* Selectores */
    const myTabContent = document.querySelectorAll('#myTabContent .tab-pane');
    // Obtener todos los botones de las pestañas
    const tabs = document.querySelectorAll('#myTab .nav-link');


    /* Evento de Botones Lista */
    // Escuchar los clics en cada botón
    tabs.forEach(tab => {

        tab.addEventListener('click', (evento) => {
            myTabContent.forEach(divContent => {
                if (evento.target.id !== divContent.getAttribute('aria-labelledby')) {
                    limpiarHTML(document.querySelector(`#myTabContent #${divContent.id}`));
                }
            });
            /*Vammos a limpiar el html creado para que no haya interferencias */
            switch (evento.target.id) {
                case "info-tab":
                    break;
                case "screenshots-tab":
                    listaMostrarCapturas();
                    break;
                case "reviews-tab":
                    break;
                case "activation-tab":
                    break;
            }
        });
    });

    // Obtener el valor del parámetro 'id' desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const juegoId = urlParams.get('id'); // Esto te dará el ID del juego

    /*Falta hacer el error del juego */
    const juego = await detallesDelJuego(juegoId);
    mostrarVisuales();

    async function mostrarVisuales() {
        console.log(juego);
        const container = document.getElementById('visuales');
        const tituloJuego = document.createElement('h5');
        tituloJuego.classList.add('tituloDelJuego');
        tituloJuego.innerHTML = juego['name'];
        container.appendChild(tituloJuego);
        /*Empezamos de neuvo no me gusto la idea de antes ya asabes crear boton para agregar lista recomendacio
        etc etc modal de capturas reseñas y tal
        zzzzzz */
    }

    async function listaMostrarCapturas() {

        const divScreenShots = document.querySelector('#myTabContent #screenshots');
        const juego = await detallesDelJuego(juegoId);
        const capturasJuego = await mostrarCapturas(juego['id']);

        // Crear el contenedor principal del carrusel
        const carousel = document.createElement('div');
        carousel.id = 'carouselExampleIndicators';
        carousel.classList.add('carousel', 'slide', 'carruselPersonalizadoDJuego');

        // Crear el contenedor de los indicadores
        const carouselIndicators = document.createElement('div');
        carouselIndicators.classList.add('carousel-indicators');

        // Crear los botones para cada slide
        capturasJuego['results'].slice(0, 4).forEach((juego, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('data-bs-target', '#carouselExampleIndicators');
            button.setAttribute('data-bs-slide-to', index.toString());
            button.setAttribute('aria-label', `Slide ${index + 1}`);

            // Crear la imagen
            const img = document.createElement('img');
            img.src = juego['image'];  // Reemplaza esto con el path adecuado de tus imágenes
            img.alt = `Slide ${index + 1}`;
            img.classList.add('d-block', 'w-100');  // Puedes agregar clases para el estilo de la imagen

            // Añadir la imagen al botón
            button.appendChild(img);
            
            if (index === 0) {
                button.classList.add('active', 'custom-control-prev');
                button.setAttribute('aria-current', 'true');
            }else{
                button.classList.add('custom-control-prev');

            }
            carouselIndicators.appendChild(button);
        });

        // Crear el contenedor de los items del carrusel
        const carouselInner = document.createElement('div');
        carouselInner.classList.add('carousel-inner');

        // Crear los elementos de cada slide
        capturasJuego['results'].forEach((juego, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active');
            }
            const img = document.createElement('img');
            img.classList.add('d-block', 'w-100');
            img.src = juego['image'];  // Aquí debes poner la URL de las imágenes
            img.alt = `Slide ${index + 1}`;
            carouselItem.appendChild(img);
            carouselInner.appendChild(carouselItem);
        });

        // Crear los botones de navegación
        const prevButton = document.createElement('button');
        prevButton.classList.add('carousel-control-prev');
        prevButton.type = 'button';
        prevButton.setAttribute('data-bs-target', '#carouselExampleIndicators');
        prevButton.setAttribute('data-bs-slide', 'prev');

        const prevIcon = document.createElement('span');
        prevIcon.classList.add('carousel-control-prev-icon');
        prevIcon.setAttribute('aria-hidden', 'true');
        const prevText = document.createElement('span');
        prevText.classList.add('visually-hidden');
        prevText.textContent = 'Previous';

        prevButton.appendChild(prevIcon);
        prevButton.appendChild(prevText);

        const nextButton = document.createElement('button');
        nextButton.classList.add('carousel-control-next');
        nextButton.type = 'button';
        nextButton.setAttribute('data-bs-target', '#carouselExampleIndicators');
        nextButton.setAttribute('data-bs-slide', 'next');

        const nextIcon = document.createElement('span');
        nextIcon.classList.add('carousel-control-next-icon');
        nextIcon.setAttribute('aria-hidden', 'true');
        const nextText = document.createElement('span');
        nextText.classList.add('visually-hidden');
        nextText.textContent = 'Next';

        nextButton.appendChild(nextIcon);
        nextButton.appendChild(nextText);

        // Agregar todos los elementos al carrusel
        carousel.appendChild(carouselIndicators);
        carousel.appendChild(carouselInner);
        carouselInner.appendChild(prevButton);
        carouselInner.appendChild(nextButton);

        // Agregar el carrusel al body o un contenedor específico de tu HTML
        divScreenShots.appendChild(carousel);
    }
}
