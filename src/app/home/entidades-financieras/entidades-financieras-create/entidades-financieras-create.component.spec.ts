import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadesFinancierasCreateComponent } from './entidades-financieras-create.component';

describe('EntidadesFinancierasCreateComponent', () => {
  let component: EntidadesFinancierasCreateComponent;
  let fixture: ComponentFixture<EntidadesFinancierasCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntidadesFinancierasCreateComponent]
    });
    fixture = TestBed.createComponent(EntidadesFinancierasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
