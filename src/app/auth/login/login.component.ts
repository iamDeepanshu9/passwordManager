import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiHandleService } from '../../services/api-handle.service';
import { UserLoginRequestBody } from '../auth.interface';
import * as events from 'events';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private apiHandleService: ApiHandleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginFormGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  navigateToSignUp() {
    this.router.navigate(['/', 'auth', 'signup'], {
      replaceUrl: true,
    });
  }

  loginButtonHandle() {
    // this.authService.login();
    // this.router.navigate(['/', 'dashboard', 'student'], {
    //   replaceUrl: true,
    // });
    // console.log(this.loginFormGroup.value);
    // this.loginFormGroup.reset();
    if (this.loginFormGroup.valid) {
      const requestBody = this.loginFormGroup.value;

      this.apiHandleService.login$(requestBody).pipe().subscribe((res) => {
        console.log(res);
        if (res) {
          this.authService.login();
          this.authService.setIsTeacher(res?.isTeacher);
          this.apiHandleService.setUser$(res);
          this.router.navigate(['/', 'dashboard'], {
            replaceUrl: true,
          })
          window.alert('Login SuccessFully');
          this.loginFormGroup.reset();
        }
      }, (err) => {
        window.alert('Invalid Credentials | Something Went Wrong');
      })
    }
  }
}
