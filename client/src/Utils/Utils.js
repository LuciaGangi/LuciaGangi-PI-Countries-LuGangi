
export const utils = {
    validate: (input) => {
        let errors = {};

            if (!input.name) errors.name = 'Name is required';
            if (!/^[a-zA-Z ]*$/.test(input.name)) errors.name = 'Nombre inválido: debe tener solo letras';
            if (input.name.length > 20 || input.name.length < 3) errors.name = 'Nombre debe tener entre 3 y 20 caracteres'

            if (input.duration < 1 || input.duration > 24 || input.duration === '') errors.duration = 'Duración debe ser entre 1 y 24 hs'

            if (input.difficulty < 1 || input.difficulty > 5 || input.difficulty === '') errors.difficulty = 'Dificultad debe ser entre 1 y 5'

            if (input.season !== 'Verano' && input.season !== 'Otoño' && input.season !== 'Invierno' && input.season !== 'Primavera' && input.season === '') errors.season = 'Estación inválida'        

            if(!input.countryID[0]) errors.countryID = 'Seleccionar un país'

        return errors;
    },

    objTester: (obj) =>{
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return true;
        }    
        return false;
    }
    
}
