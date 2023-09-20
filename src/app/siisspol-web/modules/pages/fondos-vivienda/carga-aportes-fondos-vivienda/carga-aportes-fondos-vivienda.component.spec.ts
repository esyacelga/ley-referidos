import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaAportesFondosViviendaComponent } from './carga-aportes-fondos-vivienda.component';

describe('CargaAportesFondosViviendaComponent', () => {
  let component: CargaAportesFondosViviendaComponent;
  let fixture: ComponentFixture<CargaAportesFondosViviendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargaAportesFondosViviendaComponent]
    });
    fixture = TestBed.createComponent(CargaAportesFondosViviendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
