import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadesFinancierasListComponent } from './entidades-financieras-list.component';

describe('EntidadesFinancierasListComponent', () => {
  let component: EntidadesFinancierasListComponent;
  let fixture: ComponentFixture<EntidadesFinancierasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntidadesFinancierasListComponent]
    });
    fixture = TestBed.createComponent(EntidadesFinancierasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
