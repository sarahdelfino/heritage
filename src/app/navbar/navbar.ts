import { Component } from '@angular/core';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase.config';
import navData from "./navData.json";

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  navLinks = navData;
  menuOpen = false;

    designButtonClicked(): void {
    logEvent(analytics, `designer_opened`);
  }

}
