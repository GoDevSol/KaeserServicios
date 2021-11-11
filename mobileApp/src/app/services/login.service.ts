import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  APIURL = "https://godevsol.tech/api/";
  constructor() { }

  loginUser(credentials) {
    console.log(credentials)
    return fetch(this.APIURL + "login/login.php", {
      method: "POST",
      body: JSON.stringify({
        user: credentials.user,
        password: credentials.password
      })
    }).then(res => { return res.json() })
  }


}
