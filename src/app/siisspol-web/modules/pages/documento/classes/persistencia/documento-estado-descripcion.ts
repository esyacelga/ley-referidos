import {AdjuntoPersistencia} from "./AdjuntoPersistencia";

export class DocumentoEstadoDescripcion extends AdjuntoPersistencia {
  estadoPersinstencia: string
  descripcionPersistencia:string

  constructor(idDenuncia: string | undefined, estado: string | undefined, nombreArchivo: string | undefined, tipo: string | undefined, peso: string | undefined, imagen: string | undefined, idDenunciaAdjunto: string | undefined, estadoPersinstencia: string, descripcionPersistencia: string) {
    super(idDenuncia, estado, nombreArchivo, tipo, peso, imagen, idDenunciaAdjunto);
    this.estadoPersinstencia = estadoPersinstencia;
    this.descripcionPersistencia = descripcionPersistencia;
  }
}
