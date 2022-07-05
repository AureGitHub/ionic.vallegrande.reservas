import { NgModule, LOCALE_ID, ErrorHandler  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { RolGuard } from './guard/rol.guard';
import { ShareService } from './services/share.servies';
import { CookieService } from './services/cookie.servie';

import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ShareCommunicationService } from './services/share-communication.servies';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalErrorHandler } from './services/global-error-handler';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';

registerLocaleData(es);   
@NgModule({
  declarations: [
    AppComponent, 
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



    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
    
  ],
  providers: [
    RolGuard,
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // { provide: ErrorHandler, useClass: GlobalErrorHandler },
    AuthService,
    ShareService,
    CookieService,
    SpeechRecognition,
    ShareCommunicationService,
    Platform,
    StatusBar,
    SplashScreen,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}



