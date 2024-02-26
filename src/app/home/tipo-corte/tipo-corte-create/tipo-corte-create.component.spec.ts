import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCorteCreateComponent } from './tipo-corte-create.component';

describe('TipoCorteCreateComponent', () => {
  let component: TipoCorteCreateComponent;
  let fixture: ComponentFixture<TipoCorteCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoCorteCreateComponent]
    });
    fixture = TestBed.createComponent(TipoCorteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
