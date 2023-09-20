import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrudActividadComponent } from './form-crud-actividad.component';

describe('FormCrudActividadComponent', () => {
  let component: FormCrudActividadComponent;
  let fixture: ComponentFixture<FormCrudActividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCrudActividadComponent]
    });
    fixture = TestBed.createComponent(FormCrudActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
