import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewpasswordComponent } from './addnewpassword.component';

describe('AddnewpasswordComponent', () => {
  let component: AddnewpasswordComponent;
  let fixture: ComponentFixture<AddnewpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewpasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
