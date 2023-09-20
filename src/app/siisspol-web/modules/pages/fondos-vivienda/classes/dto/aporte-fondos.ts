export class AporteFondos{
  num : string;
  cedula : string;
  nombre : string;
  aporte:string;
  interes:string;
  imposiciones:string;

  constructor(num: string,cedula: string,nombre : string, aporte: string, interes: string, imposiciones: string) {
    this.num = num;
    this.cedula = cedula;
    this.nombre = nombre;
    this.aporte = aporte;
    this.interes = interes;
    this.imposiciones = imposiciones;
  }

}
