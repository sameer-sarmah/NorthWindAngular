export class CSRFCache{
    private csrfToken:string;
    constructor(){}
    setCSRFToken(token:string){
     this.csrfToken=token;
    }
    getCSRFToken(){
        return this.csrfToken;
    }
}