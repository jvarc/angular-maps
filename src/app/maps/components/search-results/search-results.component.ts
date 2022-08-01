import { Component, EventEmitter, Output } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Feature } from '../../interfaces/map.interface';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent{
  private debouncerTimer?: NodeJS.Timeout;
  public selectedId: string = '';

  constructor(
    private placeService: PlacesService,
    private mapService: MapService
  ) { }

  get isLoadingPlaces(){
    return this.placeService.isLoadingPlaces;
  }

  get places(){
    return this.placeService.places;
  }


  flyTo( place: Feature) {
    this.selectedId = place.id;

    const [lng, lat] = place.center;
    this.mapService.flyTo([lng , lat])
  }


  getDirections( place: Feature){
    if(!this.placeService.useLocation) throw Error('Localizacion del usuario no encontrada');

    this.placeService.deletePlaces();

    const start = this.placeService.useLocation;
    const end = place.center as [number,number];


    this.mapService.getRouteBetweenPoints(start, end);
  }


}
