import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-text',
  standalone: true,
  imports: [],
  templateUrl: './button-text.component.html',
  styleUrl: './button-text.component.css'
})
export class ButtonTextComponent {
  @Input() type: string = "button";
  @Output() onClick = new EventEmitter<void>();

  emitEvent(): void {
    this.onClick.emit();
  }
}
