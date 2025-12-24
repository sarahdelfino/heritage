import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import content from "./content.json";
import { CommonModule } from '@angular/common';
import { Contact } from "./contact/contact";

@Component({
  selector: 'app-root',
  imports: [MatCardModule, CommonModule, RouterLink, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Heritage Steel Buildings');
  contactVisible = false;
  bottomContactVisible = false;

  differences = content.difference;
  process = content.process;
  footer =  content.footer;
}
