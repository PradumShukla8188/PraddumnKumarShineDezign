import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registrationForm!: FormGroup;
  // formData: any = {}; 
  constructor(private formBuilder: FormBuilder, private router: Router,private apiService: ApiService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [ Validators.email]],
      phone: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.apiService.signUp(this.registrationForm.value).subscribe(
        (response) => {
          console.log('Signup successful', response);
          console.log("response..........",response);
          this.router.navigate(['/otp']);
        },
        (error) => {
          console.error('Signup failed', error);
          
        }
      );
    } else {
      this.markFormGroupTouched(this.registrationForm);
    }
  }
  get f(): { [key: string]: AbstractControl } {
    // console.log(this.registrationForm.controls);
    return this.registrationForm.controls;
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
