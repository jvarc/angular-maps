import { Component, AfterViewInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Feature, MapInterface } from '../../interfaces/map.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private debouncerTimer?: NodeJS.Timeout;

  public placesQuery!: Feature[];


  constructor(private placesService: PlacesService) { }

  onQueryChanged(query: string){

    if(this.debouncerTimer) clearTimeout(this.debouncerTimer)

    this.debouncerTimer = setTimeout(()=>{

     this.placesService.getPlacesByQuery(query)

    }, 500)
  }
}
