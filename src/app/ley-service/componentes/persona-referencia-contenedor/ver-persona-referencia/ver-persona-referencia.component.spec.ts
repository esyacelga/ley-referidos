import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPersonaReferenciaComponent } from './ver-persona-referencia.component';

describe('VerPersonaReferenciaComponent', () => {
  let component: VerPersonaReferenciaComponent;
  let fixture: ComponentFixture<VerPersonaReferenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerPersonaReferenciaComponent]
    });
    fixture = TestBed.createComponent(VerPersonaReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
