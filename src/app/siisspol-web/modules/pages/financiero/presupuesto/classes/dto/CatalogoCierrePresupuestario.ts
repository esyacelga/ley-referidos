export class CatalogoCierrePresupuestario {
  boletinNegocio: string | undefined;
  boletinCierre: string | undefined;
  tipoMovimento: string | undefined;
  labelTipoMovimiento: string | undefined;
  npEstado: boolean | undefined = true;

  constructor(params: Partial<CatalogoCierrePresupuestario>) {
    Object.assign(this, params);
  }

  public convertirEstado() {
    if (this.npEstado) {
      this.tipoMovimento = "C";
      this.labelTipoMovimiento = "Cobrado";
    } else {
      this.tipoMovimento = "P";
      this.labelTipoMovimiento = "Pagado";
    }
  }

  public toBoolean() {
    this.npEstado = this.tipoMovimento === "C";
  }
}
