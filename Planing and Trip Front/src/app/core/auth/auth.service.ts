import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {UserService} from 'app/core/user/user.service';
import {environment} from '../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ApiService} from '../../shared/service/api.service';
import {Users} from '../../shared/model/users.types';

const helper = new JwtHelperService();

const usersURL = environment.apiUrl + environment.users;
const authURL = environment.apiUrl + environment.auth;

@Injectable()
export class AuthService {
    decodedToken: any;
        private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem(environment.accessToken, token);
    }

    get accessToken(): string {
        return localStorage.getItem(environment.accessToken) ?? '';
    }

    set setUser(user) {
        localStorage.setItem(environment.users, user);

        // this._userService.get();
    }

    get getUser(): Users {
        return JSON.parse(localStorage.getItem(environment.users)) ?? null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        return this._httpClient.post(`${environment.apiUrl}login`, credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.access_token;
                this.decodedToken = helper.decodeToken(this.accessToken);
                localStorage.setItem('username', this.decodedToken.sub);
                const user = this._userService.get();
                user.subscribe((res) => {
                    this.setUser = JSON.stringify(res);
                });
                // Set the authenticated flag to true
                this._authenticated = true;
                // Store the user on the user service

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this._httpClient.get(`${authURL}/refresh-access-token`).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.access_token;
                this.decodedToken = helper.decodeToken(this.accessToken);
                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = this.decodedToken.sub;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem(environment.accessToken);
        localStorage.removeItem(environment.users);
        localStorage.removeItem(environment.username);

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user): Observable<any> {
        return this._httpClient.post(`${ApiService.apiVersion}${ApiService.apiUser}/sign-up`, user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return of(true);
    }
}
