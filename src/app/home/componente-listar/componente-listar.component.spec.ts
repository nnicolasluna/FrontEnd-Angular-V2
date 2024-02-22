import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteListarComponent } from './componente-listar.component';

describe('ComponenteListarComponent', () => {
  let component: ComponenteListarComponent;
  let fixture: ComponentFixture<ComponenteListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteListarComponent]
    });
    fixture = TestBed.createComponent(ComponenteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
