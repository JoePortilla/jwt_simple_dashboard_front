import {Injectable} from '@angular/core';
import {LoginRequest} from "./login-request";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {
  }

  // BehaviorSubject
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id: 0, email: ''});

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  login(credentials: LoginRequest): Observable<User> {
    return this.http.get<User>('././assets/data.json')
               .pipe(
                 // Emit the info with BehaviorSubject
                 tap((userData: User) => {
                   this.currentUserData.next(userData);
                   this.currentUserLoginOn.next(true);
                 }),
                 // Define the error handler
                 catchError(this.handleError)
               );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('error', error.error);
    } else {
      console.error(
        'the backend returns the status code',
        error.status,
        error.error);
    }
    return throwError(() => new Error('Please try again'));
  }
}
