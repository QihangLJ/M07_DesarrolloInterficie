import { Tablero } from './tablero.js';

const tableroInfo = new Tablero(5, 5, 10);
tableroInfo.generarTablero();
tableroInfo.generarBombas();
tableroInfo.contarMinasVecinos();

console.log(tableroInfo.tablero);

tableroInfo.EJEMPLO();