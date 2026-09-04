import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<{ userName: string; password: string }>();
 
  showPassword = false;
 
  loginForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [true]
  });
 
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
 
  closeModal(): void {
    this.close.emit();
  }
 
  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { userName, password } = this.loginForm.value;
    this.loginSuccess.emit({ userName, password });
  }
 
  loginWithGoogle(): void {
    // hook up Google OAuth flow here
  }
 
  loginWithFacebook(): void {
    // hook up Facebook OAuth flow here
  }
 
  goToSignup(): void {
    // navigate to sign-up page / toggle modal
  }
}
