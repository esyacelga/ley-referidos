import {Injectable} from '@angular/core';
import {Imagen} from "../../classes/Imagen";
import {FileUploadEvent} from "primeng/fileupload";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() {
  }

  public abrirUrl(stringBase64: string, nombreArchvio: string, contentType: string, peso: string) {
    const blobData = this.convertBase64ToBlobData(stringBase64, contentType, peso);
    // @ts-ignore
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // @ts-ignore
      window.navigator.msSaveOrOpenBlob(blobData, nombreArchvio);
    } else { // chrome
      const blob = new Blob([blobData], {'type': contentType});
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = nombreArchvio;
      link.click();
    }
  }

  private convertBase64ToBlobData(base64Data: string, contentType: string, sliceSize: string) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    // @ts-ignore
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      // @ts-ignore
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  public obtenerInformacionArchivo(data: { files: File } | FileUploadEvent) {
    const promesa = new Promise(async (resolve, reject) => {
      const reader = new FileReader();
      // @ts-ignore
      const file = data.files[0];
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        let binaryData = reader.result;
        // @ts-ignore
        binaryData = binaryData.substring(binaryData.indexOf('base64,') + 7);
        // @ts-ignore
        const imagen = new Imagen(file.name, file.type, file.size, binaryData);
        resolve(imagen);
      };
    });
    return promesa;
  }
}
