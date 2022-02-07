import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

import { FIREBASE_API_KEY } from '../../environment'

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
            email: email,
            password: password,
            returnSecureToken: true
        })
    }
}