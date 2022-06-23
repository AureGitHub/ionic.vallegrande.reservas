import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie.servie';

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
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });

    let email = this.cookieService.getCookie('VALLEGRANDE_EMAIL');
    let password = this.cookieService.getCookie('VALLEGRANDE_PASSWORD');

    this.validations_form.controls['email'].setValue(email);
    this.validations_form.controls['password'].setValue(password);

    // this.validations_form.controls['email'].setValue('reservas@vallegrande.es');
    // this.validations_form.controls['password'].setValue('vallegrandeZZ');
  }



  tryLogin(value){
    this.loading = true;
     this.authService.login(value.email + '@vallegrande.es', value.password)
     .then(data=>
      {

        this.cookieService.setCookie('VALLEGRANDE_EMAIL', value.email,10000);
        this.cookieService.setCookie('VALLEGRANDE_PASSWORD', value.password,10000);

        if(!data){
          this.router.navigateByUrl('/privado/reservas', { replaceUrl: true });
        }
        else{
          alert(data);
          this.loading = false;
        }
        
      })
      .catch(error => {
        this.loading = false;
        alert(error);
      });
  }

  clickSelect($event){
    var obj=$event.target as HTMLInputElement;
    obj.select();
  }


}
