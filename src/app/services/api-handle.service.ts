import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, combineLatest, map, mapTo, Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserLoginRequestBody, UserLoginResponseData} from "../auth/auth.interface";


const API_USERS_URL = `${environment.apiUrl}Account`;
const GetAuthTokens = () => {
  return {
    "content-type": "application/json; charset=utf-8",
  }
}

@Injectable({
  providedIn: 'root',
})
export class ApiHandleService {
  public data$$ = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
  }

  login$(loginBody: any): Observable<any> {
    let reqHeader = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<any>('https://localhost:7272/api/Account/login',loginBody,{headers:reqHeader}) as Observable<any>;
  }

  signUp$(signUpRequestBody: any): Observable<any> {
    let reqHeader = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<any>('https://localhost:7272/api/Account/RegisterUser', signUpRequestBody,{headers:reqHeader}) as Observable<any>;
  }

  userData$(){
    let reqHeader = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<any>(API_USERS_URL,{headers:reqHeader});
  }

  setUser$(data: any){
    this.data$$.next(data);
  }

}
