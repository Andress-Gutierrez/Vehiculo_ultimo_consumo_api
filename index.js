class Lector_api
{
    constructor(valor_final_pesosId,marca_finalId,modelo_finalId,año_finalId,comb_finalId,valor_finalId,impuestoId,AñoId,ModeloId,MarcaId,VehiculosId,limpiarBotonId,VehiculosBtnId,MarcaBotonId,ModeloBotonId,AñoBotonId,ConverBotonId)
    {
        //cajas_desplegables
        this.Vehiculos = document.getElementById(VehiculosId);                                                   //caja_desplegable
        this.Marca = document.getElementById(MarcaId);
        this.Modelo = document.getElementById(ModeloId);
        this.Año = document.getElementById(AñoId);

        //labels_div_caja
        this.impuesto = document.getElementById(impuestoId);
        this.valor_final_pesos = document.getElementById(valor_final_pesosId);
        this.valor_final = document.getElementById(valor_finalId);
        this.comb_final = document.getElementById(comb_finalId);
        this.año_finalI = document.getElementById(año_finalId);
        this.modelo_final = document.getElementById(modelo_finalId);
        this.marca_final = document.getElementById(marca_finalId);

        //Botones
        this.limpiarBoton = document.getElementById(limpiarBotonId);                                              //boton_limpiar   
        this.VehiculoBoton = document.getElementById(VehiculosBtnId);                                             //boton_vehiculo 
        this.MarcaBoton = document.getElementById(MarcaBotonId);                                                  //boton_marca
        this.ModeloBoton = document.getElementById(ModeloBotonId);                                                //boto_modelo
        this.AñoBoton = document.getElementById(AñoBotonId);                                                      //boton_año
        this.ConverBoton = document.getElementById(ConverBotonId);                                                //boton_covertir_pesos
        
        //variables_globales
        this.tipo_vehiculo="";                                                                                     //guarda el_tipo_de_vehiculo
        this.cod_vehi="";                                                                                          //guarda_el_codigo_del_vehiculo
        this.marca="";                                                                                             //guarda_la_marca_vehiculo
        this.cod_marca="";                                                                                         //guarda_codigo_de_marca_vehiculo
        this.modelo="";                                                                                            //guarda_modelo
        this.cod_modelo=""                                                                                         //guarda_codigo_modelo
        this.precio_reales="";                                                                                     //precio_vehiculo_reales
        this.sigla_combu="";                                                                                       //guarda_sigla_combustible
        this.año="";                                                                                               //guarda_año

                     
        this.Vehiculos.selectedIndex = 0;
        this.URL = 'https://parallelum.com.br';                                                                    //Url_consumo_pi
        this.URL_servicio ='https://api.currencyapi.com/v3/latest?apikey=';                                        //url_servicio_intercambio_divisas
        this.apiKey='cur_live_ZG05DWCIGsJm6X85Q306Z5BvcdAmAlrsPzwSWH1E';                                           //apikey
        this.inicializarEventos();
    }

    inicializarEventos() 
    {
        this.limpiarBoton.addEventListener('click', () => this.limpiarSeleccionado());
        this.VehiculoBoton.addEventListener('click', () => this.vehiculoSeleccionado());
        this.MarcaBoton.addEventListener('click', () => this.marcaSeleccionado());
        this.ModeloBoton.addEventListener('click', () => this.modeloSeleccionado());
        this.AñoBoton.addEventListener('click', () => this.añoSeleccionado());
        this.ConverBoton.addEventListener('click', () => this.converSeleccionado());
    }
    
    limpiarSeleccionado()
    {
        //ventana desplegable
        this.Vehiculos.selectedIndex = 0;
        this.Marca.innerHTML="";
        this.Modelo.innerHTML="";
        this.Año.innerHTML="";
        //labels_div_caja
        this.impuesto.innerHTML='IMPUESTO:';
        this.valor_final_pesos.innerHTML='';
        this.valor_final.innerHTML='VALOR:';
        this.comb_final.innerHTML='COMBUSIBLE:';
        this.año_finalI.innerHTML='AÑO:';
        this.modelo_final.innerHTML='MODELO:';
        this.marca_final.innerHTML='MARCA:';
        //variables
        this.cod_vehi="";
        this.tipo_vehiculo="";
        this.marca="";
        this.cod_marca="";
        this.modelo="";                                                                                           
        this.cod_modelo="";
        this.precio_reales="";
        this.sigla_combu="";
        this.año="";
    }

    vehiculoSeleccionado()
    {
        if(this.Vehiculos.value != "")
        {
            this.tipo_vehiculo=this.Vehiculos.value;
            this.cod_vehi = this.Vehiculos.selectedOptions[0].getAttribute('id');
            fetch(`${this.URL}/fipe/api/v1/${this.cod_vehi}/marcas`) 
                .then(resp => resp.json())
                .then(data =>{ 
                    const aplicacion = document.querySelector('#Marca');
                    const tpl = data.map(data =>`<option id=${data.codigo}>${data.nome}</option>`);
                    aplicacion.innerHTML = `${tpl}`;
                    })
                .catch(error => console.log(error))   
        }
        else
        {
            this.limpiarSeleccionado();
        }
    }

    marcaSeleccionado()
    {
        if(this.tipo_vehiculo)
        {
            this.marca = this.Marca.value;
            this.cod_marca = this.Marca.selectedOptions[0].getAttribute('id');
            fetch(`${this.URL}/fipe/api/v1/${this.cod_vehi}/marcas/${this.cod_marca}/modelos`)
                .then(resp => resp.json())
                .then(data => { 
                    const Data=data.modelos;
                    const aplicacion = document.querySelector('#Modelo');
                    const tpl = Data.map(Data =>`<option id=${Data.codigo}>${Data.nome}</option>`);
                    aplicacion.innerHTML = `${tpl}`;
                    })
                .catch(error => console.log(error))
        }
    }

    modeloSeleccionado()
    {
        if(this.tipo_vehiculo && this.marca)
        {
            this.modelo = this.Modelo.value;
            this.cod_modelo = this.Modelo.selectedOptions[0].getAttribute('id');
            fetch(`${this.URL}/fipe/api/v1/${this.cod_vehi}/marcas/${this.cod_marca}/modelos/${this.cod_modelo}/anos`)
                .then(resp => resp.json())
                .then(data => { 
                    const aplicacion = document.querySelector('#Año');
                    const tpl = data.map(data =>`<option id=${data.codigo}>${data.nome}</option>`);
                    aplicacion.innerHTML = `${tpl}`;
                    })
                .catch(error => console.log(error))
        }
    }

    añoSeleccionado()
    {
        if(this.tipo_vehiculo && this.marca && this.modelo)
        {
            this.año = this.Año.value;
            const cod_año = this.Año.selectedOptions[0].getAttribute('id');
            fetch(`${this.URL}/fipe/api/v1/${this.cod_vehi}/marcas/${this.cod_marca}/modelos/${this.cod_modelo}/anos/${cod_año}`)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
                    this.marca_final.innerHTML='MARCA:&nbsp;&nbsp;&nbsp;&nbsp;'+data.Marca;
                    this.modelo_final.innerHTML='MODELO:&nbsp;&nbsp;&nbsp;&nbsp;'+data.Modelo;
                    this.año_finalI.innerHTML='AÑO:&nbsp;&nbsp;&nbsp;&nbsp;'+data.AnoModelo;
                    this.comb_final.innerHTML='COMBUSIBLE:&nbsp;&nbsp;&nbsp;&nbsp;'+data.Combustivel;
                    const string_reales =data.Valor;                                                                          //conversion_string_a_float
                    this.precio_reales=parseFloat(string_reales.replace(/[^\d,]/g, '').replace(',', '.'));
                    this.valor_final.innerHTML='VALOR:&nbsp;&nbsp;&nbsp;&nbsp;'+string_reales;
                    this.sigla_combu=data.SiglaCombustivel;
                    if(this.sigla_combu == "G" || this.sigla_combu == "D")
                    {
                        if(this.sigla_combu == "G")
                        {
                            this.impuesto.innerHTML='IMPUESTO:&nbsp;&nbsp;&nbsp;&nbsp; 5%';
                            this.sigla_combu=0.05;
                            console.log(this.sigla_combu);
                        }
                        else
                        {
                            this.impuesto.innerHTML='IMPUESTO:&nbsp;&nbsp;&nbsp;&nbsp; 2,5%';
                            this.sigla_combu=0.025;
                            console.log(this.sigla_combu);
                        }
                    }
                    else
                    {
                        this.impuesto.innerHTML='IMPUESTO:&nbsp;&nbsp;&nbsp;&nbsp; 1%';
                        this.sigla_combu=0.01;
                        console.log(this.sigla_combu);
                    }
                })
                .catch(error => console.log(error))
        }
    }

    converSeleccionado()
    {
        if(this.tipo_vehiculo && this.marca && this.modelo && this.año)
        {
            fetch(`${this.URL_servicio}${this.apiKey}`)
                .then(resp => {
                    if (!resp.ok) {
                         throw new Error(`Error en la solicitud: ${resp.status} - ${resp.statusText}`);
                    }
                    return resp.json();
                })
                .then(Data => {
                    //console.log(Data);
                    const divisa_pesos = Data.data.COP.value;                                                                                     //objeto/objeto/value
                    const conver_pesos = this.precio_reales*divisa_pesos;

                    const valorRecortado = Math.floor(conver_pesos);                                                                              //quito_decimal
                    const numeroFormateado = valorRecortado.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 });      //puntos_de_mil

                    this.valor_final_pesos.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; COP: &nbsp;'+numeroFormateado;

                    console.log(divisa_pesos);
                    console.log(this.precio_reales);
                    console.log(conver_pesos);
                    console.log(valorRecortado);
                    console.log(numeroFormateado);
                
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error.message);
                    // Si es un error de red, también puedes verificar si el error está relacionado con la conexión
                    if (error instanceof TypeError && error.message.includes('failed to fetch')) 
                    {
                        console.error('Error de conexión: Parece haber un problema de red.');
                    }
                })
        }
    }


}
const api = new Lector_api('valor_final_pesos','marca_final','modelo_final','año_final','comb_final','valor_final','impuesto','Año','Modelo','Marca','Vehiculos','limpiarBoton','VehiculoBoton','MarcaBoton','ModeloBoton','AñoBoton','ConverBoton');




