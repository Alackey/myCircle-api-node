export class Group {
    public id: string;
    public name: string;
    public private_visibility: boolean;
    public members: string;
    public photo: string;
    public background_photo: string;
    public description: string;
    public notifications: string;
    public events: string;
    public category: string;
    public type: string;
    public official_club: boolean;

    constructor(id: string, name: string, private_visibility: boolean, members: string, photo: string, background_photo: string,
                description: string, notifications: string, events: string, category: string, type: string, official_club: boolean) {
        this.id = id;
        this.name = name;
        this.private_visibility = private_visibility;
        this.members = members;
        this.photo = photo;
        this.background_photo = background_photo;
        this.description = description;
        this.notifications = notifications;
        this.events = events;
        this.category = category;
        this.type = type;
        this.official_club = official_club;
    }
}