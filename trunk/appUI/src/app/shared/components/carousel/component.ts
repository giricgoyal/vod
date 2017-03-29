import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'carousel',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class CarouselComponent implements OnChanges {
    @Input() carouselData: any;

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
        console.log(item.title);
        this.selectedMovie = item;
        this.showPlayer = true;
    }

    closePlayerFn($event) {
        this.selectedMovie = undefined;
        this.showPlayer = false;
    }
}