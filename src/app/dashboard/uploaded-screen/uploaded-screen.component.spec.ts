import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedScreenComponent } from './uploaded-screen.component';

describe('UploadedScreenComponent', () => {
  let component: UploadedScreenComponent;
  let fixture: ComponentFixture<UploadedScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadedScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
