import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanel } from './admin-panel';

describe('AdminPanel', () => {
  let component: AdminPanel;
  let fixture: ComponentFixture<AdminPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
