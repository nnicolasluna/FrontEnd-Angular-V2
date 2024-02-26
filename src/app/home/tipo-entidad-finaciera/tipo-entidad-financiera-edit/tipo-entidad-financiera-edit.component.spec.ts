import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEntidadFinancieraEditComponent } from './tipo-entidad-financiera-edit.component';

describe('TipoEntidadFinancieraEditComponent', () => {
  let component: TipoEntidadFinancieraEditComponent;
  let fixture: ComponentFixture<TipoEntidadFinancieraEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoEntidadFinancieraEditComponent]
    });
    fixture = TestBed.createComponent(TipoEntidadFinancieraEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
