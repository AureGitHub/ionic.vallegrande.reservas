import { NgModule, LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NewContactPage } from './new-contact/new-contact.page';
import { LoginPage } from './login/login.page';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
import { IntroPage } from './intro/intro.page';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { RolGuard } from './guard/rol.guard';
import { ShareService } from './services/share.servies';
import { CookieService } from './services/cookie.servie';

registerLocaleData(es);
@NgModule({
  declarations: [
    AppComponent, 
    NewContactPage,
    LoginPage,
    IntroPage,
  ],
    
  imports: [ 
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule ,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    
  ],
  providers: [
    RolGuard,
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    ShareService,
    CookieService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}



