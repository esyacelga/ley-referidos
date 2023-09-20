import {tipoRetorno} from './page-type';

export class RequestOptions {
  public loadingMessage: string | undefined;
  public mostrarLoading = false;
  public successMessaje: string | undefined;
  public errorMessage: string | undefined;
  public toastColor: string | undefined;
  public restUrlConsultas: string | undefined;
  public restUrlTransacciones: string | undefined;
  public presentarToast = true;
  public responseType: tipoRetorno | undefined;  /// por de fecto en 0 que generará una lista, en 1 se obtendra una sola entidad

}
