import { Component } from '@angular/core';

@Component({
  selector: 'app-resources',
  standalone: true,
  templateUrl: './resources-page.html',
  styleUrl: './resources-page.scss',
})
export class ResourcesPage {
  selectedCategory = 'All';

  categories = [
    'All',
    'Planning',
    'Cost',
    'Engineering',
    'Building Types',
    'Maintenance',
    'Financing',
  ];

  articles = [
    {
      title: 'How Much Does a Steel Building Cost?',
      category: 'Cost',
      description:
        'A practical look at the factors that affect steel building pricing.',
      image: '/article-cost.jpg',
      link: '/resources/steel-building-cost',
    },
    {
      title: 'What to Know Before Buying a Steel Building',
      category: 'Planning',
      description:
        'Questions to answer before choosing your building size, layout, and features.',
      image: '/article-buying.jpg',
      link: '/resources/buyers-guide',
    },
    {
      title: 'Do Steel Buildings Need Engineering?',
      category: 'Engineering',
      description:
        'Why engineering matters for local codes, wind loads, snow loads, and intended use.',
      image: '/article-engineering.jpg',
      link: '/resources/steel-building-engineering',
    },
    {
      title: 'Choosing the Right Workshop Size',
      category: 'Building Types',
      description:
        'How to think through width, length, height, storage, equipment, and future needs.',
      image: '/article-workshop.jpg',
      link: '/resources/workshop-size-guide',
    },
    {
      title: 'Steel Buildings vs. Wood Buildings',
      category: 'Planning',
      description:
        'A simple comparison of durability, maintenance, cost, and long-term value.',
      image: '/article-steel-vs-wood.jpg',
      link: '/resources/steel-vs-wood-buildings',
    },
    {
      title: 'What Affects Metal Building Timelines?',
      category: 'Planning',
      description:
        'Understand the steps that can affect how long your building project takes.',
      image: '/article-timeline.jpg',
      link: '/resources/metal-building-timeline',
    },
  ];

  guides = [
    {
      title: 'Cost Guide',
      icon: 'payments',
      description:
        'Understand the major factors that influence pricing and project budgets.',
      link: '/resources/cost-guide',
    },
    {
      title: 'Buyer’s Guide',
      icon: 'menu_book',
      description:
        'Learn what to consider before choosing a custom steel building.',
      link: '/resources/buyers-guide',
    },
    {
      title: 'FAQs',
      icon: 'help',
      description:
        'Get quick answers to common questions about planning and buying.',
      link: '/resources/faqs',
    },
    {
      title: 'Downloads',
      icon: 'download',
      description:
        'Find brochures, color charts, warranty information, and spec sheets.',
      link: '/resources/downloads',
    },
  ];

  get filteredArticles() {
    if (this.selectedCategory === 'All') {
      return this.articles;
    }

    return this.articles.filter(
      article => article.category === this.selectedCategory
    );
  }

  contactButtonClicked(source: string): void {
    console.log('Contact clicked:', source);

    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}