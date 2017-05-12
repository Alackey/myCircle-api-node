export class User {
    public username: string;
    public photoUrl: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public second_email: string;

    constructor(username: string, photoUrl: string, firstname: string, lastname: string,
                email: string, second_email: string = undefined) {
        this.username = username;
        this.photoUrl = photoUrl;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.second_email = second_email;
    }
}