import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Comments } from './comments';
import { globalTestConfig } from '../../../test-setup';

describe('Comments', () => {
  let component: Comments;
  let fixture: ComponentFixture<Comments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comments],
      providers: [...globalTestConfig.providers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Comments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
