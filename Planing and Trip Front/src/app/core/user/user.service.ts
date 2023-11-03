import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, ReplaySubject, throwError} from 'rxjs';
import {catchError, map, retry, switchMap, tap} from 'rxjs/operators';
import {User} from 'app/core/user/user.types';
import {environment} from '../../../environments/environment';
import {Users} from '../../shared/model/users.types';

const usersURL = environment.apiUrl + environment.users;

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<Users> | null {
        const username = localStorage.getItem('username');
        if (!username) {
        console.log(!username);
            return throwError(new Error('Username not found in local storage')); // You can customize the error message

        }
        return this._httpClient.get<Users>(`${usersURL}/Me/${username}`).pipe(
            tap((response: any) => {
                // Store the access token in the local storage
                this._user.next(response);
            }),
            catchError((error: any) =>
                 throwError(error) // You can handle the error as needed
            ));
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
