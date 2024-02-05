//Declaración de constantes.
const MAX_ATTEMPTS = 10;
const MIN_ATTEMPTS = 1;
const MAX_COMBI_COLORS = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";

//Template con el código HTML que corresponde a cada fila de juego/intento.
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
var attempts = 0;
var column = 0;
var rowNumbers = 0;

function init() {
    //1. Genera el código random del master
    for (let i = 0; i < MAX_COMBI_COLORS; i++) {
        master[i] = getRandomColor(getRandomInt());
    }
    console.log(master) //Para ver que se ha generado adecuadamente;

    //2. Crea todas las filas según el número de intentos.
    do {
        rowNumbers = prompt("Introduce el numero de intentos de 1 a 10:");
    } while (!attemptsValidation(rowNumbers));
    createColorBox(rowNumbers);

    //Muestra la informacion de los intentos en la pantalla.
    remainingAttemptsMsg();
}

//Llamaremos esta funcion desde el boton de "erase" para borrar el ultimo color que hayamos introducido.
function erase() {
    userCombi.pop();
    eraseColorCell();
    eraseColorName();
}
//Borramos el color de la celda.
function eraseColorCell() {
    if (column > 0){
        let especificCell = document.querySelectorAll('.rowResult:nth-child(' + [attempts + 1] + ') .celUserCombi');
        column--;
        especificCell[column].style.backgroundColor = "#BABABA";
    } else{
        alert("¡Ya no puedes borrar más!"); 
    }
}
//Borramos el nombre del color que aparece en el input.
function eraseColorName() {
    let colorName = document.getElementById('combiText');
    let colorNameArray = colorName.value.split(',');
    colorNameArray.pop();
    colorName.value = colorNameArray;
}

//Reiniciamos el juego, reseteando algunos valores y borrando algunos datos.
function restart() {
    //Reiniciamos las variables para empezar la partida.
    attempts = 0;
    column = 0;
    userCombi = [];

    //Eliminamos las celdas de intentos.
    let resultCell = document.getElementById('Result');
    resultCell.innerHTML = '';

    //Borramos los nombres de los colores que hayan quedado en el input.
    let colorName = document.getElementById('combiText');
    colorName.value = '';

    userAttemptsMsg();
    cleanMasterCell();
    init();
}

//Dejamos las celdas "master" tal y como estaba al principio.
function cleanMasterCell() {
    let masterCell = document.querySelectorAll('#master .cel');
    for (let i = 0; i < masterCell.length; i++) {
        masterCell[i].style.backgroundColor = "grey";
    }
}

/*Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function check() {

    if (isAvailableToCheck()) {
        //Validamos los colores del usuario con la del master.
        checkBallResult();

        //Incrementamos el contador de intentos y lo mostramos al juagdor.
        attempts++;
        userAttemptsMsg();
        remainingAttemptsMsg();

        //Comprobamos si hemos ganado o perdido, en cualquiera de los caosos, mostramos los colores del master.
        if (victoryValidation() || attempts >= rowNumbers) {
            colorMasterCell();
            endGameMsg(victoryValidation());
        } else {
            //Reiniciamos las variables para una nueva ronda (intento) e incrementamos el contador de intentos.
            column = 0;
            userCombi = [];
        }

        deleteColorName();
    } else {
        alert("¡Tienes que introducir los 4 colores!");
    }
}

//Funcion para validar si el usuario ha introducido 4 colores o no.
function isAvailableToCheck() {
    return userCombi.length === 4;
}


//Funcion que cambia el color de todas las bolas de una misma fila.
function checkBallResult() {
    //Selecionamos las bolas del html.
    let ball = document.querySelectorAll('.rowResult:nth-child(' + [attempts + 1] + ') .cercleResult');

    //Creamos un array con la de veces que se repite un color.
    let colorCounter = repeatColorCounter();

    //La utilizaremos para comprobar si hay colores en su sitio, sino la validacion de los colores iria en orden.
    for (let i in ball) {
        for (let j in colorCounter) {
            if (COLORS[j] === userCombi[i]) {
                if (userCombi[i] === master[i]) {
                    colorCounter[j]--; //Restara en las repeticiones en caso de que el color este en su sitio. (NEGRO)
                }
            }
        }
    }

    //Assignamos los colores segun las repuestas.
    for (let i in ball) {
        for (let j in colorCounter) {
            if (COLORS[j] === userCombi[i]) {
                if (userCombi[i] === master[i]) {
                    ball[i].style.backgroundColor = BLACK; //printar color negro (color y posicion correcto)
                    //¡No restamos en "colorCounter", porque ya lo hicimos previamente!
                } else if (master.includes(userCombi[i]) && colorCounter[j] > 0) {
                    ball[i].style.backgroundColor = WHITE; //printar color blanco (color esta pero no en la posicion correcta)
                    colorCounter[j]--;
                } else {
                    ball[i].style.backgroundColor = GREY; //printar color gris (NADA)
                }
            }
        }
    }
}

//Funcion para contar cuantas veces se repite un color, lo guarda en un array con el mismo orden de colores que el de "COLORS".
function repeatColorCounter() {
    let colorCountArray = [];
    for (let i in COLORS) {
        colorCountArray.push(0);
        for (let j in master) {
            if (COLORS[i] === master[j]) {
                colorCountArray[i]++;
            }
        }
    }
    return colorCountArray;
}

//Muestra en el el apartado de mensaje "info", el numero de intentos.
function userAttemptsMsg() {
    const numbers = ['Primer', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto', 'Septimo', 'Octavo', 'Noveno', 'Decimo'];
    let userAttempts = document.querySelector('#info');
    userAttempts.innerHTML = numbers[attempts] + " intento, suerte!";
}

//Muestra en el el apartado de mensaje "info", el numero de intentos que le queda al jugador.
function remainingAttemptsMsg() {
    let remainingAttempts = document.querySelector('#attempts strong');
    remainingAttempts.innerHTML = rowNumbers - attempts;
}

function colorMasterCell() {
    let masterCell = document.querySelectorAll('#master .cel');
    for (let i in master) {
        masterCell[i].style.backgroundColor = master[i];
    }
}

//Funcion que valida la condicion de victoria.
function victoryValidation() {
    for (let i in master) {
        if (userCombi[i] != master[i]) {
            return false;
        }
    }
    return true;
}

//Mostrar mensaje de victoria.
function endGameMsg(isVictory) {
    let infoText = document.querySelector('#info');
    let message = isVictory ? "¡HAS ACERTADO, ENHORABUENA!" : "¡HAS PERDIDO, QUE LASTIMA!";
    return infoText.innerHTML = message;
}

/* Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores 
 * permitidos en la combinación. */
function addColor(color) {
    if (userCombi.length < MAX_COMBI_COLORS) {
        userCombi.push(color);
        colorResultRows(color);
        addColorName(color);
    }
}

//Funcion para eliminar todo los nombres de los colores del <input>.
function deleteColorName() {
    let inputColorName = document.getElementById('combiText');
    inputColorName.value = '';
}

//Funcion para ir añadiendo los nombres de los colores al <input>.
function addColorName(color) {
    let inputColorName = document.getElementById('combiText');
    //Añadir una ',' a la izquierda, menos en el primer valor.
    if (column != 1) {
        inputColorName.value += ',';
    }
    inputColorName.value += color;
}

//Funcion que pinta las casillas del resultado cuando el usuario seleciona los colores.
function colorResultRows(color) {
    let especificCell = document.querySelectorAll('.rowResult:nth-child(' + [attempts + 1] + ') .celUserCombi');
    especificCell[column].style.backgroundColor = color;
    column++;
}

//Funcion que nos devuelve un numero aleatorio.*/
function getRandomInt(max = 8) {
    let i = 0;
    do {
        i = Math.floor(Math.random() * max);
    } while (i == 0)
    return i;
}

//Funcion que nos devuelve un color aleatorio dentro del array de colores.*/
function getRandomColor(number) {
    return COLORS[number - 1];
}

//Funcion para crear todos las casillas grises segun los intentos que haya introducido el usuario*/
function createColorBox(rowsNumber) {
    let resultSection = document.getElementById("Result");
    for (let i = 0; i < rowsNumber; i++) {
        resultSection.innerHTML += ROW_RESULT;
    }
}

//Funcion que valida que el numero d eintentos introducido por el usuario sea mayor de 0 y menor del 10*/
function attemptsValidation(attempts) {
    return attempts >= MIN_ATTEMPTS && attempts <= MAX_ATTEMPTS;
}


//ARREGLAR ERROR DE COMPROVACIONES CON LAS BOLAS DE RESULTADO
