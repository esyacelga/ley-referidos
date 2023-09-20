import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraHerramientasModalComponent } from './barra-herramientas-modal.component';

describe('BarraHerramientasModalComponent', () => {
  let component: BarraHerramientasModalComponent;
  let fixture: ComponentFixture<BarraHerramientasModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraHerramientasModalComponent]
    });
    fixture = TestBed.createComponent(BarraHerramientasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
