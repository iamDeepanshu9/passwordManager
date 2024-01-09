import {Component, Input, OnInit} from '@angular/core';
import {MatTabChangeEvent} from "@angular/material/tabs";
import {Router} from "@angular/router";
import {ApiHandleService} from "../../services/api-handle.service";
import {Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-uploaded-screen',
  templateUrl: './uploaded-screen.component.html',
  styleUrls: ['./uploaded-screen.component.css']
})
export class UploadedScreenComponent implements OnInit {

  constructor(private router: Router, private apiHandleService: ApiHandleService) { }
  @Input() data: any[] = []; // Replace YourDataModel with the actual name of your data model

  displayedColumns: string[] = ['PasswordType', 'Password', 'Url', 'Name', 'CreatedDate', 'ModifiedDate', 'actions'];

  dataSource: MatTableDataSource<any>;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.filterData());
    this.apiHandleService.getNewData$().subscribe((res)=>{
      if(res){
        console.log(res);
        this.data.push(res);
        this.dataSource = new MatTableDataSource(this.filterData());
      }
    })
  }

  filterData(): any[] {
    // Exclude columns based on conditions
    return this.data.filter(item => item?.IsAdmin || !item?.LoginUserID);
  }



  togglePassword(element: any): void {
    element.showPassword = !element.showPassword;
  }

  deleteRow(element: any): void {
    const index = this.dataSource.data.indexOf(element);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); // Update the data source
    }
  }
}
