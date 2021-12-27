import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots, CollectionReference, query, where, DocumentReference, getDocs 
} from '@angular/fire/firestore';
import { Reserva } from '../models/reserva';
import { AuthService } from './auth.service';
import { ShareService } from './share.servies';
import { cerrarServicio } from '../models/cerrarServicio';


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




  cerrarServicio(cerrar : any){
    const document = doc(collection(this.firestore, 'cerrar_servicio'));     
    return setDoc(document, cerrar);
    
  }


  abrirServicio(cerrar : any){
    const document = doc(this.firestore, 'cerrar_servicio', cerrar.id);   
    return deleteDoc(document);
  }



  async getCerrados(fecha: Date): Promise<cerrarServicio[]> {

    var fechaSinTime = new Date(fecha.getFullYear(),fecha.getMonth(), fecha.getDate());


    return new Promise<cerrarServicio[]>(async (resolve, reject) => {
      const userRef = collection(this.firestore, 'cerrar_servicio');
      const q = query(userRef,where("fecha", "==", fechaSinTime ));
      const querySnapshot = await getDocs(q);
      let cerrados: cerrarServicio[] = [];

      querySnapshot.forEach((doc) => {
        let user = doc.data() as cerrarServicio;
        user['id']=doc.id
        cerrados.push(user);
      });
      resolve(cerrados);
    });


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
