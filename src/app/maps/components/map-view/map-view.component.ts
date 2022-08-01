import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})

export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElemnt!: ElementRef;

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) { }

  ngAfterViewInit(): void {

    if(!this.placesService.useLocation)
     throw Error('No hay placesService.userLocation')

    const map = new mapboxgl.Map({
      container: this.mapDivElemnt.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.placesService.useLocation, // starting position [lng, lat]
      zoom: 16, // starting zoom
      //projection: 'globe' // display the map as a 3D globe
    });

    const popup = new Popup()
    .setHTML(`
      <h6>Aqui esotoy</h6>
      <span>Estoy en este lugar del mundo</span>
    `);

    new Marker({color: 'red'})
      .setLngLat(this.placesService.useLocation!)
      .setPopup(popup)
      .addTo(map)

    this.mapService.setMap(map);


  }





}
