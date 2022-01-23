import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { filter, Observable } from "rxjs";
import { MEAT_API } from "src/app/app.api";
import { User } from "./user.model";
import { tap } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";

@Injectable()
export class LoginService{

    user: User
    lastUrl: string

    constructor(private http: HttpClient, private router: Router){
        this.router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        )
        .subscribe( e => {this.lastUrl = e.url})
    }

    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<User>{
        return this.http.post<User>(`${MEAT_API}/login`, 
        {email: email, password: password}).pipe(
            tap(user => this.user = user)
        )
    }

    handleLogin(path: string = this.lastUrl){
        this.router.navigate(['/login', btoa(`${path}`)])
    }

    logout(){
        this.user = undefined!
    }

}