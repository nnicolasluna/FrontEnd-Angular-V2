import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroEditComponent } from './genero-edit.component';

describe('GeneroEditComponent', () => {
  let component: GeneroEditComponent;
  let fixture: ComponentFixture<GeneroEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneroEditComponent]
    });
    fixture = TestBed.createComponent(GeneroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
