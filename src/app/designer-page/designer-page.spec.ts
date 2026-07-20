import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerPage } from './designer-page';

describe('DesignerPage', () => {
  let component: DesignerPage;
  let fixture: ComponentFixture<DesignerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignerPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
