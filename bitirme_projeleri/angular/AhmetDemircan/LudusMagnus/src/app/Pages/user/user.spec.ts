import { ComponentFixture, TestBed } from '@angular/core/testing';

import { User } from './user';

describe('User', () => {
  let component: User;
  let fixture: ComponentFixture<User>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [User]
    })
    .compileComponents();

    fixture = TestBed.createComponent(User);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
