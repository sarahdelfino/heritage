import { Component } from '@angular/core';
import { Process } from "../process/process";

@Component({
  selector: 'app-why-heritage',
  standalone: true,
  templateUrl: './why-heritage-page.html',
  styleUrl: './why-heritage-page.scss',
  imports: [Process],
})
export class WhyHeritagePage {
  perks = [
    {
      title: 'Made in USA',
      icon: 'usa.svg',
    },
    {
      title: 'Engineered for Local Codes',
      icon: 'shield.svg',
    },
    {
      title: 'Premium Steel',
      icon: 'steel.svg',
    },
    {
      title: 'Financing Available',
      icon: 'finance.svg',
    },
    {
      title: '5-Year Limited Warranty',
      icon: 'medal.svg',
    },
  ];

  partnerSteps = [
    'Consultation',
    'Custom Design',
    'Engineering',
    'Fabrication',
    'Delivery',
    'Installation',
  ];

  engineeringItems = [
    {
      title: 'Wind Loads',
      description: 'Designed with local wind requirements in mind.',
    },
    {
      title: 'Snow Loads',
      description: 'Engineered for regional roof load requirements.',
    },
    {
      title: 'Local Codes',
      description: 'Plans developed around applicable building standards.',
    },
    {
      title: 'Intended Use',
      description: 'Configured for how the building will actually be used.',
    },
  ];

  qualityCards = [
    {
      title: 'Premium Steel',
      icon: 'construction',
      description:
        'Built with high-quality structural steel designed for long-term performance.',
    },
    {
      title: 'Durable Finishes',
      icon: 'shield',
      description:
        'Protective finishes help resist weather, wear, and corrosion over time.',
    },
    {
      title: 'Precision Fabrication',
      icon: 'architecture',
      description:
        'Manufactured with accuracy for a cleaner fit during installation.',
    },
  ];

  processSteps = [
    {
      id: 1,
      title: 'Consultation',
      description: 'Tell us about your building, property, and goals.',
    },
    {
      id: 2,
      title: 'Design',
      description: 'We help develop a building that fits your needs.',
    },
    {
      id: 3,
      title: 'Engineering',
      description: 'Plans are prepared for your location and use case.',
    },
    {
      id: 4,
      title: 'Fabrication',
      description: 'Your steel building package is manufactured.',
    },
    {
      id: 5,
      title: 'Delivery',
      description: 'Materials arrive ready for the installation phase.',
    },
    {
      id: 6,
      title: 'Construction',
      description: 'Complete your project with confidence.',
    },
  ];

  buildingTypes = [
    {
      title: 'Aircraft Hangars',
      link: '/building-types/aircraft-hangars',
      image: '/hangar.png',
    },
    {
      title: 'Commercial Buildings',
      link: '/building-types/commercial-buildings',
      image: '/commercial.jpg',
    },
    {
      title: 'Agricultural Buildings',
      link: '/building-types/agricultural-buildings',
      image: '/roger-starnes-agricultural-building.jpg',
    },
    {
      title: 'RV & Boat Storage',
      link: '/building-types/rv-boat-storage',
      image: '/rv-storage.png',
    },
    {
      title: 'Workshops',
      link: '/building-types/workshops',
      image: '/ex3.png',
    },
    {
      title: 'Barndominiums',
      link: '/building-types/residential-buildings',
      image: 'steven-van-elk-residential.jpg',
    },
  ];

  expectations = [
    {
      title: 'Clear Communication',
      description: 'You will know what is happening and what comes next.',
    },
    {
      title: 'Transparent Pricing',
      description: 'A clearer process helps reduce surprises along the way.',
    },
    {
      title: 'Reliable Partners',
      description: 'Support from experienced professionals from start to finish.',
    },
    {
      title: 'Long-Term Value',
      description: 'A building designed to serve your needs for generations.',
    },
  ];

  contactButtonClicked(source: string): void {
    console.log('Contact clicked:', source);

    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}