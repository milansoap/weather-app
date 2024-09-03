import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { WeatherAPIResponse } from 'src/app/models/WeatherAPIResponse';
import { WeatherAPIServiceService } from 'src/app/services/weather-apiservice.service';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {

  weatherData: WeatherAPIResponse | null = null;
  loading: boolean = true;
  dateFetched: string = moment().format('DD.MM.YYYY [ob] HH:mm');
  currentTemperature: number = 0;

  constructor(private weatherService: WeatherAPIServiceService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getLoadingStatus();
    this.getServiceData();
  }

  // Loading service is acting as a store
  // Store for state
  getLoadingStatus(): void {
    this.loadingService.loading$.subscribe(isLoading => {
      this.loading = isLoading;
    });
  }

  getServiceData() {
    this.loadingService.setLoading(true);  // Start loading

    this.weatherService.getWeatherData().subscribe(data => {
      if (data) {
        console.log(data)
          this.currentTemperature = data.list[0].main.temp
      }
      
      this.weatherData = data;

      this.loadingService.setLoading(false);
    });

  }

  // formatTimestamp(timestamp: number): string {
  //   return moment.unix(timestamp).format('DD.MM.YYYY [ob] HH:mm');
  // }
}