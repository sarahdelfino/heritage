import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import content from '../content.json';

@Component({
  selector: 'app-building-type-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './building-type-landing.html',
  styleUrl: './building-type-landing.scss',
})
export class BuildingTypeLanding {
  buildingTypes = content.buildings;

  useCases = [
    {
      title: 'Storing vehicles, equipment, or inventory',
      description:
        'Garages, workshops, agricultural buildings, and commercial buildings can all be configured around access, storage, and interior clearance.',
    },
    {
      title: 'Protecting aircraft or specialty assets',
      description:
        'Aircraft hangars and large-span buildings can be designed around door openings, clear height, and operational needs.',
    },
    {
      title: 'Expanding business or farm operations',
      description:
        'Commercial and agricultural steel buildings provide flexible space for operations, storage, production, and future growth.',
    },
    {
      title: 'Creating a mixed-use structure',
      description:
        'Barndominiums, workshops, and custom steel buildings can combine living, working, and storage areas in one structure.',
    },
  ];

  contactButtonClicked(source: string): void {
    console.log('Contact clicked:', source);

    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}