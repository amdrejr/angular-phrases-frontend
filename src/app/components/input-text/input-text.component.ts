import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css'
})
export class InputTextComponent {
  @Input({required: true})
  type:"text" | "email" | "username" | "password" | "number" = 'text';
  @Input()
  ico: string = '';
  @Input()
  label: string = '';
  @Output()
  valueOnChange = new EventEmitter<string>();
  value: string = '';

  componentId = Math.random().toString(36).substring(2);
}
