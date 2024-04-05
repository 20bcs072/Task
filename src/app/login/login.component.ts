import { Component } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = { username: '', password: '' };
 
  constructor(private authService: LoginServiceService, private router:Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        alert("login Success") 
        this.router.navigate(['lazy']);
      },
      error: (error) => {

        alert('Invalid username or password');
      
      }
    });
  }

}

