import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEntidadFinancieraGenericComponent } from './tipo-entidad-financiera-generic.component';

describe('TipoEntidadFinancieraGenericComponent', () => {
  let component: TipoEntidadFinancieraGenericComponent;
  let fixture: ComponentFixture<TipoEntidadFinancieraGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoEntidadFinancieraGenericComponent]
    });
    fixture = TestBed.createComponent(TipoEntidadFinancieraGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
