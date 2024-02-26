import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCorteEditComponent } from './tipo-corte-edit.component';

describe('TipoCorteEditComponent', () => {
  let component: TipoCorteEditComponent;
  let fixture: ComponentFixture<TipoCorteEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoCorteEditComponent]
    });
    fixture = TestBed.createComponent(TipoCorteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
