import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weather: any = null;
  error: string = '';

  private apiKey = '71eac54ae033c04cbda064f05ff888e9'; 
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather() {
    if (!this.city.trim()) {
      this.error = 'Please enter a city name.';
      this.weather = null;
      return;
    }

    this.http.get(`${this.apiUrl}?q=${this.city}&appid=${this.apiKey}&units=metric`)
      .subscribe({
        next: (data: any) => {
          this.weather = data;
          this.error = '';
        },
        error: () => {
          this.error = 'City not found. Try again.';
          this.weather = null;
        }
      });
  }
}
