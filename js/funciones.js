/*Aqui estaran las funciones que se usaran para toda la página web*/

export function mostrarPlataforma(game) {

    //Devuelve un div con los iconos asociados al juego
    const divIconos = document.createElement('div');
    game["parent_platforms"].forEach(plataforma => {
        const img = document.createElement('img');

        switch (plataforma["platform"]["slug"].toLowerCase()) {
            case "pc":
                img.src = '../img/Plataformas/windows.png';
                img.alt = 'Windows';
                img.title = 'Windows';
                break;
            case "playstation":
                img.src = '../img/Plataformas/sony.png';
                img.alt = 'Playstation';
                img.title = 'Playstation';
                break;
            case "nintendo":
                img.src = '../img/Plataformas/nintendo.png';
                img.alt = 'Nintendo';
                img.title = 'Nintendo';
                break;
            case "android":
                img.src = '../img/Plataformas/android.png';
                img.alt = 'Android';
                img.title = 'Android';
                break;
            case "ios":
                img.src = '../img/Plataformas/ios.png';
                img.alt = 'Ios';
                img.title = 'Ios';
                break;
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

export function obtenerEstrellas(numero) {
    // Convertir el número de 1-10 a 0-5 Redondeamos a su numero entero
    const estrellas = Math.round(numero);

    // Construir las estrellas
    let resultado = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= estrellas) {
            resultado += '⭐';
        } else {
            resultado += '☆';
        }
    }

    return resultado;
}

export function nombreUsuario(id) {
    let usuario = "";
    switch (id) {
        case 5:
            usuario = "TonyElMolon";
            break;
        case 4:
            usuario = "Josemab26";
            break;

        case 3:
            usuario = "Narita";
            break;

        case 1:
            usuario = "Vegetta777";
            break;

        default:
            usuario = "Nombre desconocido";
            break;

    }
    return usuario;
}
export function fotoUsuario(id) {
    let fotoUsuario = "";
    switch (id) {
        case 5:
            fotoUsuario = "../img/usuarios/TonyElMolon.png";
            break;
        case 4:
            fotoUsuario = "../img/usuarios/Josemab26.jpg";
            break;

        case 3:
            fotoUsuario = "../img/usuarios/Narita.jfif";
            break;

        case 1:
            fotoUsuario = "../img/usuarios/Replip.jpg";
            break;

        default:
            fotoUsuario = "../img/usuarios/UsuarioDesconocido.png";
            break;

    }
    return fotoUsuario;
}