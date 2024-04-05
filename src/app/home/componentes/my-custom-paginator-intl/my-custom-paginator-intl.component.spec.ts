import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomPaginatorIntlComponent } from './my-custom-paginator-intl.component';

describe('MyCustomPaginatorIntlComponent', () => {
  let component: MyCustomPaginatorIntlComponent;
  let fixture: ComponentFixture<MyCustomPaginatorIntlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCustomPaginatorIntlComponent]
    });
    fixture = TestBed.createComponent(MyCustomPaginatorIntlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
