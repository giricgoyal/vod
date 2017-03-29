import { Component, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'player',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class PlayerComponent implements AfterViewInit {
    @Output() closeCallback: EventEmitter<any> = new EventEmitter();
    @Input('inputModel') item: any;
    @ViewChild('video') videoEl: ElementRef;

    constructor() {

    }

    ngAfterViewInit() {
        console.log(this.videoEl);
    }

    close() {
        this.closeCallback.emit(null);
    }

    playPause(video) {
        if (this.videoEl.nativeElement.paused) {
            this.videoEl.nativeElement.play();
        }
        else {
            this.videoEl.nativeElement.pause();
        }
    }

    pause() {

    }
}