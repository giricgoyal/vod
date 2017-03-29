import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'carousel',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class CarouselComponent implements OnChanges {
    @Input() carouselData: any;

    private showCards: Number;
    private firstCardIndex: Number

    constructor() {
        this.showCards = 5;
        this.firstCardIndex = 0;
    }

    ngOnChanges() {
        console.log(this.carouselData);
    }
}