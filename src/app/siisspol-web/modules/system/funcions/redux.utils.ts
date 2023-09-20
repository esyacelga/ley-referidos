import {setAccion} from "../../../shared/redux/store/actions/barra-herramientas.actions";
import {botonesBarraHerramientas} from "../../../shared/redux/types";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/redux/store/reducers/app.reducer";

const _funcionCancelar = (accion: botonesBarraHerramientas, store: Store<AppState>) => {
  accion = 'VOID';
  store.dispatch(setAccion({accion}));
  accion = 'CANCELAR';
  store.dispatch(setAccion({accion}));
  accion = 'VOID';
  store.dispatch(setAccion({accion}));
}


export function funcionCancelar(accion: botonesBarraHerramientas, store: Store<AppState>) {
  return _funcionCancelar(accion, store);
}
