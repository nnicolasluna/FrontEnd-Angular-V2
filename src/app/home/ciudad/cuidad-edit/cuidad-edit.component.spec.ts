import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuidadEditComponent } from './cuidad-edit.component';

describe('CuidadEditComponent', () => {
  let component: CuidadEditComponent;
  let fixture: ComponentFixture<CuidadEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuidadEditComponent]
    });
    fixture = TestBed.createComponent(CuidadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
