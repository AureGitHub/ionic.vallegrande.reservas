import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.servies';
import { ItemCartaModel } from '../models/item-carta.model';

@Component({
  selector: 'carta-gestion-items',
  templateUrl: './gestion-items.page.html',
  styleUrls: ['./gestion-items.page.scss'],
})
export class GestionItemsPage implements OnInit {
  key: string;
  title: string;

  isModalOpen: false;


  lstItemCarta : ItemCartaModel[] = [];


  formGroup: FormGroup;


  constructor(
    private router: Router,
    private shareService: ShareService,
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    

    this.key=this.activatedroute.snapshot.paramMap.get("key");
    this.title=this.activatedroute.snapshot.paramMap.get("title");

    this.shareService.changedTitleMenu.next('Carta');

    this.crearForm();
  }

  crearForm(){
    this.formGroup = this.formBuilder.group({     
      descripcion: new FormControl('', Validators.compose([Validators.required,])),
      disponible: new FormControl('', Validators.compose([Validators.required,])),
      precio: new FormControl('', Validators.compose([Validators.required,])),    
    });

    this.formGroup.controls['disponible'].setValue(false);
  }

  submit(){
    if(!this.formGroup.valid){
      alert('Debe rellenar todos los campos');
    }
    else{

    }

  }

}
