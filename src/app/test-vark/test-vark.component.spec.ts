import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestVarkComponent } from './test-vark.component';

describe('TestVarkComponent', () => {
  let component: TestVarkComponent;
  let fixture: ComponentFixture<TestVarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestVarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestVarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
