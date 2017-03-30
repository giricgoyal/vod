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

    constructor(moviesService: MoviesService) {
        this.moviesService = moviesService;
        this.showLoader = false;
    }

    ngOnInit() {
        this.getMoviesData();
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
        this.moviesService.saveHistory($event.movieId, $event.obj, () => {
            this.getMoviesData();
        });
    }
}