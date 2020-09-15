import checkInputs from "../../../util/checkInputs";
import checkDocument from "../../../util/checkDocument";

const validations = {
  newComplaint: function validateComplaint(complaint) {
    const errors = {};

    if (complaint) {
      if (complaint.departmentAgresion) {
        if (!checkInputs.isAlphanumeric(complaint.departmentAgresion)) {
          errors.departmentAgresion = "No ingrese caracteres especiales.";
        }
      }

      if (complaint.description) {
        if (!checkInputs.notNull(complaint.description)) {
          errors.description = "La descripción es necesaria.";
        } else if (!checkInputs.isAlphanumeric(complaint.description)) {
          errors.description = "No ingrese caracteres especiales.";
        } else if (complaint.description.length > 99) {
          errors.description = "No ingrese  más de 99 caracteres.";
        }
      } else {
        errors.description = "La descripción es necesaria.";
      }

      if (complaint.dateAgresion) {
        if (!checkInputs.notNull(complaint.dateAgresion)) {
          errors.dateAgresion = "Ingrese la fecha de la agresión.";
        } else if (!checkInputs.isAlphanumeric(complaint.dateAgresion)) {
          errors.dateAgresion = "No ingrese caracteres especiales.";
        } else if (complaint.dateAgresion.length > 99) {
          errors.dateAgresion = "No ingrese  más de 99 caracteres.";
        }
      } else {
        errors.dateAgresion = "Ingrese la fecha de la agresión.";
      }

      if (complaint.effects) {
        if (!checkInputs.isAlphanumeric(complaint.effects)) {
          errors.effects = "No ingrese caracteres especiales.";
        } else if (complaint.effects.length > 99) {
          errors.effects = "No ingrese  más de 99 caracteres.";
        }
      }

      if (complaint.frequencyAgresion) {
        if (!checkInputs.notNull(complaint.frequencyAgresion)) {
          errors.frequencyAgresion =
            "La frecuencia de la agreción es muy útil.";
        } else if (!checkInputs.isAlphanumeric(complaint.frequencyAgresion)) {
          errors.frequencyAgresion = "No ingrese caracteres especiales.";
        } else if (complaint.frequencyAgresion.length > 99) {
          errors.frequencyAgresion = "No ingrese  más de 99 caracteres.";
        }
      } else {
        errors.frequencyAgresion = "La frecuencia de la agreción es muy útil.";
      }

      if (complaint.placeAgresion) {
        if (!checkInputs.notNull(complaint.placeAgresion)) {
          errors.placeAgresion = "El lugar de los hechos es muy útil.";
        } else if (!checkInputs.isAlphanumeric(complaint.placeAgresion)) {
          errors.placeAgresion = "No ingrese caracteres especiales.";
        } else if (complaint.placeAgresion.length > 99) {
          errors.placeAgresion = "No ingrese  más de 99 caracteres.";
        }
      } else {
        errors.placeAgresion = "El lugar de los hechos es muy útil.";
      }

      if (complaint.relationshipAggresor) {
        if (!checkInputs.notNull(complaint.relationshipAggresor)) {
          errors.relationshipAggresor =
            "La relación con el agresor es importante.";
        } else if (
          !checkInputs.isAlphanumeric(complaint.relationshipAggresor)
        ) {
          errors.relationshipAggresor = "No ingrese caracteres especiales.";
        } else if (complaint.relationshipAggresor.length > 99) {
          errors.relationshipAggresor = "No ingrese  más de 99 caracteres.";
        }
      } else {
        errors.relationshipAggresor =
          "La relación con el agresor es importante.";
      }

      if (complaint.type) {
        if (!checkInputs.notNull(complaint.type)) {
          errors.type = "Ingrese el tipo de agresión.";
        } else if (!checkInputs.isAlphanumeric(complaint.type)) {
          errors.type = "No ingrese caracteres especiales.";
        } else if (complaint.type.length > 99) {
          errors.type = "No ingrese  más de 99 caracteres.";
        }
      } else {
        errors.type = "Ingrese el tipo de agresión.";
      }
    } else {
      errors.type = "Ingrese el tipo de agresión.";
      errors.relationshipAggresor = "La relación con el agresor es importante.";
      errors.placeAgresion = "El lugar de los hechos es muy útil.";
      errors.frequencyAgresion = "La frecuencia de la agreción es muy útil.";
      errors.description = "La descripción es necesaria.";
      errors.dateAgresion = "Ingrese la fecha de la agresión.";
    }

    return errors;
  },
  updateUserData: function updateUserData(data) {
    const errors = {};
    if (data.user) {
      const user = data.user;
      if (user.cellphone) {
        if (!checkInputs.notNull(user.cellphone)) {
          errors.cellphone = "El número celular es necesario.";
        } else if (!checkInputs.isNumeric(user.cellphone)) {
          errors.cellphone = "Solo ingrese números.";
        } else if (user.cellphone.length > 13) {
          errors.cellphone =
            "Solo ingrese los 10 digitos o 13 si el número es extrangero.";
        }
      } else {
        errors.cellphone = "El número celular es necesario.";
      }

      if (user.civilStatus) {
        if (!checkInputs.notNull(user.civilStatus)) {
          errors.civilStatus = "El estado civil es necesario.";
        } else if (!checkInputs.isAlphanumeric(user.civilStatus)) {
          errors.civilStatus = "No ingrese caracteres especiales.";
        } else if (user.civilStatus.length > 99) {
          errors.civilStatus = "No ingrese más de 99 caracteres.";
        }
      } else {
        errors.civilStatus = "El estado civil es necesario.";
      }

      if (user.conventionalTelephone) {
        if (!checkInputs.notNull(user.conventionalTelephone)) {
          errors.conventionalTelephone = "El número convencional es necesario.";
        } else if (!checkInputs.isNumeric(user.conventionalTelephone)) {
          errors.conventionalTelephone = "No ingrese caracteres especiales.";
        } else if (user.conventionalTelephone.length > 99) {
          errors.conventionalTelephone = "No ingrese más de 99 caracteres.";
        }
      } else {
        errors.conventionalTelephone = "El número convencional es necesario.";
      }

      if (user.currentLevel) {
        if (!checkInputs.notNull(user.currentLevel)) {
          errors.currentLevel = "Ingrese el periodo que cursa.";
        } else if (!checkInputs.isAlphanumeric(user.currentLevel)) {
          errors.currentLevel = "No ingrese caracteres especiales.";
        } else if (user.currentLevel.length > 99) {
          errors.currentLevel = "No ingrese más de 99 caracteres.";
        }
      }

      if (user.disability) {
        if (!checkInputs.notNull(user.disability)) {
          errors.disability = "Ingrese si tiene o no una discapacidad.";
        } else if (!checkInputs.isAlphanumeric(user.disability)) {
          errors.disability = "No ingrese caracteres especiales.";
        } else if (user.disability.length > 99) {
          errors.disability = "No ingrese más de 99 caracteres.";
        }
      } else {
        errors.disability = "Ingrese si tiene o no una discapacidad.";
      }

      if (user.email) {
        if (!checkInputs.notNull(user.email)) {
          errors.email = "El correo es necesario.";
        } else if (!checkInputs.validationEmail(user.email)) {
          errors.email = "El correo no tiene el formato: user@ejemplo.com";
        } else if (user.email.length > 99) {
          errors.email = "No ingrese más de 99 caracteres.";
        }
      } else {
        errors.email = "El correo es necesario.";
      }

      if (user.ethnicity) {
        if (!checkInputs.notNull(user.ethnicity)) {
          errors.ethnicity = "Ingrese la etnia que pertenece.";
        } else if (!checkInputs.isAlphanumeric(user.ethnicity)) {
          errors.ethnicity = "No ingrese caracteres especiales.";
        } else if (user.ethnicity.length > 99) {
          errors.ethnicity = "No ingrese más de 99 caracteres.";
        }
      } else {
        errors.ethnicity = "Ingrese la etnia que pertenece.";
      }

      if (user.gender) {
        if (!checkInputs.notNull(user.gender)) {
          errors.gender = "Ingrese su genero.";
        } else if (!checkInputs.isAlphanumeric(user.gender)) {
          errors.gender = "No ingrese caracteres especiales.";
        } else if (user.gender.length > 99) {
          errors.gender = "No ingrese más de 99 caracteres.";
        }
      } else {
        errors.gender = "Ingrese su genero.";
      }

      if (user.homeAddress) {
        if (!checkInputs.notNull(user.homeAddress)) {
          errors.homeAddress = "Ingrese su dirección domiciliaria.";
        } else if (!checkInputs.isAlphanumeric(user.homeAddress)) {
          errors.homeAddress = "No ingrese caracteres especiales.";
        } else if (user.homeAddress.length > 199) {
          errors.homeAddress = "No ingrese más de 199 caracteres.";
        }
      } else {
        errors.homeAddress = "Ingrese su dirección domiciliaria.";
      }

      if (user.idUserESPE) {
        if (!checkInputs.notNull(user.idUserESPE)) {
          errors.idUserESPE = "Ingrese el Id proporcionado por la Universidad.";
        } else if (!checkDocument.validationIdESPE(user.idUserESPE)) {
          errors.idUserESPE =
            "El Id no tiene el formato correcto, ejemplo:  L00000001";
        } else if (user.idUserESPE.length !== 9) {
          errors.idUserESPE =
            "ID invalido, el proporcionado tiene el formato: L00000001.";
        }
      } else {
        errors.idUserESPE = "Ingrese el Id proporcionado por la Universidad.";
      }

      if (user.lastname) {
        if (!checkInputs.notNull(user.lastname)) {
          errors.lastname = "Ingrese sus apellidos.";
        } else if (!checkInputs.onlyLetters(user.lastname)) {
          errors.lastname = "Solo ingresé letras.";
        } else if (user.lastname.length > 99) {
          errors.lastname = "No ingrese más de 99 caracteres.";
        }
      } else {
        errors.lastname = "Ingrese sus apellidos.";
      }

      if (user.name) {
        if (!checkInputs.notNull(user.name)) {
          errors.name = "Ingrese sus nombres.";
        } else if (!checkInputs.onlyLetters(user.name)) {
          errors.name = "Solo ingresé letras.";
        } else if (user.name.length > 99) {
          errors.name = "No ingrese más de 99 caracteres.";
        }
      } else {
        errors.name = "Ingrese sus nombres.";
      }

      if (user.nationality) {
        if (!checkInputs.notNull(user.nationality)) {
          errors.nationality = "Ingrese su nacionalidad.";
        } else if (!checkInputs.onlyLetters(user.nationality)) {
          errors.nationality = "Solo ingresé letras.";
        } else if (user.nationality.length > 99) {
          errors.nationality = "No ingrese más de 99 caracteres.";
        }
      } else {
        errors.nationality = "Ingrese su nacionalidad.";
      }

      if (user.numDocument) {
        if (!checkInputs.notNull(user.numDocument)) {
          errors.numDocument = "Ingrese un documento de identificación.";
        } else if (user.typeDoc === "C") {
          if (
            !checkDocument.validarCedula(user.numDocument) &&
            !checkDocument.validarRucPersonaNatural(user.numDocument) &&
            !checkDocument.validarRucSociedadPrivada(user.numDocument) &&
            !checkDocument.validarRucSociedadPublica(user.numDocument)
          ) {
            errors.numDocument = "Cédula o RUC inválida.";
          }else if(user.numDocument.length > 10){
            errors.numDocument = "Cédula o RUC inválida.";
          }
        }else if (user.typeDoc === "P") {
            if (!checkInputs.isAlphanumeric(user.numDocument)){
                errors.numDocument = "Pasaporte inválida, no ingrese caracteres especiales.";
            }
        }
         else if (user.numDocument.length > 29) {
          errors.numDocument = "No ingrese más de 29 caracteres.";
        }
      } else {
        errors.numDocument = "Ingrese un documento de identificación.";
      }

      if (user.placeDateBirth) {
        if (!checkInputs.notNull(user.placeDateBirth)) {
          errors.placeDateBirth = "Ingrese la fecha de nacimiento.";
        }
      } else {
        errors.placeDateBirth = "Ingrese la fecha de nacimiento.";
      }

      if (user.relationshipUniversity) {
        if (!checkInputs.notNull(user.relationshipUniversity)) {
          errors.relationshipUniversity =
            "Ingrese la relación que tiene con la universidad.";
        } else if (!checkInputs.isAlphanumeric(user.relationshipUniversity)) {
          errors.relationshipUniversity = "No ingresé caracteres especiales.";
        } else if (user.relationshipUniversity.length > 99) {
          errors.relationshipUniversity = "No ingresé más de 99 caracteres.";
        }
      } else {
        errors.relationshipUniversity =
          "Ingrese la relación que tiene con la universidad.";
      }

      if (user.sex) {
        if (!checkInputs.notNull(user.sex)) {
          errors.sex = "Ingrese su sexo.";
        } else if (!checkInputs.isAlphanumeric(user.sex)) {
          errors.sex = "No ingresé caracteres especiales.";
        } else if (user.sex.length > 1) {
          errors.sex = "Solo ingrese 'H' -> Hombre o 'M' -> Mujer.";
        }
      } else {
        errors.sex = "Ingrese su sexo.";
      }
    } else {
      errors.user = "Ingrese sus datos personales.";
    }

    if (data.carrer) {
      if (typeof data.carrer !== "string") {
        if (!data.carrer.idCarrer) {
          errors.carrer = "Ingrese la carrera que sigue.";
        }
      }
    }
    return errors;
  },
};

export default validations;

export function getInfo(userData) {
  if (userData) {
    if (userData.carrer) {
      return {
        user: { ...userData.user, typeDoc: "C" },
        carrer: userData.carrer,
      };
    } else {
      return {
        user: userData,
        carrer: {
          idCarrer: null,
        },
      };
    }
  } else {
    return {
      user: {
        cellphone: "",
        civilStatus: "",
        conventionalTelephone: "",
        currentLevel: "",
        disability: "",
        email: "",
        ethnicity: "",
        gender: "",
        homeAddress: "",
        idUserESPE: "",
        lastname: "",
        name: "",
        nationality: "",
        numDocument: "",
        placeDateBirth: "",
        relationshipUniversity: "",
        sex: "",
        typeDoc: "C",
      },
      carrer: {
        idCarrer: null,
      },
    };
  }
}
