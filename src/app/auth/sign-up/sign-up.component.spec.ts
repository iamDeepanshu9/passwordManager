import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ApiHandleService } from 'src/app/services/api-handle.service';
import { of, throwError } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let apiHandleService: jasmine.SpyObj<ApiHandleService>;

  beforeEach(waitForAsync(() => {
    const apiHandleServiceSpy = jasmine.createSpyObj('ApiHandleService', ['signUp$']);

    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ApiHandleService, useValue: apiHandleServiceSpy },
        FormBuilder,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    apiHandleService = TestBed.inject(ApiHandleService) as jasmine.SpyObj<ApiHandleService>;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signUp API and show alert on successful sign-up', () => {
    // Arrange
    const signUpFormGroup = component.signUpFormGroup;
    signUpFormGroup.setValue({ username: 'testUser', email: 'test@example.com', password: 'testPassword' });

  const mockResponse = { isSuccess: true };
    apiHandleService.signUp$.and.returnValue(of(mockResponse));

    // Act
    component.signUpButtonHandle();

    // Assert
    expect(apiHandleService.signUp$).toHaveBeenCalledWith({ username: 'testUser', email: 'test@example.com', password: 'testPassword' });
    expect(window.alert).toHaveBeenCalledWith('Sign-Up SuccessFully');
    expect(signUpFormGroup.value).toEqual({ username: null, email: null, password: null }); // Assuming you reset the form
  });

  it('should show an alert on invalid credentials or error', () => {
    // Arrange
    const signUpFormGroup = component.signUpFormGroup;
    signUpFormGroup.setValue({ username: 'invalidUser', email: 'invalid@example.com', password: 'invalidPassword' });

    const mockError = new Error('Invalid credentials');
    apiHandleService.signUp$.and.returnValue(throwError(mockError));

    // Act
    component.signUpButtonHandle();

    // Assert
    expect(apiHandleService.signUp$).toHaveBeenCalledWith({ username: 'invalidUser', email: 'invalid@example.com', password: 'invalidPassword' });
    expect(window.alert).toHaveBeenCalledWith('Invalid Credentials | Something Went Wrong');
  });

  it('should show an alert on form validation error', () => {
    // Arrange
    const signUpFormGroup = component.signUpFormGroup;
    // Manually set the form in an invalid state
    signUpFormGroup.get('email').setValue('invalid-email');

    // Act
    component.signUpButtonHandle();

    // Assert
    expect(signUpFormGroup.markAsTouched).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Fill Form Properly');
  });
});

