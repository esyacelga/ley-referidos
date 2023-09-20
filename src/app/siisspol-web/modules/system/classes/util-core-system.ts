import {Injectable} from '@angular/core';
import {Builder} from 'xml2js';
import {formatearListaXml} from '../funcions/lista.utils';

@Injectable({
  providedIn: 'root'
})
export class UtilCoreSystem {

  constructor() {


  }


  public genericCastList<T>(lstData: any) {
    const lstRet: Array<T> = [];
    for (let iterator of lstData) {
      iterator = iterator as T;
      lstRet.push(iterator);
    }
    return lstRet;
  }


  public xmlToJsonFormat = (xml: any): any => {
    const data = this.xmlToJson(xml);
    // @ts-ignore
    if (!data.root) {
      return null;
    }

    // @ts-ignore
    if (data.root.entidad.length) {
      return data;
    } else {
      // @ts-ignore
      const dato = data.root.entidad;
      // @ts-ignore
      data.root.entidad = [];
      // @ts-ignore
      data.root.entidad.push(dato);
      return data;
    }
  };

  public listaDesdeXML = (data: any): any => {
    const parseXml = this.parseXml(data);
    const obj = this.xmlToJsonFormat(parseXml);
    if (!obj) {
      return null;
    }
    return formatearListaXml(obj.root.entidad);
  };

  public parseXml = function (data: any): any {
    let parser;
    let xmlDoc;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(data, 'text/xml');
    return xmlDoc;
  };

  public xmlToJson = function (xml: any): any {
    // Create the return object
    let obj = {};

    if (xml.nodeType === 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        // @ts-ignore
        obj['row'] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          // @ts-ignore
          obj['row'][attribute.nodeName.replace('_x0020_', ' ')] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
        // @ts-ignore
        if (typeof (obj[nodeName]) === 'undefined') {
          // @ts-ignore
          obj[nodeName] = this.xmlToJson(item);
        } else {
          // @ts-ignore
          if (typeof (obj[nodeName].push) === 'undefined') {
            // @ts-ignore
            const old = obj[nodeName];
            // @ts-ignore
            obj[nodeName] = [];
            // @ts-ignore
            obj[nodeName].push(old);
          }
          // @ts-ignore
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  };

  public entidadDesdeXML = (data: any): any => {
    if (!data || data == null) {
      return null;
    }
    const parseXml = this.parseXml(data);
    const obj = this.xmlToJson(parseXml);
    // @ts-ignore
    if (!obj && !obj.root && !obj.root.entidad && !obj.root.entidad.row) {
      return null;
    }
    // @ts-ignore
    return obj.root.entidad.row;
  };

  public toXML = function (json: any): any {
    const builder = new Builder();
    return builder.buildObject(json);
  };


}

