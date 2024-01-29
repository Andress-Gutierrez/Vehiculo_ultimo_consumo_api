class Lector_api
{
    constructor(marca_finalId,modelo_finalId,año_finalId,comb_finalId,valor_finalId,impuestoId,AñoId,ModeloId,MarcaId,VehiculosId,limpiarBotonId,VehiculosBtnId)
    {
        //cajas_desplegables
        this.Vehiculos = document.getElementById(VehiculosId);                                                      //caja_desplegable
        this.Marca = document.getElementById(MarcaId);
        this.Modelo = document.getElementById(ModeloId);
        this.Año = document.getElementById(AñoId);

        //labels_div_caja
        this.impuesto = document.getElementById(impuestoId);
        this.valor_final = document.getElementById(valor_finalId);
        this.comb_final = document.getElementById(comb_finalId);
        this.año_finalI = document.getElementById(año_finalId);
        this.modelo_final = document.getElementById(modelo_finalId);
        this.marca_final = document.getElementById(marca_finalId);


        //Botones
        this.limpiarBoton = document.getElementById(limpiarBotonId);                                                //boton_limpiar   
        this.VehiculoBoton = document.getElementById(VehiculosBtnId);                                               //boton_vehiculo 
                     
        this.Vehiculos.selectedIndex = 0;
        this.URL = 'https://parallelum.com.br';                                                                    //Url consumo_pi
        this.inicializarEventos();
    }

    inicializarEventos() 
    {
        this.limpiarBoton.addEventListener('click', () => this.limpiarSeleccionado());
        this.VehiculoBoton.addEventListener('click', () => this.vehiculoSeleccionado());
    }
    
    limpiarSeleccionado()
    {
        //ventana desplegable
        this.Vehiculos.selectedIndex = 0;
        this.Marca.innerHTML="";
        this.Modelo.innerHTML="";
        this.Año.innerHTML="";


        //labels_div_caja

        this.impuesto.innerHTML='MARCA:';
        this.valor_final.innerHTML='MODELO:';
        this.comb_final.innerHTML='AÑO:';
        this.año_finalI.innerHTML='COMBUSTIBLE:';
        this.modelo_final.innerHTML='VALOR:';
        this.marca_final.innerHTML='IMPUESTO:';

        //variables




    }
    vehiculoSeleccionado()
    {
        if(this.Vehiculos.value != "")
        {
            const vehi = this.Vehiculos.selectedOptions[0];
            console.log(vehi);
            console.log(this.Vehiculos.value);
            console.log("Mundo");
            fetch(`${this.URL}/fipe/api/v1/carros/marcas`) 
                //.then(resp => console.log(resp))
                .then(resp => resp.json())
                .then(data =>{ 
                    const aplicacion = document.querySelector('#Marca');
                    const tpl = data.map(data =>`<option id=${data.codigo}>${data.nome}</option>`);
                    aplicacion.innerHTML = `${tpl}`;
                    console.log(data);})
                .catch(error => console.log(error))   
        }
        else
        {
            this.limpiarSeleccionado();
        }
    }


}
const api = new Lector_api('marca_final','modelo_final','año_final','comb_final','valor_final','impuesto','Año','Modelo','Marca','Vehiculos','limpiarBoton','VehiculoBoton');




