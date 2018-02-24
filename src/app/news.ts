export class News{
    constructor(
        public id: number,
        public title : string,
        public category : string,
        public description : string,

    ){
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
    }
}