function init() {
    
}

function ValidadorLongitud(contraseña) {
    const MIN = 8;
    const MAX = 20;
    return contraseña.length >= MIN && contraseña.length <= MAX;
}

function ValidadorDigitoNumeros(contraseña) {
    const ASCII_ZERO = 48;
    const ASCII_NINE = 57;
    for (let i in contraseña) {
        if (contraseña.fromCharCode(i) >= ASCII_ZERO && contraseña.fromCharCode(i) <= ASCII_NINE) {
            return true;
        }
    }
    return false;
}

function ValidadorMayusculas(contraseña) {
    const ASCII_MAYUS_A = 65;
    const ASCII_MAYUS_Z = 90;

    for (let i in contraseña) {
        if (contraseña.fromCharCode(i) >= ASCII_MAYUS_A && contraseña.fromCharCode(i) <= ASCII_MAYUS_Z) {
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

    for (let i in contraseña) {
        if (contraseña.fromCharCode(i) >= ASCII_MINUS_A && contraseña.fromCharCode(i) <= ASCII_MINUS_Z) {
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
        if (contraseña.fromCharCode(i) == contraseña.fromCharCode(i - OFFSET)) {
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
    let caracteresEspeciales = ['!','@','#','$','%','&','_','-','.','=']

    while (i < contraseña.length) {
        for (let x of caracteresEspeciales){
            if (contraseña[i] == x){
                return true;
            }
        }
    }
    return false;
}
