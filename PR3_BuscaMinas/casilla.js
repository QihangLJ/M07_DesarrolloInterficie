export class Casilla{
    coordX;
    coordY;
    bandera;
    destapado;
    esBomba;
    bombasCercanas;
    
    constructor(x, y){
        this.coordX = x;
        this.coordY = y;
        this.bandera = false;
        this.destapado = false;
        this.esBomba = false;
        this.bombasCercanas = 0;
    }

    cambiarBandera(){
        this.bandera = !this.bandera;
    }
    
    marcarResultado(tablero){
        return tablero[this.coordX][this.coordY]
    }
}