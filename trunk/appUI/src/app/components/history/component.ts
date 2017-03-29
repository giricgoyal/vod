import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared';

@Component({
    selector: 'history',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class HistoryComponent implements OnInit {
    private moviesService: any;

    constructor(moviesService: MoviesService) {
        this.moviesService = moviesService;
    }

    ngOnInit() {
        this.moviesService.getMoviesData();
    }
}