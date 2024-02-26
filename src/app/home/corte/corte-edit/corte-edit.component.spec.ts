import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteEditComponent } from './corte-edit.component';

describe('CorteEditComponent', () => {
  let component: CorteEditComponent;
  let fixture: ComponentFixture<CorteEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorteEditComponent]
    });
    fixture = TestBed.createComponent(CorteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
