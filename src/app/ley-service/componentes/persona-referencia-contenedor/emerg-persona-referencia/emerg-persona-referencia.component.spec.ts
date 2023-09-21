import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergPersonaReferenciaComponent } from './emerg-persona-referencia.component';

describe('EmergPersonaReferenciaComponent', () => {
  let component: EmergPersonaReferenciaComponent;
  let fixture: ComponentFixture<EmergPersonaReferenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmergPersonaReferenciaComponent]
    });
    fixture = TestBed.createComponent(EmergPersonaReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
