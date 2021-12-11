import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NewContactPage } from './new-contact/new-contact.page';
import { LoginPage } from './login/login.page';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
import { IntroPage } from './intro/intro.page';
import { ReservaDiaPage } from './tabs/reservas-dia/reservas-dia.page';

@NgModule({
  declarations: [
    AppComponent, 
    NewContactPage,
    LoginPage,
    IntroPage,
    ReservaDiaPage
  ],
    
  imports: [ 
    MbscModule,  
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}



