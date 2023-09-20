/**
 * Genera fecha en formato dd/MM/YYYY desde un objeto Date
 *
 */
const formatoFecha = (fecha: Date) => {
  if (typeof fecha === 'string' || fecha instanceof String) {
    fecha = new Date(fecha);
  }
  const mm = fecha.getMonth() + 1; // getMonth() is zero-based
  const dd = fecha.getDate();
  return [
    (dd > 9 ? '' : '0') + dd,
    (mm > 9 ? '' : '0') + mm,
    fecha.getFullYear()
  ].join('/');
};

/**
 * Genera fecha en formato (dd/MM/yyyy HH:mm:ss) desde un objeto Date
 *
 */
const formatoFechaTiempo = (fecha: Date) => {
  var formato = formatoFecha(fecha);
  var hh = fecha.getHours();
  var mm = fecha.getMinutes();
  var ss = fecha.getSeconds();
  formato = formato + ' ' + ([
    (hh > 9 ? '' : '0') + hh,
    (mm > 9 ? '' : '0') + mm,
    (ss > 9 ? '' : '0') + ss
  ].join(':'));
  return formato;
};

/**
 * Genera fecha en formato dd/MM/YYYY desde un string
 *
 */
const formatoCadenaFecha = (fecha: string) => {
  let fechaComparacion = new Date();
  // @ts-ignore
  if (typeof fecha === 'string' || fecha instanceof String) {
    fechaComparacion = new Date(fecha);
  }
  const mm = fechaComparacion.getMonth() + 1; // getMonth() is zero-based
  const dd = fechaComparacion.getDate();
  return [
    (dd > 9 ? '' : '0') + dd,
    (mm > 9 ? '' : '0') + mm,
    fechaComparacion.getFullYear()
  ].join('/');
};

export function cadenaFormatearFecha(fecha: string | undefined) {
  // @ts-ignore
  return formatoCadenaFecha(fecha);
}


export function formatearFecha(fecha: Date) {
  return formatoFecha(fecha);
}

export function formatearFechaTiempo(fecha: Date) {
  return formatoFechaTiempo(fecha);
}
