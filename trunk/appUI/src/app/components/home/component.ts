import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared';

@Component({
    selector: 'home',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class HomeComponent implements OnInit {
    private moviesService: any;
    private moviesList: any;

    constructor(moviesService: MoviesService) {
        this.moviesService = moviesService;
    }

    ngOnInit() {
        this.moviesService.getMoviesData((response) => {
            this.moviesList = response.entries;
        });
    }
}