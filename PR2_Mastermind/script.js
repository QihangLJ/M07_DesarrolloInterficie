//Declaración de constantes.
const MAX_INTENTOS = 10;
const MIN_INTENTOS = 1;
const MAX_COMBI_COLORES = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";

/** Template con el código HTML que corresponde a cada fila de juego/intento. */
const ROW_RESULT = `<div class="rowResult w100 flex wrap">
    <div class="rowUserCombi w75 flex wrap">
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
    </div>
    <div class="rowCercleResult w25 flex wrap center">
       <div class="w40 h40">
            <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
    <div>
</div>`;

//Declaración de variables globales.
const master = [];
var userCombi = [];
var intento = 0;
var column = 0;
var aciertos = 0;

function init() {
    intento++;

    //1. Genera el código random del master
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        master[i] = getRandomColor(getRandomInt());
        //console.log(master[i]), para ver que se ha generado adecuadamente;
    }

    //2. Crea todas las filas según el número de intentos.
    let rowNumbers = 0;
    do {
        rowNumbers = prompt("Introduce el numero de intentos de 1 a 10:");
    } while (!attemptsValidation(rowNumbers));

    createColorBox(rowNumbers);
}



/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function comprobar() {
    //Reiniciamos las variables por ronda/intento.
    intento++;
    column = 0;
    userCombi = [];

    //Selecionamos las bolas del html.
    let ball = document.querySelector('.rowCercleResult:nth-child(' + intento + ')');

    //Assignamos los colores segun las repuestas.
    for (let i in userCombi) {
        ball[i].style.backgroundColor = changeBallColor(userCombi[i], master[i]);
    }
}

//Funcion para assignar los colores a las bolitas segun la respuesta del usuario.
function changeBallColor(userCombi, master) {
    let color;
    if (checkColor(userCombi)) {
        if (checkPosition(userCombi, master)) {
            //printar color negro (color y posicion correcto)
            color = "black";
        } else {
            //printar color blanco (color esta pero no en la posicion correcta)
            color = "white";
        }
    } else {
        //printar color gris (NADA)
        color = "gray";
    }
    return color;
}

//Funcion para validar si el color que ha escogido el usuario esta dentro o no.
function checkColor(colorUserCombi) {
    for (let j in master) {
        if (colorUserCombi === master[j]) {
            return true;
        }
    }
    return false;
}

//Funcion para validar si la posicion del color acertado es correcta o no.
function checkPosition(colorUserCombi, colorMaster) {
    return colorUserCombi === colorMaster;
}

//Funcion que valida la condicion de victoria.
function victoryValidation() {
    for (let i = 0; i < master.length; i++) {
        if (userCombi[i] != master[i]) {
            return false;
        }
    }
    return true;
}

/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {
    if (userCombi.length < MAX_COMBI_COLORES) {
        userCombi.push(color);
        colorResultRows(color);
    }
}

//Funcion que pinta las casillas del resultado cuando el usuario seleciona los colores.
function colorResultRows(color) {
    let especificCel = document.querySelectorAll('.rowResult:nth-child(' + intento + ') .celUserCombi');
    especificCel[column].style.backgroundColor = color;
    column++;
}

/*Funcion que nos devuelve un numero aleatorio.*/
function getRandomInt(max = 8) {
    let i = 0;
    do {
        i = Math.floor(Math.random() * max);
    } while (i == 0)
    return i;
}

/*Funcion que nos devuelve un color aleatorio dentro del array de colores.*/
function getRandomColor(number) {
    return COLORS[number - 1];
}

/*Funcion para crear todos las casillas grises segun los intentos que haya introducido el usuario*/
function createColorBox(rowsNumber) {
    let resultSection = document.getElementById("Result");
    for (let i = 0; i < rowsNumber; i++) {
        resultSection.innerHTML += ROW_RESULT;
    }
}

/*Funcion que valida que el numero d eintentos introducido por el usuario sea mayor de 0 y menor del 10*/
function attemptsValidation(attempts) {
    return attempts >= MIN_INTENTOS && attempts <= MAX_INTENTOS;
}
