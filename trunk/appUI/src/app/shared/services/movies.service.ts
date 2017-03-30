import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class MoviesService {
    private httpService: any;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    getMoviesData(successFn, errorFn) {
        this.httpService.request('/movies', 'GET', 'json', null, null, (response) => {
            if (successFn) {
                successFn(response);
            }
        }, (error) => {
            if (errorFn) {
                errorFn(error);
            }
        });
    }

    getOnlyMoviesWithHistoryData(successFn, errorFn) {
        this.httpService.request('/movies/history', 'GET', 'json', null, null, (response) => {
            if (successFn) {
                successFn(response);
            }
        }, (error) => {
            if (errorFn) {
                errorFn(error);
            }
        });
    }

    saveHistory(movieId, obj, successFn) {
        this.httpService.request(`/movies/history/${movieId}`, 'POST', 'json', obj, null, (response) => {
            if (successFn) {
                successFn();
            }
        }, (error) => {
            console.log(error);
        });
    }
}