import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextComponent } from '../../../../components/input-text/input-text.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    InputTextComponent,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

}
