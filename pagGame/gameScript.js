import { detallesDelJuego } from '../js/API.js';


document.addEventListener('DOMContentLoaded', iniciarInfoGame);

async function iniciarInfoGame() {
    const juego = await detallesDelJuego('326243');

    mostrarVisuales();

    function mostrarVisuales() {
        console.log(juego);
        const container = document.getElementById('visuales'); 

        // Crear columna principal
        const principalDiv = document.createElement('div');
        principalDiv.className = 'img-principalV card col-12 mb-4';

        const principalImg = document.createElement('img');
        principalImg.src = '../img/logo.png';
        principalImg.alt = '...';
        principalDiv.appendChild(principalImg);

        container.appendChild(principalDiv);

        // Crear el primer conjunto de columnas
        const secundariaDiv = document.createElement('div');
        secundariaDiv.className = 'img-SecundariaV card col-6';

        const secundariaImg = document.createElement('img');
        secundariaImg.src = '../img/logo.png';
        secundariaImg.alt = '...';
        secundariaDiv.appendChild(secundariaImg);

        container.appendChild(secundariaDiv);

        // Crear el segundo conjunto de columnas (2x2 dentro del d-flex)
        const secondCardDiv = document.createElement('div');
        secondCardDiv.className = 'card col-6';

        const img4VDiv = document.createElement('div');
        img4VDiv.className = 'img-4V d-flex flex-wrap';

        for (let i = 0; i < 4; i++) {
            const img = document.createElement('img');
            img.src = '../img/logo.png';
            img.alt = '...';
            img.className = 'col-6';
            img4VDiv.appendChild(img);
        }

        secondCardDiv.appendChild(img4VDiv);
        container.appendChild(secondCardDiv);
    }
}
