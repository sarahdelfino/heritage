import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import content from "../content.json";

@Component({
  selector: 'app-faq',
  imports: [MatExpansionModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
faq = content.faq;
}
