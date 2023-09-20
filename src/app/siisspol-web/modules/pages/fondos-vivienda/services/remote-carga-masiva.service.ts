import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class RemoteCargaMasivaService {
  private ejecutarMetodoHijo = new Subject<void>();
  ejecutarMetodoHijo$ = this.ejecutarMetodoHijo.asObservable();
  ejecutarMetodoRemoto() {
    this.ejecutarMetodoHijo.next(undefined);
  }

}
