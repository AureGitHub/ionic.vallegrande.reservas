import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots, CollectionReference, query, where 
} from '@angular/fire/firestore';
import { Reserva } from '../models/reserva';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) {}

  
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


    var startDay = new Date(fecha.getFullYear(),fecha.getMonth(), fecha.getDate());

    var endDay = new Date(startDay);

    endDay.setDate(endDay.getDate() + 1);
    endDay.setSeconds(-1);


    return  collectionData<Reserva>(
      query<Reserva>(
        collection(this.firestore, 'reservas') as CollectionReference<Reserva>,
        where('fecha', '>=', startDay),
        where('fecha', '<=', endDay),
      ), 
    ) .pipe(
      map(reservas => reservas as Reserva[])
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

  createReserva(reserva: Reserva): Promise<void> {
    const document = doc(collection(this.firestore, 'reservas'));
    return setDoc(document, reserva);
  }

  updateContact(contact: Contact): Promise<void> {
    const document = doc(this.firestore, 'contacts', contact?.id);
    const { id, ...data } = contact; // we don't want to save the id inside the document
    return setDoc(document, data);
  }

  deleteContact(id: string): Promise<void> {
    const document = doc(this.firestore, 'contacts', id);
    return deleteDoc(document);
  }
}
