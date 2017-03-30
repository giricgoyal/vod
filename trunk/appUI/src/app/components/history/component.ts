import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared';

@Component({
    selector: 'history',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class HistoryComponent implements OnInit {
    private moviesService: any;
    private moviesData: any;
    private showLoader: boolean;

    constructor(moviesService: MoviesService) {
        this.moviesService = moviesService;
        this.showLoader = false;
    }

    ngOnInit() {
        this.getOnlyMoviesWithHistoryData();
    }

    getOnlyMoviesWithHistoryData() {
        this.showLoader = true;
        this.moviesService.getOnlyMoviesWithHistoryData((response) => {
            this.showLoader = false;
            this.moviesData = this.sort(response);
        }, (err) => {
            this.showLoader = false;
        });
    }

    sort(arr) {
        let sortedArr = arr.sort((a,b) => {
            let da = new Date(a.historyData.updatedOn);
            let db = new Date(b.historyData.updatedOn);
            if (da.getTime() > db.getTime()) {
                return -1;
            }
            if (da.getTime() < db.getTime()) {
                return 1;
            }
            return 0;
        });
        return sortedArr;
    }

    saveHistoryCallback($event) {
        this.moviesService.saveHistory($event.movieId, $event.obj, () => {
            this.getOnlyMoviesWithHistoryData();
        });
    }
}