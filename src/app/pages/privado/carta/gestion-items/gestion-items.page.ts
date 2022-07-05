import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ShareService } from 'src/app/services/share.servies';
import { DataServiceItemCarta } from '../data-service/data.service.item-carta';
import { ItemCartaModel } from '../models/item-carta.model';

@Component({
  selector: 'carta-gestion-items',
  templateUrl: './gestion-items.page.html',
  styleUrls: ['./gestion-items.page.scss'],
})
export class GestionItemsPage implements OnInit {
  key: string;
  title: string;

  isModalOpen: boolean;


  lstItemCarta : ItemCartaModel[] = [];

  item : ItemCartaModel = null;


  formGroup: FormGroup;

  isloading : boolean = false;


  constructor(
    private router: Router,
    private shareService: ShareService,
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dataServiceItemCarta: DataServiceItemCarta,
    public alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    

    this.key=this.activatedroute.snapshot.paramMap.get("key");
    this.title=this.activatedroute.snapshot.paramMap.get("title");

    this.shareService.changedTitleMenu.next('Carta');

    this.crearForm();

  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalController.dismiss();
  }

  ionViewWillEnter() {
    this.getItemsCarta();
  }


  crearForm(){
    this.formGroup = this.formBuilder.group({     
      id: new FormControl(''),
      titulo: new FormControl('', Validators.compose([Validators.required,])),
      descripcion: new FormControl(''),
      disponible: new FormControl('', Validators.compose([Validators.required,])),
      motivoprecio: new FormControl(''),    
      precio: new FormControl('', Validators.compose([Validators.required,])),    
      motivoprecio1: new FormControl(''),    
      precio1: new FormControl(''),    
    });

    this.clearForm();
  }


  clearForm(){
    this.formGroup.controls['titulo'].setValue('');
    this.formGroup.controls['descripcion'].setValue('');
    this.formGroup.controls['motivoprecio'].setValue('');
    this.formGroup.controls['motivoprecio1'].setValue('');
    this.formGroup.controls['precio'].setValue('');
    this.formGroup.controls['precio1'].setValue('');
    this.formGroup.controls['disponible'].setValue(true);
  }

  getItemsCarta(){

    this.isloading = true;

    this.dataServiceItemCarta.getItemCarta(this.key).then(lst =>{
      this.isloading = false;

      lst.forEach(item => {
        item['mostarTituloPrecio'] = item.titulo + (item.motivoprecio ? ' (' + item.motivoprecio + ')' : '');

        if(item.motivoprecio1){

          var tmp = '';
          tmp=tmp.padStart(item.titulo.length+6,'\xa0');
          tmp+='(' + item.motivoprecio1 + ')';


          item['mostarTituloPrecio1'] =tmp;

        }


      });
      this.lstItemCarta = lst

    });
  }


  asignObjToForm(item){
    this.formGroup.controls['id'].setValue(item.id);
    this.formGroup.controls['titulo'].setValue(item.titulo);
    this.formGroup.controls['descripcion'].setValue(item.descripcion);


    this.formGroup.controls['motivoprecio'].setValue(item.motivoprecio);
    this.formGroup.controls['motivoprecio1'].setValue(item.motivoprecio1);

    this.formGroup.controls['precio'].setValue(item.precio);
    this.formGroup.controls['precio1'].setValue(item.precio1);
    this.formGroup.controls['disponible'].setValue(item.disponible);
  }


  add(){
    let newItem  = new ItemCartaModel();    
    newItem.disponible=true;
    newItem.descripcion='';
    newItem.motivoprecio='';
    newItem.motivoprecio1='';
    this.asignObjToForm(newItem);
    this.isModalOpen = true;
  }

  update(item){
    this.asignObjToForm(item);
    this.isModalOpen = true;
  }


  async borrar(){
    const alert = await this.alertController.create({
      header: '¿Desea borrar el elemento seleccionado?',
      message: 'Va a borrar un elemento ',
      buttons: [ {
        text: 'Cancelar',
        role: 'Cancelar',
        cssClass: 'secondary',
      },
      {
        text: 'Borrar',
        handler: () => {
          this.dataServiceItemCarta.remove(this.formGroup.value,this.key).then(()=>
          {
            this.isModalOpen = false;
            this.clearForm();
            this.getItemsCarta();
          })
        },
      },],
    });

    await alert.present();
  }


  submit(){
    if(!this.formGroup.valid){
      alert('Debe rellenar todos los campos');
    }
    else{
      this.dataServiceItemCarta.saveItemNew(this.formGroup.value, this.key).then(()=>
      {
        this.isModalOpen = false;
        this.clearForm();
        this.getItemsCarta();
      }
      );

    }

  }

}
