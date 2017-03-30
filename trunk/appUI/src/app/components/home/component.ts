import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared';

@Component({
    selector: 'home',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class HomeComponent implements OnInit {
    private moviesService: any;
    private moviesData: any;
    private showLoader: boolean;
    private selectedItem: any;

    constructor(moviesService: MoviesService) {
        this.moviesService = moviesService;
        this.showLoader = false;
    }

    ngOnInit() {
        this.getMoviesData();
    }

    itemSelectCallback($event) {
        this.selectedItem = $event.item;
    }

    closePlayerFn($event) {
        this.selectedItem = undefined;
    }

    getMoviesData() {
        this.showLoader = true;
        this.moviesService.getMoviesData((response) => {
            this.showLoader = false;
            this.moviesData = response;
        }, (err) => {
            this.showLoader = false;
        });
    }

    saveHistoryCallback($event) {
        let movieId = $event.item.id;
        var obj: any = {
            duration: $event.duration,
            totalDuration: $event.totalDuration
        };

        if ($event.item.historyData) {
            obj._id = $event.item.historyData._id;
        }
        
        this.moviesService.saveHistory(movieId, obj, () => {
            this.getMoviesData();
        });
    }
}