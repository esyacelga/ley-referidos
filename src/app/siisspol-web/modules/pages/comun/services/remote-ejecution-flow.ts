import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class RemoteEjecutionFlow {
  private ejecutarMetodoHijoSource = new Subject<void>();
  private ejecutarNuevoFlujo = new Subject<void>();
  private ejecutarRegistrarFlujo = new Subject<void>();

  ejecutarMetodoHijo$ = this.ejecutarMetodoHijoSource.asObservable();
  ejecutarRegistroFlujo$ = this.ejecutarRegistrarFlujo.asObservable();
  ejecutarNuevoVersion$ = this.ejecutarNuevoFlujo.asObservable();

  public registarFlujo() {
    this.ejecutarMetodoHijoSource.next(undefined);
  }

  public nuevoVersionFlujo() {
    this.ejecutarNuevoFlujo.next(undefined);
  }

  public registratVersionFlujo() {
    this.ejecutarRegistrarFlujo.next(undefined);
  }
}

