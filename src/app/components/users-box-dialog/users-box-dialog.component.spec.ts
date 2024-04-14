import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBoxDialogComponent } from './users-box-dialog.component';

describe('UsersBoxDialogComponent', () => {
  let component: UsersBoxDialogComponent;
  let fixture: ComponentFixture<UsersBoxDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersBoxDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersBoxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
