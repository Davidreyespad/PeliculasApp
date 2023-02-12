import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from '../../interfaces/interface';
import { MoviesService } from '../../services/movies.service';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  @Input() id: any;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };

  constructor(private moviesService: MoviesService, //Guardamos peliculas aquí
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService) { }

  async ngOnInit() {
    // console.log('ID', this.id );

    const existe = await this.dataLocal.existePelicula(this.id);

    console.log("Detalle Component: ", existe);

    if (existe) {
      this.estrella = 'star';
    }

    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe(resp => {
        console.log(resp);
        this.pelicula = resp;
      });

    this.moviesService.getActoresPelicula(this.id)
      .subscribe(resp => {
        console.log(resp);
        this.actores = resp.cast;
      });

  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    if (this.dataLocal.guardarPelicula(this.pelicula)) {
      this.estrella = 'star';
    } else {
      this.estrella = 'star-outline';
    }
  }

  /*   async presentToast() {
      const toast = await this.toastController.create({
        message: 'Esta película ha sido agregada a tus favoritos',
        duration: 1500
      });
      await toast.present();
  
      this.dataLocal.guardarPelicula(this.pelicula);
  
    } */


}