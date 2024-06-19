import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: String = '';
  email: String = '';
  password: String = '';
  form: any;
  registerForm: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {
    this.registerForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
    });
  }

  hasFormErrors(form: FormGroup): boolean {
    if (form.invalid) {
      return true;
    }
    return false;
  }

  register() {
    let userDetails = this.registerForm.getRawValue();
    console.log('in reg2', userDetails);
    if (
      userDetails.name === '' ||
      userDetails.email === '' ||
      userDetails.password === ''
    ) {
      Swal.fire('Please enter all the fields', 'Warning!');
    } else if (this.hasFormErrors(this.registerForm)) {
      Swal.fire('Check Inputs', 'Enter all input fields properly', 'warning');
    } else {
      this.userService.Register(userDetails).subscribe(
        (res: any) => {
          let details = res.message;
          Swal.fire({ title: 'Registered', text: details, timer: 2000 });
          this.router.navigate(['']);
        },
        (error) => {
          error.error?.error
            ? Swal.fire({
                title: 'Error',
                text: error.error.error,
                timer: 2000,
              })
            : Swal.fire({
                title: 'Error',
                text: 'Error in registering',
                timer: 2000,
              });
        }
      );
    }
  }
}
