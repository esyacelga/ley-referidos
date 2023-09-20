import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraMigracionComponent } from './cabecera-migracion.component';

describe('CabeceraMigracionComponent', () => {
  let component: CabeceraMigracionComponent;
  let fixture: ComponentFixture<CabeceraMigracionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabeceraMigracionComponent]
    });
    fixture = TestBed.createComponent(CabeceraMigracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
