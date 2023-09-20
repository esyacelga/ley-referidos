export class CatalogoValorNegativo {
  boletin: string | undefined;
  cuentaContable: string | undefined;
  valor: number | undefined;
  tipoMovimento: string | undefined;
  labelTipoMovimiento: string | undefined;
  npEstado: boolean | undefined = true;

  constructor(params: Partial<CatalogoValorNegativo>) {
    Object.assign(this, params);
  }

  public convertirEstado() {
    if (this.npEstado) {
      this.tipoMovimento = "D";
      this.labelTipoMovimiento = "Ingreso";
    } else {
      this.tipoMovimento = "C";
      this.labelTipoMovimiento = "Egreso";
    }
  }

  public toBoolean() {
    this.npEstado = this.tipoMovimento === "D";
  }
}
