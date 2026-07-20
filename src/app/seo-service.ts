import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import seoData from './seoData.json';

interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  robots?: string;
}

type SeoData = Record<string, SeoConfig>;

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);

  private readonly siteUrl = 'https://heritagesteelbuilds.com';
  private readonly defaultImage = '/header-load.webp';

  private readonly data = seoData as SeoData;

  updateSeo(key: string, path: string): void {
    const config = this.data[key];

    if (!config) {
      console.warn(`No SEO data found for key: ${key}`);
      return;
    }

    const canonicalUrl = this.createAbsoluteUrl(path);
    const imageUrl = this.createAbsoluteUrl(
      config.image ?? this.defaultImage
    );

    this.titleService.setTitle(config.title);

    this.updateNameTag('description', config.description);
    this.updateNameTag('robots', config.robots ?? 'index, follow');

    this.updatePropertyTag('og:type', 'website');
    this.updatePropertyTag('og:site_name', 'Heritage Steel Buildings');
    this.updatePropertyTag('og:title', config.title);
    this.updatePropertyTag('og:description', config.description);
    this.updatePropertyTag('og:url', canonicalUrl);
    this.updatePropertyTag('og:image', imageUrl);

    this.updateCanonicalUrl(canonicalUrl);
  }

  private updateNameTag(name: string, content: string): void {
    this.metaService.updateTag(
      { name, content },
      `name="${name}"`
    );
  }

  private updatePropertyTag(property: string, content: string): void {
    this.metaService.updateTag(
      { property, content },
      `property="${property}"`
    );
  }

  private updateCanonicalUrl(url: string): void {
    let canonical = this.document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);
  }

  private createAbsoluteUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) {
      return path;
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${this.siteUrl}${normalizedPath}`;
  }
}