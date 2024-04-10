import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { Report } from '../report';

@Component({
  selector: 'app-reportdata',
  templateUrl: './reportdata.component.html',
  styleUrls: ['./reportdata.component.css'] 
})
export class ReportdataComponent implements OnInit {

  reports: Report[] = []; 
  report:any ;
  constructor(private houseService: LoginServiceService, private router: Router) {}

  ngOnInit(): void {
    this.houseService.getAllReport()
      .subscribe({
        next: (response) => {
     
          this.report = response;
          this.reports = this.report.value;
         
        },
        error: (response) => {
          console.log('API Error:',response);
        }
      });
  }
}
