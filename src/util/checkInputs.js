/**
 * @author {Dany_Lasso}
 * @param {any} value 
 * @returns {boolean} 
 * - false: contiene caracteres que no sean números.  
 * - true: solo contiene números
 */
export const isNumeric = value => {
    if (/[^0-9]/i.test(value.replace(/ /g, ""))) {
        return false;
    } else {
        return true;
    }
}

/**
 * @author {Dany_Lasso}
 * @param {any} value 
 * @returns {boolean} 
 * - false: contiene caracteres que no sean números.  
 * - true: solo contiene números y un punto.
 */
export const isDecimal = value => {
    if (/[^0-9 .]/i.test(value.replace(/ /g, ""))) {
        return false;
    } else {
        return true;
    }
}

/**
 * @author {Dany_Lasso}
 * @param {any} value 
 * @returns {boolean} 
 * - false: contiene caracteres que no sean números o letras.  
 * - true: solo contiene números o letras.
 */
export const isAlphanumeric = value => {
    if (/[ !@$%^*+={}|&<>?]/i.test(value.replace(/ /g, ""))) {
        return false;
    } else {
        return true;
    }
}


/**
 * @author {Dany_Lasso}
 * @param {any} value 
 * @returns {boolean} 
 * - false: contiene caracteres que no sean números, letras, numeral o parentesis.  
 * - true: solo contiene números, letras, numeral o parentesis.  
 */
export const isAlphanumericNumeralParentesis = value => {
    if (/[ `!@$%^*_+=[\]{};'"\\|<>?~]/i.test(value.replace(/ /g, ""))) {
        return false;
    } else {
        return true;
    }
}

/**
 * @author {Dany_Lasso}
 * @param {any} value 
 * @returns {boolean} 
 * - false: contiene caracteres que no sean letras.  
 * - true: solo contiene letras.  
 */
export const onlyLetters = value => {
    if (/[^a-zA-ZñÑáéíóúÁÉÍÓÚÀÈÌÒÙ .]/i.test(value.replace(/ /g, ""))) {
        return false;
    } else {
        return true;
    }
}

/**
 * @author {Dany_Lasso}
 * @param {any} value 
 * @returns {boolean} 
 * - false: El formato no es user@dominio
 * - true: tiene el formato user@dominio
 */
export const validationEmail = email => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z.]{2,}$/i.test(email.replace(/ /g, ""))) {
        return false;
    } else {
        return true;
    }
}

/**
 * @author {Dany_Lasso}
 * @param {any} value 
 * @returns {boolean} 
 * - true: el valor recibido no es nulo.
 * - false: el valor recibido es nulo.
 */
export const notNull = value => {
    if (value.replace(/ /g, "")) { //no es nulo
        return true;
    } else {
        return false;
    }
}

/**
 * @author {Dany_Lasso}
 */
const checkInputs = {
    /**
     * @author {Dany_Lasso}
     * @param {any} value 
     * @returns {boolean} 
    * - true: el valor recibido no es nulo.
    * - false: el valor recibido es nulo.
     */
    notNull: notNull,
    /**
     * @author {Dany_Lasso}
     * @param {any} value 
     * @returns {boolean} 
     * - false: El formato no es user@dominio
     * - true: tiene el formato user@dominio
     */
    validationEmail: validationEmail,
    /**
     * @author {Dany_Lasso}
     * @param {any} value 
     * @returns {boolean} 
     * - false: contiene caracteres que no sean letras.  
     * - true: solo contiene letras.  
     */
    onlyLetters: onlyLetters,
    /**
     * @author {Dany_Lasso}
     * @param {any} value 
     * @returns {boolean} 
     * - false: contiene caracteres que no sean números, letras, numeral o parentesis.  
     * - true: solo contiene números, letras, numeral o parentesis.  
     */
    isNumeric: isNumeric,
    /**
     * @author {Dany_Lasso}
     * @param {any} value 
     * @returns {boolean} 
     * - false: contiene caracteres que no sean números.  
     * - true: solo contiene números y un punto.
     */
    isDecimal: isDecimal,
    /**
     * @author {Dany_Lasso}
     * @param {any} value 
     * @returns {boolean} 
     * - false: contiene caracteres que no sean números o letras.  
     * - true: solo contiene números o letras.
     */
    isAlphanumeric: isAlphanumeric
}

export default checkInputs;