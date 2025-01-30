
document.addEventListener('DOMContentLoaded', iniciarLogin);

function iniciarLogin() {
    // Obtener la URL de la página anterior
    let referrer = document.referrer;

    // Verificar si la URL anterior pertenece al mismo dominio
    if (referrer.includes(window.location.hostname)) {
        // Si la página de referencia es el login, redirigir al inicio
        if (referrer.includes('/Acceso/login/login.html')) {
            localStorage.setItem('redirectUrl', '../../index.html');
        } else {
            // Si es una página interna diferente al login, guardarla para redirección
            localStorage.setItem('redirectUrl', referrer);
        }
    } else {
        // Si es una página externa, redirigir al inicio
        localStorage.setItem('redirectUrl', '../../index.html');
    }

    /*Selectores*/
    // Obtener el botón del DOM
    let btnClose = document.getElementById('btnClose');

    // Selecciona el formulario por su ID
    const formulario = document.getElementById('miFormulario');

    // Añadir el event listener al botón
    btnClose.addEventListener('click', redirigirPaginaAnterior);
}
// Función que se ejecuta al hacer clic en el botón
function redirigirPaginaAnterior() {
    // Recuperar la URL de redirección almacenada
    let redirectUrl = localStorage.getItem('redirectUrl') || '/inicio';
    window.location.href = redirectUrl; // Redirige a la URL almacenada
}



// Agrega un event listener para el evento 'submit'
formulario.addEventListener('submit', (e) => {
    // Evita que el formulario se envíe de manera predeterminada
    e.preventDefault();

    if (e.submitter.name === "enviar") { //Saca el nombre del boton
        const nombre = formulario.nombre.value;
        const nacionalidad = formulario.nacionalidad.value;
        const password = formulario.exampleInputPassword.value;

    } else {
        formulario.nombre.value = "";
        formulario.nacionalidad.value = "";
        formulario.exampleInputPassword.value = "";
    }
});


function mostrarPassword() {
    const password = document.querySelector('#exampleInputPassword');
    if (password.type === "password") {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
}
function validarNombre(cadena) {
    try {
        const regex = new RegExp(/^[a-zA-ZñÑ]{10,25}$/); // Intentamos crear la expresión regular
        return regex.test(cadena); // Retorna true si coincide, false si no
    } catch (e) {
        console.log(e.message);
    }
}

function validarPassword(cadena) {
    try {
        const regex = new RegExp(/^(?![ç,$])(?!.*(select|where|;))(?=(.*\d){1,3}[^.]*\.$)[^ç,$;]{7,20}\d\.$/); // Intentamos crear la expresión regular
        return regex.test(cadena); // Retorna true si coincide, false si no
    } catch (e) {
        console.log(e.message);
    }
}