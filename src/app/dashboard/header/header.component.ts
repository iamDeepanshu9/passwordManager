import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {Route, Router} from "@angular/router";
import {AddnewpasswordComponent} from "../addnewpassword/addnewpassword.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() public userName = "";
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.route.navigate(["auth"],{
      replaceUrl: true
    })
    this.authService.logout();
  }

  addNewPassword() {
    const d = this.dialog.open(AddnewpasswordComponent);
    d.afterClosed().pipe().subscribe((v)=>{
      console.log(v);
    })
  }
}
