export class CbxInstanciaTarea {
  idInstancia: string | undefined;
  ticket: string | undefined;

  constructor(idInstancia: string | undefined, ticket: string | undefined) {
    this.idInstancia = idInstancia;
    this.ticket = ticket;
  }
}
