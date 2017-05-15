export class Group {
    public id: string;
    public name: string;
    public privateVis: boolean;
    public groupPage: boolean;
    public photoUrl: string;
    public backgroundPhotoUrl: string;
    public description: string;
    public notificationsId: string;
    public eventsId: string;
    public category: string;
    public type: string;
    public officialClub: boolean;
    public discoverable: boolean;

    constructor(id: string, name: string, privateVis: boolean, groupPage: boolean, photoUrl: string, backgroundPhotoUrl: string,
                description: string, notificationsId: string, eventsId: string, category: string, type: string, officialClub: boolean,
                discoverable: boolean) {
        this.id = id;
        this.name = name;
        this.privateVis = privateVis;
        this.groupPage = groupPage;
        this.photoUrl = photoUrl;
        this.backgroundPhotoUrl = backgroundPhotoUrl;
        this.description = description;
        this.notificationsId = notificationsId;
        this.eventsId = eventsId;
        this.category = category;
        this.type = type;
        this.officialClub = officialClub;
        this.discoverable = discoverable;
    }
}