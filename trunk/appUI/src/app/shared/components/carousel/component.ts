import { Component, Input, OnChanges, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

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
    private selectedItem: any;
    private keyboardEv: boolean = false;

    @HostListener('window:keydown', ['$event'])
    keyboardEvent(event: KeyboardEvent) {
        if (!this.keyboardEv) {
            this.selectedItem = {
                index: this.windowStart,
                item: this.carouselData[this.windowStart]
            };
        }
        
        this.keyboardEv = true;

        const leftArrow = 37;
        const rightArrow = 39;
        const returnKey = 13;

        if (event.keyCode == leftArrow) {
            this.selectNextItem(-1);
        }
        else if (event.keyCode == rightArrow) {
            this.selectNextItem(1);
        }
        else if(event.keyCode == returnKey) {
            this.itemClick(this.selectedItem.item);
        }
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.keyboardEv = false;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.ngAfterViewInit();
        this.initShowItems();
    }

    constructor() {
    }

    ngOnChanges($changesObj) {
        if ($changesObj.carouselData && $changesObj.carouselData.currentValue) {
            this.initShowItems();
            this.selectedItem = {
                index: this.windowStart,
                item: this.carouselData[this.windowStart]
            };
        }
    }

    ngAfterViewInit() {
        this.containerWidth = this.cardContainer.nativeElement.clientWidth;
        this.cardCount = Math.ceil(this.containerWidth / this.cardWidth);
    }

    itemClick(item) {
        this.itemClickCallback.emit({item: item});
    }

    initShowItems() {
        this.showItems = [];
        let counter = 0;
        while (counter < this.cardCount) {
            let index = this.windowStart + counter >= this.carouselData.length ? (this.windowStart + counter) % this.carouselData.length  : this.windowStart + counter;
            this.showItems.push(this.carouselData[index]);
            counter ++;
        }
    }

    calculateWindowStart(val) {
        this.windowStart = this.windowStart + val;
        if (this.windowStart >= this.carouselData.length) {
            this.windowStart = 0;
        }
        else if (this.windowStart < 0) {
            this.windowStart = this.carouselData.length - 1;
        }
    }

    scroll(val) { 
        this.calculateWindowStart(val);
        this.initShowItems();
    }

    selectNextItem(val) {
        var index =  this.selectedItem.index + val > this.carouselData.length - 1 ? 0 : this.selectedItem.index + val;
        
        if (index < this.windowStart) {
            this.scroll(val);
            if (index < 0){ 
            index = this.windowStart;
            }
        }
        else if (index >= this.windowStart + this.cardCount - 1) {
            this.scroll(val);
        }
        this.selectedItem = {
            index: index,
            item: this.carouselData[index]
        };
    }
}