import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { WeatherAPIResponse, WeatherListItem } from 'src/app/models/WeatherAPIResponse';
import { WeatherAPIServiceService } from 'src/app/services/weather-apiservice.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AverageTemperature } from 'src/app/models/AverageTemperature';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {

  weatherData: WeatherAPIResponse | null = null;
  loading: boolean = true;
  dateFetched: string = moment().format('DD.MM.YYYY [ob] HH:mm');

  cityName: string = '';
  currentTemperature: number = 0;
  cityPopulation: number = 0;

  averageTemperatures: AverageTemperature[] = [];

  constructor(private weatherService: WeatherAPIServiceService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getLoadingStatus();
    this.getServiceData(false);
  }

  // Loading service is acting as a store
  // Store for state
  getLoadingStatus(): void {
    this.loadingService.loading$.subscribe(isLoading => {
      this.loading = isLoading;
    });
  }

  calculateAverageTemperatures(weatherList: WeatherListItem[]): AverageTemperature[] {
    const tempDataByDate: { [date: string]: number[] } = {};
  
    weatherList.forEach(item => {
      // Get the date part from dt_txt
      const date = item.dt_txt.split(' ')[0];
      if (!tempDataByDate[date]) {
        tempDataByDate[date] = [];
      }
      tempDataByDate[date].push(item.main.temp);
    });
  
    const averageTemps: AverageTemperature[] = Object.keys(tempDataByDate).map(date => {
      const temps = tempDataByDate[date];
      let totalTemp = 0;
  
      // Sum up the temperatures 
      for (let i = 0; i < temps.length; i++) {
        totalTemp += temps[i];
      }
  
      // Get average temperature
      const averageTemp = totalTemp / temps.length;
  
      return {
        date,
        averageTemp: parseFloat(averageTemp.toFixed(2)) // Rounded to two decimal places
      };
    });
  
    return averageTemps;
  }
  
 
  getServiceData(forceRefresh: boolean) {
    // Check if we need to force a refresh (e.g., from the refresh button)
    this.loadingService.setLoading(true);

    if (forceRefresh) {
        this.fetchWeatherData();  // Force an API call
        return;
    } else {
        // Load cached data first, if available
        const cachedData = localStorage.getItem('weatherData');

        if (cachedData) {
            console.log('Loaded from local storage')
            const parsedData: WeatherAPIResponse = JSON.parse(cachedData);
            this.weatherData = parsedData;
            this.currentTemperature = parsedData.list[0].main.temp;
            this.cityName = parsedData.city.name;
            this.cityPopulation = parsedData.city.population;
            this.averageTemperatures = this.calculateAverageTemperatures(parsedData.list);
            this.loadingService.setLoading(false);

        } else {
            // No cached data, fetch fresh data
            // Just one more recheck
            this.fetchWeatherData();
        }
    }
    

}

// This function fetchs the data from API
fetchWeatherData() {

    this.weatherService.getWeatherData().subscribe(data => {

      if (data) {
          console.log('Data refreshed via button or we didnt have anything stored in local storage');
          this.currentTemperature = data.list[0].main.temp;
          this.cityName = data.city.name;
          this.cityPopulation = data.city.population;

          // Save new data to localStorage
          localStorage.setItem('weatherData', JSON.stringify(data));
      }

      this.weatherData = data;
      this.averageTemperatures = this.calculateAverageTemperatures(data.list);
      this.loadingService.setLoading(false);

  });
}


// We make a new request to refresh the data
refreshData(): void {
  this.dateFetched = moment().format('DD.MM.YYYY [ob] HH:mm');
  this.getServiceData(true);
}

    
}