class Lector_api
{
    constructor(limpiarBotonId,VehiculosBtnId)
    {
        //Botones
        this.limpiarBoton = document.getElementById(limpiarBotonId);
        this.VehiculoBoton = document.getElementById(VehiculosBtnId);                                                  //boton vehiculo 
                     

        this.inicializarEventos();
    }

    inicializarEventos() 
    {
        this.limpiarBoton.addEventListener('click', () => this.limpiarSeleccionado());
        this.VehiculoBoton.addEventListener('click', () => this.vehiculoSeleccionado());
    }
    
    limpiarSeleccionado()
    {
        console.log("Hola");
    }
    vehiculoSeleccionado()
    {
        console.log("Mundo");
    }


}
const api = new Lector_api('limpiarBoton','VehiculoBoton');