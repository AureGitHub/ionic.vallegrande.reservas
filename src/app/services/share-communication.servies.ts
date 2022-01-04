import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShareCommunicationService {

  private subjectTareasCount = new Subject<any>();

  TareasCountGet(): Observable<any> {
    return this.subjectTareasCount.asObservable();
  }

  TareasCountSend(obj: any) {
    this.subjectTareasCount.next(obj);
  }
}
