import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCorteGenericComponent } from './tipo-corte-generic.component';

describe('TipoCorteGenericComponent', () => {
  let component: TipoCorteGenericComponent;
  let fixture: ComponentFixture<TipoCorteGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoCorteGenericComponent]
    });
    fixture = TestBed.createComponent(TipoCorteGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
