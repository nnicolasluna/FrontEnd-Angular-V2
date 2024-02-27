import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadesFinancierasGenericComponent } from './entidades-financieras-generic.component';

describe('EntidadesFinancierasGenericComponent', () => {
  let component: EntidadesFinancierasGenericComponent;
  let fixture: ComponentFixture<EntidadesFinancierasGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntidadesFinancierasGenericComponent]
    });
    fixture = TestBed.createComponent(EntidadesFinancierasGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
