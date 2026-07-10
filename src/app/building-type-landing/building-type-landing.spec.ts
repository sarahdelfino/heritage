import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingTypeLanding } from './building-type-landing';

describe('BuildingTypeLanding', () => {
  let component: BuildingTypeLanding;
  let fixture: ComponentFixture<BuildingTypeLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingTypeLanding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingTypeLanding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
