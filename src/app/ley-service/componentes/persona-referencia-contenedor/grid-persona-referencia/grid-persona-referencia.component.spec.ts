import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPersonaReferenciaComponent } from './grid-persona-referencia.component';

describe('GridPersonaReferenciaComponent', () => {
  let component: GridPersonaReferenciaComponent;
  let fixture: ComponentFixture<GridPersonaReferenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridPersonaReferenciaComponent]
    });
    fixture = TestBed.createComponent(GridPersonaReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
