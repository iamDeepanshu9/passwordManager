import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ApiHandleService } from 'src/app/services/api-handle.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserLoginResponseData } from '../auth.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiHandleService: jasmine.SpyObj<ApiHandleService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const apiHandleServiceSpy = jasmine.createSpyObj('ApiHandleService', ['login$', 'setUser$']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ApiHandleService, useValue: apiHandleServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    apiHandleService = TestBed.inject(ApiHandleService) as jasmine.SpyObj<ApiHandleService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login API and navigate to dashboard on successful login', () => {
    // Arrange
    const loginFormGroup = component.loginFormGroup;
    loginFormGroup.setValue({ username: 'testUser', password: 'testPassword' });

    const mockResponse = {  username: 'testUser', password: 'testPassword'  };
    apiHandleService.login$.and.returnValue(of(mockResponse));

    // Act
    component.loginButtonHandle();

    // Assert
    expect(apiHandleService.login$).toHaveBeenCalledWith({ username: 'testUser', password: 'testPassword' });
    expect(authService.login).toHaveBeenCalled();
    expect(apiHandleService.setUser$).toHaveBeenCalledWith(mockResponse);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard'], { replaceUrl: true });
    expect(window.alert).toHaveBeenCalledWith('Login SuccessFully');
    expect(loginFormGroup.value).toEqual({ username: null, password: null }); // Assuming you reset the form
  });

  it('should show an alert on invalid credentials or error', () => {
    // Arrange
    const loginFormGroup = component.loginFormGroup;
    loginFormGroup.setValue({ username: 'invalidUser', password: 'invalidPassword' });

    const mockError = new Error('Invalid credentials');
    apiHandleService.login$.and.returnValue(throwError(mockError));

    // Act
    component.loginButtonHandle();

    // Assert
    expect(apiHandleService.login$).toHaveBeenCalledWith({ username: 'invalidUser', password: 'invalidPassword' });
    expect(window.alert).toHaveBeenCalledWith('Invalid Credentials | Something Went Wrong');
  });
});

