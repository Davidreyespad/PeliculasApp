import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula, PeliculaPopular } from '../interfaces/interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];

  peliculasPopulares: PeliculaPopular[] = [];

  constructor(private moviesService: MoviesService) {

  }

  ngOnInit() {

    this.moviesService.getFeature()
      .subscribe((resp) => {
        console.log('Resp', resp);
        this.peliculasRecientes = resp.results;
      });

    this.moviesService.getPopulares()
      .subscribe((resp) => {
        console.log('Resp', resp);
        this.peliculasPopulares = resp.results;
      });

  }

}
