import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridConfigComponent } from './grid-config.component';

describe('GridConfigComponent', () => {
  let component: GridConfigComponent;
  let fixture: ComponentFixture<GridConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridConfigComponent]
    });
    fixture = TestBed.createComponent(GridConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
