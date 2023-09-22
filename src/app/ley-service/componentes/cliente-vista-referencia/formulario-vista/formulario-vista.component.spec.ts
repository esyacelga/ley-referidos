import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioVistaComponent } from './formulario-vista.component';

describe('FormularioVistaComponent', () => {
  let component: FormularioVistaComponent;
  let fixture: ComponentFixture<FormularioVistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioVistaComponent]
    });
    fixture = TestBed.createComponent(FormularioVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
