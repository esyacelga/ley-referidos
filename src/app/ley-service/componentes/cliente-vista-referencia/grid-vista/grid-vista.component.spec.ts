import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridVistaComponent } from './grid-vista.component';

describe('GridVistaComponent', () => {
  let component: GridVistaComponent;
  let fixture: ComponentFixture<GridVistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridVistaComponent]
    });
    fixture = TestBed.createComponent(GridVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
