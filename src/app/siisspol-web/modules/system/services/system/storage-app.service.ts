import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageAppService {
  objGuardado: any = null;
  async eliminarTodo() {
    localStorage.clear();
  }
  loadStorageObject(key: string) {
    const promesa = new Promise((resolve, reject) => {
      if (localStorage.getItem(key)) {
        // @ts-ignore
        this.objGuardado = JSON.parse(localStorage.getItem(key));
        resolve(this.objGuardado);
      } else {
        resolve(null);
      }

    });
    return promesa;
  }
  setStorageObject(obj: any, key: string) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}
