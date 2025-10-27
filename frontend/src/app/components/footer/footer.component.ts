import { Component } from '@angular/core';
import {TranslatePipe} from '../../pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [
    TranslatePipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected currentYear: number = new Date().getFullYear();
  protected version: string = '0.1.0'

}
