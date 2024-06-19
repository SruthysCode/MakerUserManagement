import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/user';

@Injectable({
  providedIn: 'root'
})
export class UserService implements User{

  constructor(private http : HttpClient) { }
  name!: String;
  email!: String;
  password!: String;

   APIBaseUrl = 'http://localhost:3000/api/user/';

   Register(details : User)
   {
    return this.http.post(this.APIBaseUrl + 'register/', details);
   }

   FetchDetails(username : String)
   {
    console.log("ft", username)
    return this.http.get(this.APIBaseUrl + `fetch?username=${username}`)
   }

}
