import {toBoolean} from './texto.utils';
import * as _ from 'underscore';

export function convertitJsonAXml(o: any, tab: any) {
  return '<root>' + jsonToXml(o, tab) + '</root>';
}


export function generateNestedList(data: any[], primaryKey: string, parentField: string, childField: string) {
  const map = new Map();
  data.forEach(element => {
    const parentId = element[parentField];
    const id = element[primaryKey];
    const children: any = [];

    // Crea el objeto para el elemento actual
    const node = {...element, [childField]: children};

    if (map.has(id)) {
      // Si el elemento ya está en el mapa, actualiza sus propiedades
      map.get(id)[childField].push(...children);
      Object.assign(map.get(id), element);
    } else {
      // Agrega el elemento al mapa
      if (!node[parentField]) {
        const data = {...node, [parentField]: null};
        map.set(id, data);
      } else {
        map.set(id, node);
      }
      if (parentId !== null && map.has(parentId)) {
        // Si el elemento tiene un padre, agrega el elemento como hijo del padre
        map.get(parentId)[childField].push(node);
      }
    }
  });

  // Encuentra y devuelve los elementos raíz del árbol
  const roots = Array.from(map.values()).filter(node => node[parentField] === null);
  return roots;
}

/*export function listarCampoValor (lista:any, campo:string, valor:string) {
  var obj = undefined;
  if (_.isNull(valor)
    || valor===undefined)) {
    return obj;
  }
  if (angular.isArray(lista)) {
    for (var i = 0; i < lista.length; i++) {
      if (String(lista[i][campo]).trim() == String(valor).trim()) {
        obj = lista[i];
        break;
      }
    }
  }
  return obj;
}*/

const listToString = (lista: any[], campo: string) => {
  let cadena = '';
  if (lista) {
    if (lista) {
      for (let i = 0; i < lista.length; i++) {
        const valores = lista[i];
        for (const aux in valores) {
          if (aux === campo) {
            if (cadena === '')
              cadena = lista[i][aux]
            else
              cadena = cadena + ',' + lista[i][aux]
          }
        }

      }
    }
  }
  return cadena;
};
const whereList = (lista: any[], proiedad: any) => {
  const filteredArray = _.where(lista, proiedad);
  return filteredArray;
};

const orderDesc = (lista: any[], proiedad: string) => {
  const filteredArray = _.sortBy(lista, proiedad).reverse();
  return filteredArray;
};

const orderAsc = (lista: any[], proiedad: string) => {
  const filteredArray = _.sortBy(lista, proiedad);
  return filteredArray;
};

const whereEntidadLista = (lista: any[], propiedad: any) => {
  const filteredArray = _.where(lista, propiedad);
  if (filteredArray.length > 0) {
    return filteredArray[0];
  } else {
    return null;
  }
};

const toXml = (v: any, name: any, ind: any) => {
  let xml = '';
  if (v instanceof Array) {
    for (let i = 0, n = v.length; i < n; i++) {
      xml += ind + toXml(v[i], name, ind + '\t') + '\n';
    }
  } else if (typeof (v) === 'object') {
    let hasChild = false;
    xml += ind + '<' + name;
    for (const m in v) {
      if (m.charAt(0) === '@') {
        xml += ' ' + m.substr(1) + '=\"' + v[m].toString() + '\"';
      } else {
        hasChild = true;
      }
    }
    xml += hasChild ? '>' : '/>';
    if (hasChild) {
      for (const m in v) {
        if (m === '#text') {
          xml += v[m];
        } else if (m === '#cdata') {
          xml += '<![CDATA[' + v[m] + ']]>';
        } else if (m.charAt(0) !== '@') {
          xml += toXml(v[m], m, ind + '\t');
        }
      }
      xml += (xml.charAt(xml.length - 1) === '\n' ? ind : '') + '</' + name + '>';
    }
  } else {
    if (v !== undefined && !_.isNull(v)) {
      xml += ind + '<' + name + '>' + v.toString() + '</' + name + '>';
    } else {
      xml += ind + '<' + name + '></' + name + '>';
    }

  }
  return xml;
};

const jsonToXml = (o: any, tab: any) => {
  const myJSON = JSON.stringify(o);
  const res = myJSON.replace(/&/gi, 'y');
  o = JSON.parse(res);
  let xml = '';
  for (const m in o) {
    if (o.hasOwnProperty(m)) {
      xml += toXml(o[m], m, '');
    }
  }
  return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, '');
};


/**
 * Modifica una lista de elmentos
 * @arg1 lista
 * @arg2 campo a converitir a Boolean
 */
const modificarListaBitBolean = (lista: any[], campo: string) => {
  if (lista) {
    if (lista) {
      for (let i = 0; i < lista.length; i++) {
        const valores = lista[i];
        for (const aux in valores) {
          if (aux === campo) {
            lista[i][aux] = toBoolean(lista[i][aux]);
          }
        }

      }
    }
  }
  return lista;
};


const formatoListaXml = (lst: any) => {
  const lista = [];
  if (lst == null) {
    return null;
  }
  for (const entry of lst) {
    lista.push(entry.row);
  }
  return lista;
};
/**
 * Agrupa una lista por campo enviado
 * @param lista
 * @param campo
 * @param valor
 * @returns
 */
const listarObjetoPorCampo = (lista: any[], campo: any, valor: any) => {
  let list = [];
  if (lista) {
    for (var i = 0; i < lista.length; i++) {
      if (lista[i][campo] === valor) {
        list.push(lista[i]);
      }
    }
  }
  return list;
};

export function convertirLista(lista: any[], campo: string) {
  return listToString(lista, campo);
}

export function modificarBitABooleanos(lista: any[], campo: string) {
  return modificarListaBitBolean(lista, campo);
}

export function formatearListaXml(lst: any) {
  return formatoListaXml(lst);
}

export function filtrarLista(lista: any[], propiedad: any) {
  return whereList(lista, propiedad);
}

export function ordenAsendente(lista: any[], propiedad: any) {
  return orderAsc(lista, propiedad);
}

export function ordenDesendente(lista: any[], propiedad: any) {
  return orderDesc(lista, propiedad);
}

function transformAttributeToInt(objects: any[], attribute: string): any[] {
  return objects.map(obj => {
    if (typeof obj[attribute] === 'string') {
      obj[attribute] = parseInt(obj[attribute]);
    }
    return obj;
  });
}

export function ordenDesendenteInt(lista: any[], propiedad: any) {
  lista = transformAttributeToInt(lista, propiedad);
  return orderDesc(lista, propiedad);
}


export function obtenerEntidadLista(lista: any[], proiedad: any) {
  return whereEntidadLista(lista, proiedad);
}

/**
 * Obtiene lista agrupada
 * @param lista
 * @param campo
 * @param valor
 * @returns
 */
export function obtenerListarObjetoPorCampo(lista: any[], campo: any, valor: any) {
  return listarObjetoPorCampo(lista, campo, valor);
}

export function construirArbolUbicacion(lista: any[], nodoPadre = undefined) {
  const arbol = [];


  for (let i = 0; i < lista.length; i++) {
    if (lista[i].idUbicacionPadre === nodoPadre) {
      const nodoHijo: any = {
        idUbicacion: lista[i].idUbicacion,
        descripcion: lista[i].descripcion,
        codUbicacion: lista[i].codUbicacion,
        children: construirArbolUbicacion(lista, lista[i].idUbicacion)
      };
      arbol.push(nodoHijo);
    }
  }

  return arbol;
}

export function generarArbolGenerico(lista: any, campoPrimario: string, campoPadre: string, campoHijo: string) {
  return generateNestedList(lista, campoPrimario, campoPadre, campoHijo)
}
