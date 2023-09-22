import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteVistaReferenciaComponent } from './cliente-vista-referencia.component';

describe('ClienteVistaReferenciaComponent', () => {
  let component: ClienteVistaReferenciaComponent;
  let fixture: ComponentFixture<ClienteVistaReferenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteVistaReferenciaComponent]
    });
    fixture = TestBed.createComponent(ClienteVistaReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
