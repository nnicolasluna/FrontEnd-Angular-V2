import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuidadFormGenericComponent } from './cuidad-form-generic.component';

describe('CuidadFormGenericComponent', () => {
  let component: CuidadFormGenericComponent;
  let fixture: ComponentFixture<CuidadFormGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuidadFormGenericComponent]
    });
    fixture = TestBed.createComponent(CuidadFormGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
