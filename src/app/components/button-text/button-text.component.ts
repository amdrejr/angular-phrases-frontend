import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-text',
  standalone: true,
  imports: [],
  templateUrl: './button-text.component.html',
  styleUrl: './button-text.component.css'
})
export class ButtonTextComponent {
  @Input() type: string = "button";
}
