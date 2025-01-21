/*Aqui estaran las funciones que se usaran para toda la página web*/

export function mostrarPlataforma(game) {

    //Devuelve un div con los iconos asociados al juego
    const divIconos = document.createElement('div');
    game["parent_platforms"].forEach(plataforma => {
        const img = document.createElement('img');

        if (plataforma["platform"]["slug"].toLowerCase().includes("pc")) {
            img.src = '../img/Plataformas/windows.png';
            img.alt = 'Windows';

        } else if (plataforma["platform"]["slug"].toLowerCase().includes("playstation")) {
            img.src = '../img/Plataformas/sony.png';
            img.alt = 'Windows';
        } else if (plataforma["platform"]["slug"].toLowerCase().includes("nintendo")) {
            img.src = '../img/Plataformas/nintendo.png';
            img.alt = 'Windows';
        } else if (plataforma["platform"]["slug"].toLowerCase().includes("android")) {
            img.src = '../img/Plataformas/android.png';
            img.alt = 'Windows';
        } else if (plataforma["platform"]["slug"].toLowerCase().includes("ios")) {
            img.src = '../img/Plataformas/ios.png';
            img.alt = 'Windows';
        }

        /*Si el img tiene imagen lo agregamos sino sagregara un cotenido  vacio*/
        if (img.src) {
            img.classList.add('icon', 'p-1');
            divIconos.appendChild(img);
        }
    });
    return divIconos;
}

export function adjustSelectToSelectedOption(select) {
    // Obtener el texto de la opción seleccionada
    const selectedText = select.options[select.selectedIndex].text;

    // Crear un elemento temporal para medir el texto seleccionado
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.font = window.getComputedStyle(select).font; // Aplicar estilo de fuente del select
    tempSpan.innerText = selectedText;

    document.body.appendChild(tempSpan);
    select.style.width = `${tempSpan.offsetWidth + 50}px`; // Ajustar ancho + padding
    document.body.removeChild(tempSpan);
}

export function quitarContenidoAdulto(juegos) { /*Cambialo a excluir contenido adulto*/
    const tagsExcluidos = ['Erotic', 'NSFW', 'Adult Content', 'Mature', 'sex', 'hentai', 'Nudity', 'sexy', 'Sexual Content']; //Excluimos por tag
    const juegosFiltrados = juegos["results"].filter((juego) => {
        let juegoValido = false;
        if (juego["tags"] && juego["tags"] && juego["short_screenshots"].length > 1 && juego["stores"] && juego["released"]) { //Retornara un false por defecto si el juego no tien tags

            const tagsJuego = juego["tags"].map(tag => tag.name); //Extraaemos los tags de todos los juegos
            // Comprueba si ningún tag del juego está en la lista de exclusión
            juegoValido = !tagsExcluidos.some(tagExcluido => tagsJuego.includes(tagExcluido));
        }

        return juegoValido;
    });
    console.log(juegosFiltrados);
    return juegosFiltrados;
}

export function limpiarHTML(selector) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}

export function generos(juego) {
    let resultado = "";
    juego["genres"].forEach((genero, index) => {
        if (juego["genres"].length - 1 === index) {
            resultado += ` ${genero["name"]}`;
        } else {
            resultado += ` ${genero["name"]},`;
        }
    });
    return resultado;
}

export function spinner() {
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');
    divSpinner.innerHTML += ` <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>`;
    return divSpinner;
}

