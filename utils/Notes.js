export default class Notes{
    title;
    authors = [];
    citation;
    highlightsList = [];
    notesList = [];
    constructor(title, authors, citation) {
        this.title = title;
        this.authors = authors;
        this.citation = citation;
    }
}