import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaReferenciaContenedorComponent } from './persona-referencia-contenedor.component';

describe('PersonaReferenciaContenedorComponent', () => {
  let component: PersonaReferenciaContenedorComponent;
  let fixture: ComponentFixture<PersonaReferenciaContenedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaReferenciaContenedorComponent]
    });
    fixture = TestBed.createComponent(PersonaReferenciaContenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
