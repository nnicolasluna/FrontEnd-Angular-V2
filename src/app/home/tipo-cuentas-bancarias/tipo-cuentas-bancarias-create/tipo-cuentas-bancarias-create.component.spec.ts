import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCuentasBancariasCreateComponent } from './tipo-cuentas-bancarias-create.component';

describe('TipoCuentasBancariasCreateComponent', () => {
  let component: TipoCuentasBancariasCreateComponent;
  let fixture: ComponentFixture<TipoCuentasBancariasCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoCuentasBancariasCreateComponent]
    });
    fixture = TestBed.createComponent(TipoCuentasBancariasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
