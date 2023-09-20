import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrudPoaComponent } from './form-crud-poa.component';

describe('FormCrudPoaComponent', () => {
  let component: FormCrudPoaComponent;
  let fixture: ComponentFixture<FormCrudPoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCrudPoaComponent]
    });
    fixture = TestBed.createComponent(FormCrudPoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
