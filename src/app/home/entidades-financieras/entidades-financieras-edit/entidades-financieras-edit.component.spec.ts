import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadesFinancierasEditComponent } from './entidades-financieras-edit.component';

describe('EntidadesFinancierasEditComponent', () => {
  let component: EntidadesFinancierasEditComponent;
  let fixture: ComponentFixture<EntidadesFinancierasEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntidadesFinancierasEditComponent]
    });
    fixture = TestBed.createComponent(EntidadesFinancierasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
