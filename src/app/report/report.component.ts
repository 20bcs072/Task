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
    reportID:0,
    fromDate:new Date(),
    toDate: new Date(),
    reportStatus: ''
  };

  formSubmitted = false;
  constructor(private productService:LoginServiceService,private router:Router,private formBuilder: FormBuilder){}
  ngOnInit(): void {

    }
    
    addReport()
    {
   
      //console.log(this.addRequest)
      this.productService.addReport(this.newreport)
      .subscribe({
        next:(logistics)=>
        {
          //alert('Product created successfully');
          // this.toast.success({detail:"Success Message",summary:"Product added successfully",duration:5000})
          console.log(logistics);
           this.router.navigate(['reportdata']);
         
         
        },
        error:(response)=>
        {
          // this.toast.info({detail:"Error Message",summary:"Enter a different package id",duration:5000})
          console.log(response);
        }
      })
    }
   
  // }
  // addreport(){

    
  //   console.log("console"+this.newreport)
  //   this.productService.addReport(this.newreport)
  //   .subscribe({
  //     next:(home)=>
  //     {
  //       alert("Report was added successfully.")
  //       this.router.navigate(['reportdata']);
  //       console.log(home);
  //     },
  //     error:(response)=>
  //     {
  //       alert("To date should be greater than From date!!")
  //       console.log(response);
  //     }
  //   })
  // }

   

}
