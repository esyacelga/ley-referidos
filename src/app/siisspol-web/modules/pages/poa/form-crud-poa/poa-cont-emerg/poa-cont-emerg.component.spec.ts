import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoaContEmergComponent } from './poa-cont-emerg.component';

describe('PoaContEmergComponent', () => {
  let component: PoaContEmergComponent;
  let fixture: ComponentFixture<PoaContEmergComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoaContEmergComponent]
    });
    fixture = TestBed.createComponent(PoaContEmergComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
