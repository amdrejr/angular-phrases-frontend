import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListForYouComponent } from './list-for-you.component';

describe('ListForYouComponent', () => {
  let component: ListForYouComponent;
  let fixture: ComponentFixture<ListForYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListForYouComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListForYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
