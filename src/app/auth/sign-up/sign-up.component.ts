import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiHandleService } from 'src/app/services/api-handle.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public isTeacher$$  = new BehaviorSubject(false);
  public isTeacherToggleController = new FormControl(false)
  public teacher = false;
  signUpFormGroup: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiHandleService: ApiHandleService
  ) { }


  ngOnInit(): void {
    this.createForm();
    this.signUpFormGroup.valueChanges.subscribe(v => {
      console.log(v);
    })
  }
  createForm() {
    this.signUpFormGroup = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      username: ['',[Validators.required]],
      age:[''],
      cls:[''],
      password: ['',[Validators.required]],
      isTeacher:[false],
    })
  }

  signUpButtonHandle() {
    if(this.signUpFormGroup.valid){
      console.log(this.signUpFormGroup.value);
      const requestBody = this.signUpFormGroup.value
      this.apiHandleService.signUp$(requestBody).subscribe((res) => {
        if (!!res) {
          window.alert('Sign-Up SuccessFully');
          this.signUpFormGroup.reset();
        }
      }, (err) => {
        window.alert('Invalid Credentials | Something Went Wrong');
      })
    }else{
      this.signUpFormGroup.markAsTouched();
      window.alert('Fill Form Properly')
    }
  }

  navigateToLogin(){
    this.router.navigate(['/', 'auth', 'login'], {
      replaceUrl: true,
    })
  }

}
