import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'player',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class PlayerComponent {
    @Output() closeCallback: EventEmitter<any> = new EventEmitter();
    @Input('inputModel') item: any;

    constructor() {

    }

    close() {
        this.closeCallback.emit(null);
    }
}