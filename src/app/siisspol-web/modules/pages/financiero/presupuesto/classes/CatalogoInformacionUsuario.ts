export class CatalogoInformacionUsuario {
  idUsuario: string | undefined;
  nombreCompleto: string | undefined;
  estruturaOrganizacional: string |undefined;

  constructor(params: Partial<CatalogoInformacionUsuario>) {
    Object.assign(this, params);
  }
}
