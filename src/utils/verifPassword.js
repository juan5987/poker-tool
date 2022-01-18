export const verifPassword = (password) => {

    let isLowercase = false;
    let isUppercase = false;
    let isNumber = false;
    let isLengthOK = false;
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    for(let i = 0; i < password.length; i++){

        let character = password.charAt(i);
        if( isNaN(character) && !format.test(character) && character === character.toUpperCase()) isUppercase = true;
        if( isNaN(character) && !format.test(character) && character === character.toLowerCase()) isLowercase = true;
        if( !isNaN(character)) isNumber = true;
        if(password.length >= 8) isLengthOK = true;
    }
    
    if(!isUppercase){
        return "Le mot de passe doit contenir au moins une majuscule."
    }
    if(!isLowercase){
        return "Le mot de passe doit contenir au moins une minuscule."
    }
    if(!isNumber){
        return "Le mot de passe doit contenir au moins un nombre."
    }
    if(!isLengthOK){
        return "Le mot de passe doit contenir au moins 8 caractères."
    }

    return true;
}