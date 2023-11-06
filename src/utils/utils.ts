export class Util{
    validateEmail (email: string): Boolean{
        const emailRegex: RegExp = /\S+@\S+\.\S+/;
        return  emailRegex.test(email);
    }

    isAutenticated (): Boolean{
        return localStorage.getItem('@plataformaCursos/TOKEN_KEY') ? true : false;
    }

}