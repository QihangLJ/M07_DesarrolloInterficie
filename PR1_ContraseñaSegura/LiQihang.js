//Init(), solo se iniciara si el usuario le dio al boton de CHECK o pulso la tecla "Enter".
function init() {
    let mensaje_long = document.querySelector("#req_long");
    let mensaje_num = document.querySelector("#req_num");
    let mensaje_mayus = document.querySelector("#req_mayus");
    let mensaje_minus = document.querySelector("#req_minus");
    let mensaje_tres_valores = document.querySelector("#req_tres_valores");
    let mensaje_espacios = document.querySelector("#req_espacios");
    let mensaje_caracteres = document.querySelector("#req_caracteres");

    let contraseña = document.getElementById('password').value;

    CambioColorValidador(ValidadorLongitud(contraseña), mensaje_long);
    CambioColorValidador(ValidadorDigitoNumeros(contraseña), mensaje_num);
    CambioColorValidador(ValidadorMayusculas(contraseña), mensaje_mayus);
    CambioColorValidador(ValidadorMinusculas(contraseña), mensaje_minus);
    CambioColorValidador(ValidadorTresValores(contraseña), mensaje_tres_valores);
    CambioColorValidador(ValidadorEspacioBlanco(contraseña), mensaje_espacios);
    CambioColorValidador(ValidadorCaracterEspecial(contraseña), mensaje_caracteres);
}

function ValidadorLongitud(contraseña) {
    const MIN = 8;
    const MAX = 20;
    return contraseña.length >= MIN && contraseña.length <= MAX;
}

function ValidadorDigitoNumeros(contraseña) {
    const ASCII_ZERO = 48;
    const ASCII_NINE = 57;
    for (let i = 0; i < contraseña.length; i++) {
        if (contraseña.charCodeAt(i) >= ASCII_ZERO && contraseña.charCodeAt(i) <= ASCII_NINE) {
            return true;
        }
    }
    return false;
}

function ValidadorMayusculas(contraseña) {
    const ASCII_MAYUS_A = 65;
    const ASCII_MAYUS_Z = 90;

    for (let i = 0; i < contraseña.length; i++) {
        if (contraseña.charCodeAt(i) >= ASCII_MAYUS_A && contraseña.charCodeAt(i) <= ASCII_MAYUS_Z) {
            return true;
        }
    }
    return false;
}

function ValidadorMinusculas(contraseña) {
    const ASCII_MINUS_A = 97;
    const ASCII_MINUS_Z = 122;
    const MIN = 2;
    let contador = 0;

    for (let i = 0; i < contraseña.length; i++) {
        if (contraseña.charCodeAt(i) >= ASCII_MINUS_A && contraseña.charCodeAt(i) <= ASCII_MINUS_Z) {
            contador++;
            if (contador == MIN) {
                return true;
            }
        }
    }
    return false;
}

function ValidadorTresValores(contraseña) {
    const OFFSET = 1;
    const MAX = 2;
    let i = 1;
    let repeticion = 0;

    while (i < contraseña.length) {
        if (contraseña.charCodeAt(i) == contraseña.charCodeAt(i - OFFSET)) {
            repeticion++;
            if (repeticion == MAX) {
                return false;
            }
        }
        else {
            repeticion = 0;
        }
        i++;
    }
    //Si el usuario no ha introducido ninguna contraseña, tambien devolvera falso.
    return contraseña.length > 0 ? true : false;
}

function ValidadorEspacioBlanco(contraseña) {
    let i = 0;

    while (i < contraseña.length) {
        if (contraseña[i] == ' ') {
            return false
        }
        i++;
    }
    //Si el usuario no ha introducido ninguna contraseña, tambien devolvera falso.
    return contraseña.length > 0 ? true : false;
}

function ValidadorCaracterEspecial(contraseña) {
    let i = 0;
    let caracteresEspeciales = ['!', '@', '#', '$', '%', '&', '_', '-', '.', '=']

    while (i < contraseña.length) {
        for (let x of caracteresEspeciales) {
            if (contraseña[i] == x) {
                return true;
            }
        }
        i++;
    }
    return false;
}

//CAMBIA EL COLOR DEL CONTORNO DEL REQUESITO A "VERDE" SI ES VALIDO Y "ROJO" SI ES INVALIDO:
function CambioColorValidador(returnFuncion, mensaje) {
    if (returnFuncion) {
        return mensaje.style.textShadow = "2px 2px 10px green";
    } else {
        return mensaje.style.textShadow = "2px 2px 10px red";
    }
}

//VER Y OCULTAR LA CONTRASEÑA: Solo se iniciara al darle al boton "SEE".
function VerOcultarContraseña() {
    let contraseña = document.querySelector("#password");
    contraseña.type = (contraseña.type === 'password') ? 'text' : 'password';
}

//REDIRIGIR AL USUARIO AL MAIN AL PULSAR "ENTER" EN EL INPUT DEL FORMULARIO EN HTML:
function TeclaEnterPulsado(event) {
    if (event.key === 'Enter') {
        init(); //Redirigirte al init().
        event.preventDefault(); //Hacer que <form> no envie el dato del input (contraseña).
    }
}

//PARA LIMPIAR EL CONTENIDO QUE HAY DENTRO DEL <input> DONDE SE INTRODUCE LA CONTRASEÑA.
function LimpiarContraseña() {
    var miInput = document.querySelector('#password');
    miInput.value = '';
}

