import { Component, OnInit } from '@angular/core';
import { Home } from '../home';
import { Title } from '@angular/platform-browser';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  formGroup!: FormGroup;

  addItemRequest:Home={

    id:0,
    title:'',
    price:0,
    author:'',
    edition:0,
    publishedDate:new Date()
    
  };

formSubmitted = false;
constructor(private productService:LoginServiceService,private router:Router,private formBuilder: FormBuilder){}

ngOnInit(): void {
  this.formGroup = this.formBuilder.group({
    contactInfo: this.formBuilder.group({
      title: [''],
      price: [''],
      author: [''],
    edition: [''],
    publishedDate: ['']
    })
  });
}
createProduct()
{
  console.log(this.addItemRequest.publishedDate);
this.productService.addProduct(this.addItemRequest)
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
