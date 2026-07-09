import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { Navbar } from "./navbar/navbar";
import content from "./content.json";
import { analytics } from './firebase.config';
import { logEvent } from 'firebase/analytics';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [MatCardModule, RouterLink, Navbar, Home, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  footer =  content.footer;

      footerButtonClicked(log: string): void {
    logEvent(analytics, log);
  }
}
