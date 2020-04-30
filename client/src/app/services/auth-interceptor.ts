import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
// official feature provided by angular http client
// need export a class that implements HttpInterceptor
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // Inject the user service where the token is set 
    constructor(private userService: UserService) {}

    // needs implementation for intercept
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.userService.getToken();

        // need to clone the request first to prevent unwanted side affects 
        // clone creates a copy of the request
        const authRequest = req.clone({
            // want to edit the headers
            // I want the original headers but also set and extra header
            // set() only adds a header to the headers if that header does not exist, but will override it if it does
            // already exist
            // the authorization header needs to match the authorization header where we extract the token on the backend
            headers: req.headers.set('Authorization', "Bearer " + authToken)
        }); // can also pass a configuration to clone not only to copy, but to edit it as well


        return next.handle(authRequest);
    }
}