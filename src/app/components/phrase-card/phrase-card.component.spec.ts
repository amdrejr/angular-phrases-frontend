import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhraseCardComponent } from './phrase-card.component';

describe('PhraseCardComponent', () => {
  let component: PhraseCardComponent;
  let fixture: ComponentFixture<PhraseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhraseCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhraseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
