import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyHeritagePage } from './why-heritage-page';

describe('WhyHeritagePage', () => {
  let component: WhyHeritagePage;
  let fixture: ComponentFixture<WhyHeritagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyHeritagePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyHeritagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
