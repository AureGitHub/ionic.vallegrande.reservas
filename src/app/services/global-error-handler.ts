import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";



@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private zone: NgZone) { }

  handleError(error: Error) {


   
   

    this.zone.run(() => {
      console.error(error);

      alert(error.message);

     
    });

  }
}
