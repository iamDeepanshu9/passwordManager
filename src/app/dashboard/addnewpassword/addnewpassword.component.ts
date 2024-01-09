import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiHandleService} from "../../services/api-handle.service";

@Component({
  selector: 'app-addnewpassword',
  templateUrl: './addnewpassword.component.html',
  styleUrls: ['./addnewpassword.component.css']
})
export class AddnewpasswordComponent implements OnInit {
public form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddnewpasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private apiHandleService: ApiHandleService,
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      ID: [Math.random()], // assuming you want to set the ID to 1
      PasswordType: ['', Validators.required],
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      Url: [''],
      Name: [''],
      CreatedDate: [new Date().toISOString().slice(0,10)],
      ModifiedDate: [new Date().toISOString().slice(0,10)],
      LoginUserName: ['admin'],
      LoginUserID: [101],
      IsAdmin: [true],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      const response = {...this.form.value}
      this.dialogRef.close(response);
      this.apiHandleService.uploadData$(response);
    }
  }
}
