import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { WeatherAPIResponse } from '../models/WeatherAPIResponse';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIServiceService {

  // The api url is fixed here
  // We should always load the api key from the environmental variable
  // But I left this like this so you can open this and test without wasting too much time :)
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/forecast?lat=46.5547&lon=15.6459&units=metric&appid=d8c1781c80195784538574f8b0459e16';

  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<WeatherAPIResponse> {
    return this.http.get<WeatherAPIResponse>(this.apiUrl).pipe(
      catchError(error => {
        // It depends how we want to handle the response
        // For example we can add a toast to notify the user something went wrong
        console.error('Error fetching weather data', error);
        return throwError(() => new Error('Failed to fetch weather data. Please try again later.'));
      })
    );
  }
  

}
