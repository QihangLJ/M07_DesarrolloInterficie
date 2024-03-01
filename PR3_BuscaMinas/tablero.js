import { Casilla } from './casilla.js';

export class Tablero {
    numFilas;
    numColumnas;
    numBombas;
    tablero;

    constructor(filas, columnas, bombas) {
        this.numFilas = filas;
        this.numColumnas = columnas;
        this.numBombas = bombas;
        this.tablero = [];
    }

    generarTablero() {
        for (let fila = 0; fila < this.numFilas; fila++) {
            this.tablero[fila] = [];
            for (let columna = 0; columna < this.numColumnas; columna++) {
                this.tablero[fila][columna] = new Casilla(fila, columna);
            }
        }
    }

    generarBombas() {
        let bombasColocadas = 0;
        while (bombasColocadas < this.#numBombas) {
            let fila = Math.floor(Math.random() * this.numFilas);
            let columna = Math.floor(Math.random() * this.numColumnas);
            if (this.tablero[fila][columna].esBomba !== true) {
                this.tablero[fila][columna].esBomba = true;
                bombasColocadas++;
            }
        }
    }

    incrementarBombasCercanas(filaInicial, filaFinal, columnaInicial, columnaFinal) {
        for (let i = filaInicial; i <= filaFinal; i++) {
            for (let j = columnaInicial; j <= columnaFinal; j++) {
                this.tablero[i][j].bombasCercanas++;
            }
        }
    }

    contarMinasVecinos() {
        for (let fila = 0; fila < this.numFilas; fila++) {
            for (let columna = 0; columna < this.numColumnas; columna++) {
                if (this.tablero[fila][columna].esBomba) {
                    if (fila === 0) {
                        if (columna === 0) {
                            this.incrementarBombasCercanas(fila, fila + 1, columna, columna + 1);
                        } else if (columna === this.numColumnas - 1) {
                            this.incrementarBombasCercanas(fila, fila + 1, columna - 1, columna);
                        } else {
                            this.incrementarBombasCercanas(fila, fila + 1, columna - 1, columna + 1);
                        }
                    } else if (fila === this.numFilas - 1) {
                        if (columna === 0) {
                            this.incrementarBombasCercanas(fila - 1, fila, columna, columna + 1);
                        } else if (columna === this.numColumnas - 1) {
                            this.incrementarBombasCercanas(fila - 1, fila, columna - 1, columna);
                        } else {
                            this.incrementarBombasCercanas(fila - 1, fila, columna - 1, columna + 1);
                        }
                    } else {
                        if (columna === 0) {
                            this.incrementarBombasCercanas(fila - 1, fila + 1, columna, columna + 1);
                        } else if (columna === this.numColumnas - 1) {
                            this.incrementarBombasCercanas(fila - 1, fila + 1, columna - 1, columna);
                        } else {
                            this.incrementarBombasCercanas(fila - 1, fila + 1, columna - 1, columna + 1);
                        }
                    }
                }
            }
        }
    }

    EJEMPLO(){
        let array = [];
        for (let fila = 0; fila < this.numFilas; fila++) {
            array[fila] = [];
            for (let columna = 0; columna < this.numColumnas; columna++) {
                if (this.tablero[fila][columna].esBomba) {
                    array[fila][columna] = "X";
                } else {
                array[fila][columna] = this.tablero[fila][columna].bombasCercanas;
                }
            }
        }
        console.log(array);
    }
}