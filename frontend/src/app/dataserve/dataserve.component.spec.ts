import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataserveComponent } from './dataserve.component';

describe('DataserveComponent', () => {
  let component: DataserveComponent;
  let fixture: ComponentFixture<DataserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataserveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
