import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoCreateComponent } from './foto-create.component';

describe('FotoCreateComponent', () => {
  let component: FotoCreateComponent;
  let fixture: ComponentFixture<FotoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FotoCreateComponent]
    });
    fixture = TestBed.createComponent(FotoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
