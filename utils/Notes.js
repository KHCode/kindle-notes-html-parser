module.exports = class Notes{
    title;
    author;
    notesList = [];
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}