import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEntidadFinancieraListComponent } from './tipo-entidad-financiera-list.component';

describe('TipoEntidadFinancieraListComponent', () => {
  let component: TipoEntidadFinancieraListComponent;
  let fixture: ComponentFixture<TipoEntidadFinancieraListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoEntidadFinancieraListComponent]
    });
    fixture = TestBed.createComponent(TipoEntidadFinancieraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
