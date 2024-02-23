import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteFormComponent } from './componente-form.component';

describe('ComponenteFormComponent', () => {
  let component: ComponenteFormComponent;
  let fixture: ComponentFixture<ComponenteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteFormComponent]
    });
    fixture = TestBed.createComponent(ComponenteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
