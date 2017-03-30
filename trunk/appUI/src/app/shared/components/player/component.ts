import { Component, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy } from '@angular/core';

@Component({
    selector: 'player',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class PlayerComponent implements AfterViewInit, OnDestroy {
    @Output() closeCallback: EventEmitter<any> = new EventEmitter();
    @Output() saveHistoryCallback: EventEmitter<any> = new EventEmitter();
    @Input('inputModel') item: any;
    @ViewChild('video') videoEl: ElementRef;

    private videoPercent: Number;
    private currentTime: string;
    private duration: string;
    private timeoutId: any;
    private showControls: boolean;

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.showControls = true;
        this.timeoutId;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => {
            this.showControls = false;
        }, 1000);
    }

    constructor() {
        this.videoPercent = 0;
        this.showControls = false;
    }

    ngAfterViewInit() {
        if (this.videoEl && this.item.historyData) {
            this.videoEl.nativeElement.currentTime = this.item.historyData.duration;
        }
    }

    ngOnDestroy() {
        this.saveHistoryCallback.emit({
            item: this.item,
            totalDuration: this.videoEl.nativeElement.duration,
            duration: this.videoEl.nativeElement.currentTime
        });
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
        if (this.videoEl.nativeElement.currentTime >= this.videoEl.nativeElement.duration) {
            this.close();
        }
    }

    close() {
        this.closeCallback.emit();
    }

    playPause() {
        if (this.videoEl.nativeElement.paused) {
            this.videoEl.nativeElement.play();
        }
        else {
            this.videoEl.nativeElement.pause();
        }
    }
}