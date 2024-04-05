import { Component, OnInit } from '@angular/core';
import { Home } from '../home';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Report } from '../report';
import { report } from 'process';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{

  formGroup!: FormGroup;

  newreport:Report={
    fromDate:new Date(),
    toDate: new Date(),
    ReportStatus: ''
  };

  formSubmitted = false;
  constructor(private productService:LoginServiceService,private router:Router,private formBuilder: FormBuilder){}
  ngOnInit(): void {
    // this.addreport();
    this.formGroup=this.formBuilder.group({
      reportInfo: this.formBuilder.group({
        fromDate:[''],
        toDate:[''],
        ReportStatus:['']
      })
    });
   
  }
  addreport(){
    alert("Report was added successfully.")
    console.log("console"+this.newreport)
    this.productService.addReport(this.newreport)
    .subscribe({
      next:(home)=>
      {
        this.router.navigate(['lazy']);
        console.log(home);
      },
      error:(response)=>
      {
        console.log(response);
      }
    })
  }


}
