import {CatalogoDocumento} from "./catalogoDocumento";

export class CatalogoCompuesto extends CatalogoDocumento {
  opcion: String | undefined = '';

  constructor(nombre?: string, descripcion?: string, codigo?: string, idCatalogo?: string, opcion?: String) {
    super(nombre, descripcion, codigo, idCatalogo);
    this.opcion = opcion;
  }
}
