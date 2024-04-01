import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-checkbox',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './input-checkbox.component.html',
  styleUrl: './input-checkbox.component.css'
})
export class InputCheckboxComponent {
  checked: boolean = false;
  @Output()
  checkedOnChange = new EventEmitter<boolean>();

  // string aleatória alfanumérica que começa com um dígito e contém caracteres alfanuméricos.
  // Garante que componentes não possuam um mesmo id
  componentId = Math.random().toString(36).substring(2);
}
