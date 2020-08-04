/***
 * identificadores del tipo de persona
 */
const PERSONA_NATURAL = 1;

/**
 * @author {Dany_Lasso}
 * @param {string} RUC 
 * @returns {boolean} 
 * - false: RUC inválido.  
 * - true: RUC válido. 
 */
export const validateRuc = RUC => {
    let esValido = true;

    let dosPrimerosDigitos = Number(RUC.substring(0, 2));
    if (dosPrimerosDigitos < 1 || dosPrimerosDigitos > 24) {
        return false;
    }
    return esValido;
}

/**
 * @author {Dany_Lasso}
 * @param {string} RUC 
 * @returns {boolean} 
 * - false: RUC inválido Sociedad Pública.  
 * - true: RUC válido Sociedad Pública.   
 */
export const validarRucSociedadPublica = RUC => {
    return validarCodigoProvincia(RUC.substring(0, 2)) && validarTercerDigito(Number(RUC.substring(2, 3)), 3)
        && validarCodigoEstablecimiento(RUC.substring(9, 13), 2) && ejecMod11(RUC.substring(0, 9), Number(RUC.substring(8, 9)), 4);
}

/**
 * @author {Dany_Lasso}
 * @param {string} RUC 
 * @returns {boolean} 
 * - false: RUC inválido Sociedad Privada.  
 * - true: RUC válido Sociedad Privada.   
 */
export const validarRucSociedadPrivada = RUC => {
    return validarCodigoProvincia(RUC.substring(0, 2)) && validarTercerDigito(Number(RUC.substring(2, 3)), 2)
        && validarCodigoEstablecimiento(RUC.substring(10, 13), 1) && ejecMod11(RUC.substring(0, 9), Number(RUC.substring(9, 10)), 3);
}

/**
 * @author {Dany_Lasso}
 * @param {string} RUC 
 * @returns {boolean} 
 * - false: RUC inválido Persona Natural.  
 * - true: RUC válido Persona Natural.    
 */
export const validarRucPersonaNatural = RUC => {
    return validarCodigoProvincia(RUC.substring(0, 2)) && validarTercerDigito(Number(RUC.substring(2, 3)), PERSONA_NATURAL)
        && validarCodigoEstablecimiento(RUC.substring(10, 13), PERSONA_NATURAL) && validarCedula(RUC);
}

/**
 * @author {Dany_Lasso}
 * @param {string} RUC 
 * @returns {boolean} 
 * - false: Código de provincia inválido.  
 * - true: Código de provincia válido.     
 */
const validarCodigoProvincia = dosPrimerosDigitos => {
    if (dosPrimerosDigitos < 1 || dosPrimerosDigitos > 24) {
        return false;
    } else {
        return true;
    }
}
/**
 * @author {Dany_Lasso}
 * @param {string} cedula 
 * @returns {boolean} 
 * - false: Cédula inválida.  
 * - true: Cédula válida.  
 */
export const validarCedula = (cedula) => {
    let esValido = true;
    let digitoVerificador = Number(cedula.substring(9, 10));
    let pares = 0;
    let impares = 0;
    for (let index = 1; index < 10; index++) {
        if (index % 2 === 0) {
            pares = pares + Number(cedula.substring(index - 1, index));
        } else {
            ((Number(cedula.substring(index - 1, index)) * 2) > 9) ?
                impares = impares + ((Number(cedula.substring(index - 1, index)) * 2) - 9)
                :
                impares = impares + Number(cedula.substring(index - 1, index)) * 2;
        }
    }
    if (digitoVerificador !== ((Math.trunc((impares + pares) / 10) + 1) * 10) - (pares + impares)) {
        esValido = false;
    }

    return esValido;

}

/**
 * @author {Dany_Lasso}
 * @param {string} cedula 
 * @returns {boolean} 
 * - false: Tercer Dígito inválido.  
 * - true: Tercer Dígito válido.  
 */
const validarTercerDigito = (numero, tipo) => {
    let resultado = true;
    switch (tipo) {
        case 1:
            /**
                 * El tercer dígito debe ser mayor o igual a 0 y menor a 6 para
                 * cédulas y RUC de persona natural, se permiten de 0 a 5
                 */
            if (numero < 0 || numero > 5) {
                resultado = false;
            }
            break;
        case 2:
            /**
             * El tercer dígito debe ser igual a 9 para extranjeros no
             * residentes, Sociedades Privadas, Misiones Diplomáticas y
             * Organismos Internacionales
             */
            if (numero !== 9) {
                resultado = false;
            }
            break;
        case 3:
            /**
             * El tercer dígito debe ser igual a 6 para Entidades Públicas
             */
            if (numero !== 6) {
                resultado = false;
            }
            break;

        default:
            resultado = false;
            break;
    }
    return resultado;
}

/**
 * @author {Dany_Lasso}
 * @param {string} cedula 
 * @returns {boolean} 
 * - false: Código Establecimiento inválido.  
 * - true: Código Establecimiento válido.  
 */
const validarCodigoEstablecimiento = (numero, tipo) => {
    let resultado = true;
    if (tipo === 1) {
        if (numero !== "001") {
            resultado = false;
        }
    } else if (tipo === 2) {
        if (numero !== "0001") {
            resultado = false;
        }
    }
    return resultado;
}


const ejecMod11 = (digitosIniciales, digitoVerificador, tipo) => {
    let coefArray = [];
    let resultado = true;
    switch (tipo) {
        case 3:
            coefArray = [4, 3, 2, 7, 6, 5, 4, 3, 2];
            break;
        case 4:
            coefArray = [3, 2, 7, 6, 5, 4, 3, 2];
            break;
        default:
            resultado = false;
            break;
    }
    let tmpDigIniciales = [];
    for (let index = 0; index < digitosIniciales.length; index++) {
        const valPos = Number(digitosIniciales[index]);
        tmpDigIniciales.push(valPos);

    }
    let total = 0;
    let key = 0;
    for (let index = 0; index < tmpDigIniciales.length; index++) {
        if (key < coefArray.length) {
            const valPos = (tmpDigIniciales[key]) * coefArray[key];
            total = total + valPos;
        }
        key = key + 1;
    }

    let residuo = total % 11;
    let valor;

    if (residuo === 0) {
        valor = 0;
    } else {
        valor = (11 - residuo);
    }

    if (valor !== digitoVerificador) {
        resultado = false;
    }

    return resultado;
}

/**
 * @author {Dany_Lasso}
 */
const checkDocuments = {
    /**
     * @author {Dany_Lasso}
     * @param {string} cedula 
     * @returns {boolean} 
     * - false: Cédula inválida.  
     * - true: Cédula válida.  
     */
    validarCedula: validarCedula,
    /**
     * @author {Dany_Lasso}
     * @param {string} RUC 
     * @returns {boolean} 
     * - false: RUC inválido Persona Natural.  
     * - true: RUC válido Persona Natural.    
     */
    validarRucPersonaNatural: validarRucPersonaNatural,
    /**
     * @author {Dany_Lasso}
     * @param {string} RUC 
     * @returns {boolean} 
     * - false: RUC inválido Sociedad Privada.  
     * - true: RUC válido Sociedad Privada.   
     */
    validarRucSociedadPrivada: validarRucSociedadPrivada,
    /**
     * @author {Dany_Lasso}
     * @param {string} RUC 
     * @returns {boolean} 
     * - false: RUC inválido Sociedad Pública.  
     * - true: RUC válido Sociedad Pública.   
     */
    validarRucSociedadPublica: validarRucSociedadPublica,

}

export default checkDocuments;