import { detallesDelJuego, mostrarCapturas } from '../js/API.js';


document.addEventListener('DOMContentLoaded', iniciarInfoGame);

async function iniciarInfoGame() {
    const idJuego = '27036';
    const juego = await detallesDelJuego(idJuego);

    mostrarVisuales();

    async function mostrarVisuales() {
        console.log(juego);
        const container = document.getElementById('visuales');

        // Crear columna principal
        const principalDiv = document.createElement('div');
        principalDiv.className = 'img-principalV card col-12';

        const principalImg = document.createElement('img');
        principalImg.src = juego['background_image'];
        principalImg.alt = juego['name'];
        principalImg.classList.add('col-12');
        principalDiv.appendChild(principalImg);

        container.appendChild(principalDiv);

        // Crear el primer conjunto de columnas
        const secundariaDiv = document.createElement('div');
        secundariaDiv.className = 'card col-6';

        const capturasJuego = await mostrarCapturas(idJuego);
        console.log(capturasJuego);
        if (capturasJuego && capturasJuego["results"].length > 3) {

            //Creamos la segunda main
            const secondCardDiv = document.createElement('div');
            secondCardDiv.className = 'card col-6';
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
                    container.appendChild(secundariaDiv);
                } else {/*Agregamos las imagens de 2x2 */
                    const img = document.createElement('img');
                    img.src = captura['image'];
                    img.alt = juego['name'];
                    img.className = 'col-6';
                    img4VDiv.appendChild(img);

                }
            });
            
            secondCardDiv.appendChild(img4VDiv);
            container.appendChild(secondCardDiv);


        }

    }
}
