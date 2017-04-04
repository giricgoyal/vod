import { Component, Inject, OnInit } from '@angular/core';
import { HttpService, AuthenticationService } from '../../shared';
import { APP_CONFIG } from '../../shared';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./component.scss']
})

export class LoginComponent implements OnInit {
    data = {
        phonenumber: '',
        password: ''
    };

    private httpService: HttpService;
    private authService: AuthenticationService;
    private showLoader: boolean;
    private title: string;

    constructor(httpService: HttpService, authService: AuthenticationService) {
        this.httpService = httpService;
        this.authService = authService;
        this.showLoader = false;
        if (this.authService.isAuthenticated()) {
            this.authService.redirectAfterAuth();
        }
    }

     ngOnInit() {
        this.title = APP_CONFIG.appTitle;
    }


    login() {
        this.showLoader = true;
        this.httpService.request('/users/login', 'POST', 'json', this.data, null, (response) => {
            console.log(response);
            this.authService.getToken(response, this.data, () => {
                this.showLoader = false;
            }, null);
        }, () => {
            this.showLoader = false;
        });
    }

    isLoginDisabled() {
        return !this.data.phonenumber || !this.data.password;
    }
}