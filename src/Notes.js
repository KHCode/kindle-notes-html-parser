const Notes = class {
    title;
    author;
    notesList = [];
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

export default Notes;