import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  loading: boolean;

  validation_messages = {
   'email': [
     { type: 'required', message: 'El email es obligatorio.' },
     { type: 'pattern', message: 'Por favor, entre el email.' }
   ],
   'password': [
     { type: 'required', message: 'La contraseña es obligatoria.' },
     { type: 'minlength', message: 'La contraseña tiene que tener al menos 5 carácteres.' }
   ]
 };

  constructor(
   private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });

    this.validations_form.controls['email'].setValue('reservas@vallegrande.es');
    this.validations_form.controls['password'].setValue('vallegrandeZZ');
  }

  tryLogin(value){
    this.loading = true;
     this.authService.login(value.email, value.password)
     .then(data=>
      {
        setTimeout(() => {                           
          this.router.navigateByUrl('/tabs', { replaceUrl: true })
        }, 100);
        
      })
      .catch(error => {
        this.loading = false;
        alert(error);
      });
  }
}
