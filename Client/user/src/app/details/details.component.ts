import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from 'src/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  constructor(private http: HttpClient, private userService: UserService) {}
  username: String = '';
  userDetails: any;

  fetchUserDetails() {
    try {
      console.log(this.username);
      this.userService.FetchDetails(this.username).subscribe((res: any) => {
        this.userDetails = res.user;
        console.log(this.userDetails);
      });
    } catch (error) {
      
      Swal.fire({ title: 'Error', text: 'Error in fetching'+error, timer: 2000 });
      
      
    }
  }
}
