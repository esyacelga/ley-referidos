import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionDenunciaComponent } from './descripcion-denuncia.component';

describe('DescripcionDenunciaComponent', () => {
  let component: DescripcionDenunciaComponent;
  let fixture: ComponentFixture<DescripcionDenunciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescripcionDenunciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescripcionDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
