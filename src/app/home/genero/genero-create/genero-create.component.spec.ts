import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroCreateComponent } from './genero-create.component';

describe('GeneroCreateComponent', () => {
  let component: GeneroCreateComponent;
  let fixture: ComponentFixture<GeneroCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneroCreateComponent]
    });
    fixture = TestBed.createComponent(GeneroCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
