export class User {
    public uid: string;
    public username: string;
    public photo: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public second_email: string;

    constructor(uid: string, username: string, photo: string, firstname: string, lastname: string,
                email: string, second_email: string = undefined) {
        this.uid = uid;
        this.username = username;
        this.photo = photo;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.second_email = second_email;
    }
}