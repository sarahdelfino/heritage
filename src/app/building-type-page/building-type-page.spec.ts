import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingTypePage } from './building-type-page';

describe('BuildingTypePage', () => {
  let component: BuildingTypePage;
  let fixture: ComponentFixture<BuildingTypePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingTypePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
