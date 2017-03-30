import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'carousel',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class CarouselComponent implements OnChanges {
    @Input() carouselData: any;
    @Output() saveHistoryCallback: EventEmitter<any> = new EventEmitter();
    @Input() orderbyHistory: boolean;

    private showCards: Number;
    private firstCardIndex: Number;
    private showPlayer: boolean;
    private selectedMovie: any;

    constructor() {
        this.showCards = 5;
        this.firstCardIndex = 0;
        this.showPlayer = false;
    }

    ngOnChanges() {
        console.log(this.carouselData);
    }

    showPlayerFn(item) {
        this.selectedMovie = item;
        this.showPlayer = true;
    }

    closePlayerFn($event) {
        this.selectedMovie = undefined;
        this.showPlayer = false;
    }

    saveHistoryForVideo($event) {
        let movieId = $event.item.id;
        var obj: any = {
            duration: $event.duration,
            totalDuration: $event.totalDuration
        };

        if ($event.item.historyData) {
            obj._id = $event.item.historyData._id;
        }
        this.saveHistoryCallback.emit({movieId: movieId, obj: obj});
    }
}