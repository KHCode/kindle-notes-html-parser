const NotesListItem = class {
    isHighlight;
    textContent;
    constructor( isHighlight, textContent ) {
        this.isHighlight = isHighlight;
        this.textContent = textContent;
    }
}

const HighlightItem = class extends NotesListItem {
    isHighlight=true;
    constructor( textContent ) {

        super(isHighlight, textContent);
    }
}