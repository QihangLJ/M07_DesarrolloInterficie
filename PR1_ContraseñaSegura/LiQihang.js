function init() {
    let mensaje_long = document.querySelector("#req_long");
    let mensaje_num = document.querySelector("#req_num");
    let mensaje_mayus = document.querySelector("#req_mayus");
    let mensaje_minus = document.querySelector("#req_minus");
    let mensaje_tres_valores = document.querySelector("#req_tres_valores");
    let mensaje_espacios = document.querySelector("#req_espacios");
    let mensaje_caracteres = document.querySelector("#req_caracteres");


    let contraseña = document.getElementById('password').value;

    console.log(document.getElementById('password').value);
    mensaje_long.style.color = ComprobarValidador(ValidadorLongitud(contraseña), mensaje_long);
    mensaje_num.style.color = ComprobarValidador(ValidadorDigitoNumeros(contraseña), mensaje_num);
    mensaje_mayus.style.color = ComprobarValidador(ValidadorMayusculas(contraseña), mensaje_mayus);
    mensaje_minus.style.color = ComprobarValidador(ValidadorMinusculas(contraseña), mensaje_minus);
    mensaje_tres_valores.style.color = ComprobarValidador(ValidadorTresValores(contraseña), mensaje_tres_valores);
    mensaje_espacios.style.color = ComprobarValidador(ValidadorEspacioBlanco(contraseña), mensaje_espacios);
    mensaje_caracteres.style.color = ComprobarValidador(ValidadorCaracterEspecial(contraseña), mensaje_caracteres);

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
    return true;
}

function ValidadorEspacioBlanco(contraseña) {
    let i = 0;

    while (i < contraseña.length) {
        if (contraseña[i] == ' ') {
            return false
        }
        i++;
    }
    return true;
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
    }
    return false;
}

//FUNCION EXTRA QUE VALIDA SI UNA DE LAS FUNCIONES ANTERIORES SE CUMPLE O NO:
function ComprobarValidador (returnFuncion, mensaje){
    if (returnFuncion){
        return "Green";
    } else {
        return "Red";
    }
}

//FUNCION EXTRA PARA VER LA CONTRASEÑA:
function VerOcultarContraseña() {
    let contraseña = document.querySelector("#password");
    let boton = document.querySelector("#boton_ver_contra");
    let click = false;

    boton.addEventListener('click', (e) => {
        if (!click) {
            contraseña.type = 'text'
            click = true
        } else if (click) {
            contraseña.type = 'password'
            click = false
        };
    });
}
