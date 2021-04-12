export default class NotesListItem {
    nodeType;
    textContent;
    constructor( nodeType, textContent ) {
        this.nodeType = nodeType;
        this.textContent = textContent;
    }
}

export class HighlightItem extends NotesListItem {
    constructor( textContent ) {
        super(textContent);
        this.nodeType = "Highlight";
    }
}

export class NoteItem extends NotesListItem {
    constructor( textContent ) {
        super(textContent);
        this.nodeType = "Note";
    }
}