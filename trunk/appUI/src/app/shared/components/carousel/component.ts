import { Component, Input, OnChanges, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'carousel',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class CarouselComponent implements AfterViewInit, OnChanges {
    @Input() carouselData: any;
    @Output() itemClickCallback: EventEmitter<any> = new EventEmitter();
    @ViewChild('cardContainer') cardContainer: ElementRef;

    private containerWidth: number;
    private cardWidth: number = 207;
    private cardCount: number;
    private windowStart: number = 0;
    private showItems: any;

    constructor() {
    }

    ngOnChanges($changesObj) {
        if ($changesObj.carouselData && $changesObj.carouselData.currentValue) {
            this.initShowItems();
        }
    }

    ngAfterViewInit() {
        this.containerWidth = this.cardContainer.nativeElement.clientWidth;
        this.cardCount = Math.ceil(this.containerWidth / this.cardWidth);
        if (this.carouselData) {
            this.initShowItems();
        }
    }

    itemClick(item) {
        this.itemClickCallback.emit({item: item});
    }

    initShowItems() {
        this.showItems = [];
        let counter = 0;
        while (counter < this.cardCount) {
            let index = this.windowStart + counter;
            this.showItems.push(this.carouselData[index]);
            counter ++;
        }
    }

    scroll(val) { 
        
    }
}