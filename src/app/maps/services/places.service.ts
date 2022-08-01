import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapInterface, Feature } from '../interfaces/map.interface';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService
  )
  {
    this.getUserLocation();
  }

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  public async getUserLocation(): Promise<[number,number]>{
    return new Promise((resolve, reject) =>{

      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('Nose pudo obtener la geolocalización');
          console.log(err);
          reject();
        }
      );

    });
  }

  getPlacesByQuery(query: string = ''){

    if(query.length === 0){
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }

    if( !this.useLocation) throw Error('No hay userLocation')
    this.isLoadingPlaces = true;

    this.placesApi.get<MapInterface>(`/${query}.json?`, {
      params: {
        proximity: this.useLocation.join(',')
      }
    })
      .subscribe(resp => {

        this.isLoadingPlaces = false;
        this.places = resp.features;
        this.mapService.createMarkersFromPlaces(this.places, this.useLocation!)
      });
  }

  deletePlaces(){
    this.places = [];
  }

}
