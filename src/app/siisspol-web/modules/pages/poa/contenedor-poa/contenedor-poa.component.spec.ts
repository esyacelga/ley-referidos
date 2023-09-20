import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorPoaComponent } from './contenedor-poa.component';

describe('ContenedorPoaComponent', () => {
  let component: ContenedorPoaComponent;
  let fixture: ComponentFixture<ContenedorPoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenedorPoaComponent]
    });
    fixture = TestBed.createComponent(ContenedorPoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
