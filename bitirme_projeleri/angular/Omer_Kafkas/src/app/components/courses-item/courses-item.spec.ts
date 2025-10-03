import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesItem } from './courses-item';
import { globalTestConfig } from '../../../test-setup';

describe('CoursesItem', () => {
	let component: CoursesItem;
	let fixture: ComponentFixture<CoursesItem>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CoursesItem],
			providers: [...globalTestConfig.providers]
		}).compileComponents();

		fixture = TestBed.createComponent(CoursesItem);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
