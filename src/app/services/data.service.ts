import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots, CollectionReference, query, where, DocumentReference 
} from '@angular/fire/firestore';
import { Reserva } from '../models/reserva';
import { AuthService } from './auth.service';
import { ShareService } from './share.servies';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private shareService: ShareService 
    ) {}

  
  getReservas(): Observable<Reserva[]> {

    return  collectionData<Reserva>(
      query<Reserva>(
        collection(this.firestore, 'reservas') as CollectionReference<Reserva>,
      ), 
    );

  }

  getReservasByDate(fecha : Date): Observable<Reserva[]> {

    //const q = query(citiesRef, where("regions", "array-contains", "west_coast"));
    //const q = query(citiesRef, where('country', 'in', ['USA', 'Japan']));

    if(!fecha){
      return;
    }

    var startDay = new Date(fecha.getFullYear(),fecha.getMonth(), fecha.getDate());

    var endDay = new Date(startDay);

    endDay.setDate(endDay.getDate() + 1);
    endDay.setSeconds(-1);


    return  collectionData<Reserva>(
      query<Reserva>(
        collection(this.firestore, 'reservas') as CollectionReference<Reserva>,
        where('fecha', '>=', startDay),
        where('fecha', '<=', endDay),
      ),  {idField: 'id'}
    ) .pipe(
      map(reservas =>  reservas as Reserva[])
    );


    


  }



  getReservas2(): Observable<Reserva[]> {



    const contactsCollection = collection(this.firestore, 'reservas');

    // this method returns a stream of documents mapped to their payload and id
    return collectionData(contactsCollection)
    .pipe(
      map(reservas => reservas as Reserva[])
    );
  }

  getContactById(id: string): Observable<Contact> {
    const document = doc(this.firestore, `contacts/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Contact;
      })
    );
  }



  management(reserva: Reserva){
    
    const { id,...reserva_audit } = reserva;
    reserva_audit['cuando']=new Date();
    reserva_audit['quien']=this.authService.userLogged.email;
    
    if(reserva.id == 'new'){
      reserva.id='';
      const document = doc(collection(this.firestore, 'reservas'));     
      reserva_audit['IdReserva']=document.id;
      reserva_audit['operacion']=this.shareService.operacion_audit.alta;

      const document_audit = doc(collection(this.firestore, 'reservas_audit'));    

      return Promise.all([setDoc(document, reserva),setDoc(document_audit, reserva_audit)]);


    }
    else{
      const document = doc(this.firestore, 'reservas', reserva?.id);
      const document_audit = doc(collection(this.firestore, 'reservas_audit'));  
      reserva_audit['IdReserva']=document.id;
      reserva_audit['operacion']=this.shareService.operacion_audit.modificacion;
      const { id, ...data } = reserva; // we don't want to save the id inside the document

      return Promise.all([setDoc(document, reserva),setDoc(document_audit, reserva_audit)]);
    }


    
  }

  

  borrar(reserva: Reserva) {
    const document = doc(this.firestore, 'reservas', reserva.id);   
    const document_audit = doc(collection(this.firestore, 'reservas_audit')); 
    

    const { id,...reserva_audit } = reserva;
    reserva_audit['cuando']=new Date();
    reserva_audit['quien']=this.authService.userLogged.email;
    reserva_audit['IdReserva']=document.id;
    reserva_audit['operacion']=this.shareService.operacion_audit.borrado;

    return Promise.all([ deleteDoc(document),setDoc(document_audit, reserva_audit)]);
    
  }
}
