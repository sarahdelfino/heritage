import { Component } from '@angular/core';
import content from "../content.json";

@Component({
  selector: 'app-process',
  imports: [],
  templateUrl: './process.html',
  styleUrl: './process.scss',
})
export class Process {
steps = content.steps;
}
