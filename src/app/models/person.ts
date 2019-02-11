export class Person {
    constructor(_id = null){
        this._id= _id;
        this.username ='';
        this.first_name ='';
        this.second_name ='';
        this.first_lastname ='';
        this.second_lastname ='';
        this.email ='';
	    this.password ='';
        this.country ='';
        this.celphone ='';
        this.Rate_by_hour ='';
        this.Rate_by_mount ='';
        this.idRol ='';
        this.github ='';
        this.linkedin ='';
        this.bitbucket ='';
    }
    _id: string;
    username: string;
    first_name: string;
    second_name: string;
    first_lastname: string;
    second_lastname: string;
    email: string;
	password: string;
    country: string;
    celphone: string;
    Rate_by_hour: string;
    Rate_by_mount: string;
    idRol: string;
    github: string;
    linkedin: string;
    bitbucket: string;
}
