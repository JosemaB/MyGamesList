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
                if(evento.target.id !== divContent.getAttribute('aria-labelledby') ){
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

        // Crear el primer conjunto de columnas
        const secundariaDiv = document.createElement('div');
        secundariaDiv.className = 'capturasJuego card col-6';

        const capturasJuego = await mostrarCapturas(juego['id']);

        if (capturasJuego && capturasJuego["results"].length > 3) {

            //Creamos la segunda main
            const secondCardDiv = document.createElement('div');
            secondCardDiv.className = 'capturasJuego card col-6';
            // Creamos el segundo conjunto de columnas (2x2 dentro del d-flex)
            const img4VDiv = document.createElement('div');
            img4VDiv.className = 'col-12';

            capturasJuego["results"].slice(0, 5).forEach((captura, index) => {

                if (index === 0) {
                    const secundariaImg = document.createElement('img');
                    secundariaImg.src = captura['image'];
                    secundariaImg.alt = juego['name'];
                    secundariaImg.classList.add('col-12');
                    secundariaDiv.appendChild(secundariaImg);
                    divScreenShots.appendChild(secundariaDiv);
                } else {/*Agregamos las imagens de 2x2 */
                    const img = document.createElement('img');
                    img.src = captura['image'];
                    img.alt = juego['name'];
                    img.className = 'col-6';
                    img4VDiv.appendChild(img);

                }
            });
            secondCardDiv.appendChild(img4VDiv);
            divScreenShots.appendChild(secondCardDiv);
        }
    }
}
