import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class MoviesService {
    private httpService: any;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    getMoviesData(successFn) {
        this.httpService.requestExternal('https://demo2697834.mockable.io/movies', 'GET', 'json', null, null, (response) => {
            if (successFn) {
                successFn(response);
            }
        }, (error) => {
            console.log(error);
        });
    }
}