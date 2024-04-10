import { Component, OnInit } from '@angular/core';
import { Home } from '../home';
import { Title } from '@angular/platform-browser';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      title: ['', Validators.required],
      price: ['', Validators.required],
      author: ['', Validators.required],
      edition: ['', Validators.required],
      publishedDate: ['', Validators.required]
    })
  });
}
createProduct()
{
  
  if (
    !this.addItemRequest.title ||
    !this.addItemRequest.price ||
    !this.addItemRequest.author ||
    !this.addItemRequest.edition ||
    !this.addItemRequest.publishedDate
  ) {
    alert('Error: Please fill in all fields.');
    return;
  }

  console.log(this.addItemRequest.publishedDate);
this.productService.addProduct(this.addItemRequest)
.subscribe({
  next:(home)=>
  {
    console.log('Product was added successfully.')
    this.router.navigate(['lazy']);
    console.log(home);
  },
  error:(response)=>
  {
    console.log('Failed to add a product')
    console.log(response);
  }
})
}
 }
