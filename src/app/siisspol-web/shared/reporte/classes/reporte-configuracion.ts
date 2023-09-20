import {tipoCampoEntrada} from "./report-types";

export interface IConfiguracionReporte {
  tipoEntrada: tipoCampoEntrada;
  nombreCampo: string;
  label: string;


}


export class ConfiguracionReporteImpl implements IConfiguracionReporte {
  nombreCampo: string;
  tipoEntrada: tipoCampoEntrada;
  label: string;

  constructor(nombreCampo: string, tipoEntrada: tipoCampoEntrada, label?: string) {
    this.nombreCampo = nombreCampo;
    this.tipoEntrada = tipoEntrada;
    this.label = label!;
  }

}







