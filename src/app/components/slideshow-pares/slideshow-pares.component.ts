import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PeliculaPopular } from 'src/app/interfaces/interface';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: PeliculaPopular[]= [];

  slidesOpt = {
    slidesPerView: 3.4,
    freemode: true
  }

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: number) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id }
    });

    modal.present();
  }

}
