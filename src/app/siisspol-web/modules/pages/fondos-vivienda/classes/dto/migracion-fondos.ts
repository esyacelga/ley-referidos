export class MigracionFondos{
  registros: string | undefined;
  aporte: string | undefined;
  interes: string | undefined;
  total: string | undefined;
  grupo: string | undefined;
  asiento: string | undefined;
  codigo: string | undefined;
  estado: string | undefined;
  fechaliq: string | undefined;
  fechacont: string | undefined;
  constructor(numregistros?: string, totalaporte?: string, totalinteres?: string, total?: string, grupo?: string,asiento?: string,codigo?: string,estado?: string,fechaliq?: string,fechacont?: string) {
    this.registros = numregistros;
    this.aporte = totalaporte;
    this.interes = totalinteres;
    this.total = total;
    this.grupo = grupo;
    this.asiento = asiento;
    this.codigo = codigo;
    this.estado = estado;
    this.fechaliq = fechaliq;
    this.fechacont=fechacont;
  }

}
