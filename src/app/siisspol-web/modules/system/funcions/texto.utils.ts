import * as _ from 'underscore';


const _convertirFecha = (event: any): string => {
  if (event && event instanceof Date) {
    const dia = event.getDate().toString().padStart(2, '0');
    const mes = (event.getMonth() + 1).toString().padStart(2, '0');
    const anio = event.getFullYear().toString();

    return `${dia}-${mes}-${anio}`;
  } else {
    return ''; // Si no se selecciona ninguna fecha, se asigna una cadena vacía
  }
}
const _stringBase64toBlob = (b64Data: any, contentType: string, sliceSize?: number): Blob => {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
const _obtenerUrlConexionRest = (rootUrl: string, document: any): string => {
  let cadenaUrlActual: string = document;
  let valorBusquedaPatron = cadenaUrlActual.search('/#/');
  let cadenaActualizada: string = cadenaUrlActual.substring(0, valorBusquedaPatron);
  if (cadenaActualizada === 'http://localhost:4200' || cadenaActualizada === 'http://127.0.0.1:4200')
    return rootUrl;
  console.log("*********1*********");
  console.log(cadenaActualizada);
  console.log("*********2*********");
  if (cadenaActualizada.includes('https://siisspolweb.isspol.org.ec'))
    return rootUrl;
  valorBusquedaPatron = cadenaUrlActual.search('/ley-referidos/#/');
  cadenaActualizada = cadenaUrlActual.substring(0, valorBusquedaPatron);
  const text="https://siisspolweb.isspol.org.ec/siisspol-web-rest-service"
  cadenaActualizada = text;
  console.log(text);
  console.log("*********3*********");
  return cadenaActualizada
}
const convertirABoolean = (caracter: any) => {
  if (!caracter || _.isEmpty(String(caracter))) {
    return false;
  }
  const dato = caracter;
  if (dato === 1 || dato === '1' || caracter === 'true') {
    return true;
  } else {
    return false;
  }
};

const convertirABit = (caracter: any) => {
  if (caracter === undefined || caracter === null) {
    return 0;
  }
  if (caracter) {
    return 1;
  } else {
    return 0;
  }
};

const convertStringBit = (bandera: boolean) => {
  if (bandera === undefined || bandera === null) {
    return "0";
  }
  if (bandera) {
    return "1";
  } else {
    return "0";
  }
};

const ifNull = (value: any, ifnull: any) => {
  if (value === null || value === undefined) {
    return ifnull;
  }
  return value;
};

const validarCaracteres = (texto: any, filtro: any) => {
  let out = '';
  if (texto != undefined) {
    for (var i = 0; i < texto.length; i++) {
      if (filtro.indexOf(texto.charAt(i)) != -1) {
        out += texto.charAt(i);
      }
    }
  }

  return out;
};


export function isNull(value: any, ifnull: any) {
  return ifNull(value, ifnull);
}

export function toBoolean(caracter: any) {
  return convertirABoolean(caracter);
}

export function toBit(caracter: any) {
  return convertirABit(caracter);
}

export function toBitStr(caracter: any) {
  return convertStringBit(caracter);
}

export function obtenerUrlConnRest(rootUrl: string, document: any) {
  return _obtenerUrlConexionRest(rootUrl, document)
}

export function stringBase64toBlob(b64Data: any, contentType: string, sliceSize?: number) {
  return _stringBase64toBlob(b64Data, contentType, sliceSize)
}

export function convertirFecha(fecha: any) {
  return _convertirFecha(fecha)
}


/**
 *
 * @param texto Verifica los caracteres que se va a ingresar
 * @param filtro
 * @returns
 */
export function verificarCaracteres(texto: any, filtro: any) {
  return validarCaracteres(texto, filtro);
}
