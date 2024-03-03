import { Component, OnInit } from '@angular/core';
import {MatTabChangeEvent} from "@angular/material/tabs";
import {ActivatedRoute, Router} from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { ApiHandleService } from '../services/api-handle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public isTeacher$$= new BehaviorSubject(null)
  constructor(
    private router: Router,
    private apiHandleService: ApiHandleService,
  ) { }

  ngOnInit(): void {
   this.apiHandleService.data$$.pipe().subscribe( v => {
    this.isTeacher$$.next(v?.isTeacher);
   })
  }

}
