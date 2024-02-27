import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCuentasBancariasEditComponent } from './tipo-cuentas-bancarias-edit.component';

describe('TipoCuentasBancariasEditComponent', () => {
  let component: TipoCuentasBancariasEditComponent;
  let fixture: ComponentFixture<TipoCuentasBancariasEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoCuentasBancariasEditComponent]
    });
    fixture = TestBed.createComponent(TipoCuentasBancariasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
