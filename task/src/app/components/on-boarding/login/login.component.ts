import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm!:FormGroup;
constructor(private formBuilder: FormBuilder, private router: Router,private apiService: ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.apiService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('login successful', response);
          console.log("response..........",response);
          // this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Login failed', error);
          
        }
      );
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }
  get f(): { [key: string]: AbstractControl } {
    // console.log(this.registrationForm.controls);
    return this.loginForm.controls;
}
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }


}
