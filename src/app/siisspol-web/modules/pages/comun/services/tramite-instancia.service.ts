import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../../system/services/system/execute-call-procedure.service';
import {TranslateService} from '@ngx-translate/core';
import {RequestOptions} from '../../../system/classes/RequestOptions';
import {FiltroSpConsultas} from './feriados.service';
import {COMUN_CONSULTAS} from '../../constantes/consulta-constante';
import {CbxInstanciaTarea} from '../classes/Tramite';

@Injectable({
  providedIn: 'root'
})
export class TramiteInstanciaService {

  constructor(private genericService: ExecuteCallProcedureService, private svrTrsnslate: TranslateService,
  ) {

  }

  public async obtnerListaIntanciaCpag() {
    const objPeticion: RequestOptions = new RequestOptions();
    objPeticion.loadingMessage = this.svrTrsnslate.instant('siisspolweb.loading.pmedicas.lista.cpag');
    const filtro: FiltroSpConsultas = {filtro: '', tipoConsulta: 'CARGACPAG'};
    const lst = await (this.genericService.getGenericObjects(filtro, COMUN_CONSULTAS, objPeticion)) as CbxInstanciaTarea[];
    return lst;
  }

}
