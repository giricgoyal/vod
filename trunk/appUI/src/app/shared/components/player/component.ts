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

    private videoPercent: Number;
    private currentTime: string;
    private duration: string;

    constructor() {
        this.videoPercent = 0;
    }

    ngAfterViewInit() {
        
    }

    private getTimeString(time) {
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = Math.ceil(time % 60);

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    durationChangeEventHandler($event) {
        this.videoPercent = (100 / this.videoEl.nativeElement.duration) * this.videoEl.nativeElement.currentTime;
        this.duration = this.getTimeString(this.videoEl.nativeElement.duration);
        this.currentTime = this.getTimeString(this.videoEl.nativeElement.currentTime);
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