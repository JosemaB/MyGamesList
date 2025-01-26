import { detallesDelJuego, mostrarCapturas } from '../js/API.js';
import { limpiarHTML, obtenerEstrellas, mostrarPlataforma, fotoUsuario, nombreUsuario, sinResultado } from '../js/funciones.js';


/*Eventos*/
document.addEventListener('DOMContentLoaded', iniciarInfoGame);

// Declaración del objeto global de estado
const estado = {
    juego: null, // Aquí se guardarán los detalles del juego
    capturasJuego: null, // Aquí se guardarán las capturas del juego
};

// Función para inicializar el juego
async function inicializarJuego(juegoId) {
    try {
        estado.juego = await detallesDelJuego(juegoId); // Cargar detalles del juego
        estado.capturasJuego = await mostrarCapturas(juegoId); // Cargar capturas del juego
    } catch (error) {
        console.error("Error al inicializar el juego:", error);
        throw error; // Propaga el error si ocurre algo
    }
}

async function iniciarInfoGame() {

    // Obtener el valor del parámetro 'id' desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    await inicializarJuego(urlParams.get('id')); // Esto te dará el ID del juego y la funcion dara las capturas y la informacion 
    if (estado.juego["detail"] === 'Not found.') {
        const idVisuales = document.querySelector('#visuales');
        idVisuales.appendChild(sinResultado());
    } else {
        /*Iniciamos las fuinciones que se deben iniciar al cargar la pagina web */
        /*mostrarVisuales();*/
        mostrarVisuales();
        mostrarDescripcion();

        /* Selectores */
        const myTabContent = document.querySelectorAll('#myTabContent .tab-pane');

        // Obtener todos los botones de las pestañas
        const tabs = document.querySelectorAll('#myTab .nav-link');

        /* Evento de Botones Lista */
        // Escuchar los clics en cada botón
        try {
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
                            mostrarDescripcion();
                            break;
                        case "screenshots-tab":
                            listaMostrarCapturas();
                            break;
                        case "reviews-tab":
                            mostrarResenas();
                            break;
                        case "required-tab":
                            mostrarRequisitos();
                            break;
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
        function obtenerJuego() {
            return estado.juego;
        }

        function obtenerCapturasJuego() {
            return estado.capturasJuego;
        }

        function mostrarVisuales() {
            try {
                const visuales = document.querySelector('.container #visuales');
                const juego = obtenerJuego();

                // Crear el título
                const titulo = document.createElement("h5");
                titulo.className = "tituloDelJuego";
                titulo.textContent = juego["name"];

                // Crear el contenedor principal de la imagen
                const imgPrincipal = document.createElement("div");
                imgPrincipal.className = "imgPrincipal col-12";

                imgPrincipal.style.setProperty('background-image', `url(${juego["background_image"]})`);
                // Crear el contenedor de valoraciones
                const valoracionesMain = document.createElement("div");
                valoracionesMain.className = "valoracionesMain";

                // Crear la calificación
                const gameRating = document.createElement("div");
                gameRating.className = "game-rating";
                gameRating.textContent = obtenerEstrellas(juego["rating"]) + ` (${juego["rating"]}/5)`;

                // Agregar la calificación al contenedor de valoraciones
                valoracionesMain.appendChild(gameRating);

                // Crear el contenedor del modal
                const modalMain = document.createElement("div");
                modalMain.className = "modalMain";

                // Crear el botón del modal
                const modalButton = document.createElement("button");
                modalButton.type = "button";
                modalButton.className = "btn btn-primary";
                modalButton.setAttribute("data-bs-toggle", "modal");
                modalButton.setAttribute("data-bs-target", "#staticBackdrop");
                modalButton.textContent = "+";

                // Agregar el botón al contenedor del modal
                modalMain.appendChild(modalButton);

                // Agregar las secciones al contenedor principal
                imgPrincipal.appendChild(valoracionesMain);
                imgPrincipal.appendChild(modalMain);

                // Insertar todo en el documento
                visuales.appendChild(titulo);
                // Creamos el enlace que servira para mandar al usuario a la pagina principal del juego
                if (juego["website"]) {/*Por sin no existe el enalce web */
                    const enlace = document.createElement('a');
                    enlace.href = juego["website"]; // URL del enlace
                    enlace.target = '_blank'; // Abrir en una nueva pestaña
                    enlace.rel = 'noopener noreferrer'; // Seguridad adicional (opcional)
                    enlace.appendChild(imgPrincipal);
                    enlace.style.textDecoration = 'none';  // Elimina el subrayado
                    enlace.style.color = 'inherit';        // Elimina el color predeterminado (hereda el color del contenedor)
                    enlace.title = `Visitar la página oficial de ${juego["name"]}`;

                    // Agregar evento al enlace
                    enlace.addEventListener('click', (event) => {
                        // Si el clic ocurrió en la imagen, detener el enlace
                        console.log(event.target.className);
                        if ((event.target.className === "valoracionesMain" || event.target.className === "game-rating") || event.target.className === "btn btn-primary"
                            || event.target.className === "modalMain") {
                            event.preventDefault(); // Evitar la acción del enlace
                        }
                    });


                    visuales.appendChild(enlace);

                } else {
                    visuales.appendChild(imgPrincipal);
                }

            } catch (error) {
                console.log(error);
            }
        }

        function mostrarDescripcion() {
            try {
                const divDetalleLista = document.querySelector('#myTabContent #info');
                const juego = obtenerJuego();
                const textoExistente = document.querySelector('#info #DescripcionJuego');
                if (textoExistente) { /*Esto arregla el bug de muchos textos generados*/
                    textoExistente.remove(); // Elimina el carrusel existente del DOM
                }

                const divDescripcion = document.createElement('div');
                divDescripcion.id = 'DescripcionJuego';

                const descripcionLimpia = juego['description'].replace(/<br\s*\/?>/gi, ''); // Elimina todos los <br>
                divDescripcion.innerHTML = descripcionLimpia;

                const plataformas = mostrarPlataforma(juego);
                plataformas.classList.add('child', 'fw-bold');
                plataformas.textContent = 'Plataformas: ';
                plataformas.appendChild(mostrarPlataforma(juego));

                divDetalleLista.appendChild(divDescripcion);
                divDetalleLista.appendChild(plataformas);

            } catch (error) {
                console.log(error);
            }
        }

        function listaMostrarCapturas() {
            const divScreenShots = document.querySelector('#myTabContent #screenshots');
            const capturasJuego = obtenerCapturasJuego();
            try {



                if (capturasJuego['results'].length === 1) {
                    const unicaIMG = document.querySelector('#screenshots #unicaIMG');
                    if (unicaIMG) {/*Esto arregla el bug de muchos carruseles generados =)*/
                        unicaIMG.remove(); // Elimina el carrusel existente del DOM
                    }
                    capturasJuego['results'].forEach(juego => {
                        const divImg = document.createElement('div');
                        divImg.id = 'unicaIMG';
                        divImg.classList.add('col-12');
                        const img = document.createElement('img');
                        img.classList.add('col-12');
                        img.src = juego['image'];  // Reemplaza esto con el path adecuado de tus imágenes
                        divImg.appendChild(img);
                        divScreenShots.appendChild(divImg);

                    });
                } else if (capturasJuego['results'].length > 1) {

                    const carruselExistente = document.querySelector('#screenshots #carouselExampleIndicators');
                    if (carruselExistente) {/*Esto arregla el bug de muchos carruseles generados =)*/
                        carruselExistente.remove(); // Elimina el carrusel existente del DOM
                    }

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
                        } else {
                            button.classList.add('custom-control-prev');

                        }
                        carouselIndicators.appendChild(button);
                    });

                    // Crear el contenedor de los items del carrusel
                    const carouselInner = document.createElement('div');
                    carouselInner.classList.add('carousel-inner');

                    // Crear los elementos de cada slide
                    capturasJuego['results'].slice(0, 4).forEach((juego, index) => {
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
            } catch (error) {
                console.log(error);
            }
        }

        function mostrarResenas() {
            try {
                const juego = obtenerJuego();
                console.log(juego);
                const divResenas = document.querySelector('#myTabContent #reviews');
                const textoExistente = document.querySelector('#reviews #resenas');
                if (textoExistente) { /*Esto arregla el bug de muchos textos generados*/
                    textoExistente.remove(); // Elimina el carrusel existente del DOM
                }

                //Creamos un div para las reseñas
                const resenas = document.createElement('div');
                resenas.classList.add('row', 'd-flex', 'justify-content-center', 'm-3');
                resenas.id = 'resenas';

                // Crear el contenedor principal
                const reviewCard = document.createElement("div"); // Cambiado de card a reviewCard
                reviewCard.className = "review-card escribir-resena card p-3 m-2"; // Cambié también la clase a "review-card"

                // Crear y configurar el encabezado
                const cardTitle = document.createElement("div"); // Cambiado de cardHeader a cardTitle
                cardTitle.className = "text-center fw-bold card-header";
                cardTitle.textContent = "Puntuación media de las reseñas";
                reviewCard.appendChild(cardTitle);

                // Crear el cuerpo de la tarjeta
                const cardContent = document.createElement("div"); // Cambiado de cardBody a cardContent
                cardContent.className = "card-content d-flex flex-column align-items-center text-center"; // Cambié el nombre de la clase a "card-content"

                // Crear el párrafo de la puntuación
                const ratingParagraph = document.createElement("p");
                ratingParagraph.className = "rating mb-3";
                ratingParagraph.setAttribute("aria-label", "Puntuación media: 4.48 sobre 5");
                ratingParagraph.innerHTML = obtenerEstrellas(juego["rating"]) + ` (${juego["rating"]}/5)`;
                cardContent.appendChild(ratingParagraph);

                // Crear el botón
                const button = document.createElement("button");
                button.type = "button";
                button.className = "btn";
                button.setAttribute("data-bs-toggle", "modal");
                button.setAttribute("data-bs-target", "#staticBackdrop");
                button.innerHTML = "¡Valora este juego! <i class=\"bi bi-pencil-square ms-2\" aria-hidden=\"true\"></i>";
                cardContent.appendChild(button);

                // Añadir el contenido de la tarjeta al contenedor principal
                reviewCard.appendChild(cardContent);

                // Añadir el contenedor principal al DOM
                resenas.appendChild(reviewCard); // Cambia esto según el lugar donde desees insertar el div


                /*Agregamos las reseñas */
                if (juego["ratings"]) { /*Por si esta vacio para que no de error */
                    juego["ratings"].forEach(resena => {
                        // Crear el contenedor principal
                        const mensajePersonalizado = document.createElement('div');
                        mensajePersonalizado.className = 'col-12 mensajePersonalizado m-2 p-3 card';

                        // Crear el encabezado de la tarjeta
                        const cardHeader = document.createElement('div');
                        cardHeader.className = 'col-12 card-header fw-bold';

                        // Crear el contenedor que contendrá el nombre y la imagen
                        const userContainer = document.createElement('div');
                        userContainer.className = 'd-flex align-items-center'; // Usamos Flexbox para alinear

                        // Crear el elemento del nombre del usuario
                        const nombreUsuarioElement = document.createElement('span');
                        nombreUsuarioElement.className = 'nombre-usuario';
                        nombreUsuarioElement.textContent = nombreUsuario(resena["id"]);

                        // Crear el elemento de la imagen del perfil
                        const perfilImg = document.createElement('img');
                        perfilImg.className = 'perfil-img';
                        perfilImg.src = fotoUsuario(resena["id"]); // Cambia por la ruta real de la imagen
                        perfilImg.alt = 'Perfil';

                        // Agregar el nombre y la imagen al contenedor
                        userContainer.appendChild(perfilImg);
                        userContainer.appendChild(nombreUsuarioElement);

                        // Agregar el contenedor al encabezado de la tarjeta
                        cardHeader.appendChild(userContainer);
                        mensajePersonalizado.appendChild(cardHeader);

                        // Crear el cuerpo de la tarjeta
                        const cardBody = document.createElement('div');
                        cardBody.className = 'card-body';

                        // Crear el bloque de cita
                        const blockquote = document.createElement('blockquote');
                        blockquote.className = 'blockquote mb-0';

                        // Crear el párrafo de la cita
                        const quoteText = document.createElement('p');
                        quoteText.textContent = resena["title"];
                        blockquote.appendChild(quoteText);

                        // Añadir el bloque de cita al cuerpo de la tarjeta
                        cardBody.appendChild(blockquote);

                        // Añadir el cuerpo de la tarjeta al contenedor principal
                        mensajePersonalizado.appendChild(cardBody);

                        resenas.appendChild(mensajePersonalizado);

                    });
                }

                divResenas.appendChild(resenas);

            } catch (error) {
                console.log(error);
            }
        }
        function mostrarRequisitos() {
            try {
                const divRequisitos = document.querySelector('#myTabContent #required');
                const textoExistente = document.querySelector('#required #requisitos');
                if (textoExistente) { /*Esto arregla el bug de muchos textos generados*/
                    textoExistente.remove(); // Elimina el carrusel existente del DOM
                }
                const requisitos = document.createElement('div');
                requisitos.id = 'requisitos';
                requisitos.classList.add('row', 'p-2');
                const juego = obtenerJuego();
                juego["platforms"].forEach((plataforma => {

                    if (plataforma["platform"]['slug'] === 'pc') {
                        console.log(plataforma['requirements']);
                        /*Creamos el div requisitos minimos*/
                        const divReqMin = document.createElement('div');
                        divReqMin.classList.add('parrafoRequisitos', 'col-lg-6', 'col-12');

                        /*Creamos el div requisitos Recomendados*/
                        const divReqRec = document.createElement('div');
                        divReqRec.classList.add('parrafoRequisitos', 'col-lg-6', 'col-12');

                        // Creamos el título "MINIMUM" manualmente
                        const tituloMinimo = document.createElement('h3');  // Usamos <h3> para el título
                        tituloMinimo.classList.add('fs-5', 'fw-bold', 'text-uppercase', 'pb-1'); // Tamaño, negrita y mayúsculas
                        tituloMinimo.innerHTML = 'Minimum:'; // Título personalizado

                        // Creamos el título "MINIMUM" manualmente
                        const tituloRecomended = document.createElement('h3');  // Usamos <h3> para el título
                        tituloRecomended.classList.add('fs-5', 'fw-bold', 'text-uppercase', 'pb-1'); // Tamaño, negrita y mayúsculas
                        tituloRecomended.innerHTML = 'Recommended:'; // Título personalizado

                        /*Ponemos el titulo antes */
                        divReqMin.appendChild(tituloMinimo);
                        divReqRec.appendChild(tituloRecomended);

                        /*Si encontramos /N lo remplazamos con un <br> */
                        if (plataforma['requirements']['minimum']) {/*Lo compruebo si no existe el minimo o recomendado para que no reviente la pagina */

                            const requisitosMinimos = plataforma['requirements']['minimum']
                                .replace(/^Minimum:\s*[\r\n]*/, '')  // Eliminar "Minimum:" y los saltos de línea
                                .replace(/\r?\n/g, '<br>');  // Reemplazar saltos de línea por <br>

                            divReqMin.innerHTML += requisitosMinimos;
                        } else {
                            divReqMin.innerHTML += 'No disponible';
                        }
                        if (plataforma['requirements']['recommended']) {

                            const requisitosRecomendados = plataforma['requirements']['recommended']
                                .replace(/^Recommended:\s*[\r\n]*/, '')  // Eliminar "Recommended:" y los saltos de línea
                                .replace(/\r?\n/g, '<br>');  // Reemplazar saltos de línea por <br>
                            /*Ponemos el texto */

                            divReqRec.innerHTML += requisitosRecomendados;
                        } else {
                            divReqRec.innerHTML += 'No disponible';
                        }

                        requisitos.appendChild(divReqMin);
                        requisitos.appendChild(divReqRec);

                    }
                }));

                /*Si el juego no esta en pc mandamos un mensaje que no necesita requisitos este juego */
                if (!requisitos.innerHTML.trim()) {
                    // Crear un nuevo div para el mensaje
                    const divMensaje = document.createElement('div');

                    // Añadir clases de Bootstrap para centrar el texto
                    divMensaje.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'text-center', 'p-3');

                    // Añadir el mensaje al div
                    divMensaje.innerHTML = 'No se requieren requisitos específicos para esta plataforma.';

                    // Insertar el nuevo div dentro de 'requisitos'
                    requisitos.appendChild(divMensaje);
                }
                divRequisitos.appendChild(requisitos);
            } catch (error) {
                console.log(error);
            }

        }
    }
}
