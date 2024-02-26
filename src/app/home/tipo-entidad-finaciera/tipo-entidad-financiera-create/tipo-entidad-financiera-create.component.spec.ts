import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEntidadFinancieraCreateComponent } from './tipo-entidad-financiera-create.component';

describe('TipoEntidadFinancieraCreateComponent', () => {
  let component: TipoEntidadFinancieraCreateComponent;
  let fixture: ComponentFixture<TipoEntidadFinancieraCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoEntidadFinancieraCreateComponent]
    });
    fixture = TestBed.createComponent(TipoEntidadFinancieraCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
