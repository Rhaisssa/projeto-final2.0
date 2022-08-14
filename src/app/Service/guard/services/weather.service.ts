import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  [x: string]: any;
  constructor(private http: HttpClient) {}

  getWeatherForecast() {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position);
        },
        (error) => {
          observer.error(error);
        }
      );
    }).pipe(
      map((value: any) => {
        return new HttpParams()
          .set('lon', value.coords.longitude)
          .set('lat', value.coords.latitude)
          .set('units', 'metric')
          .set('apikey', 'c3be33ba6ce3be7e8a3b17db53dca319');
      }),
      switchMap((values) => {
        return this.http.get(
          'https://api.openweathermap.org/data/2.5/forecast',
          { params: values }
        );
      })
    );
  }
}
