import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [MatSlideToggleModule, FormsModule],
  templateUrl: './theme-switch.component.html',

})
export class ThemeSwitchComponent {
  isDarkThemeActivate = false;

constructor(@Inject(DOCUMENT) private document: Document) {}

  onChange(newValue: boolean): void{
    console.log(newValue);
    if (newValue) {
      this.document.body.classList.add('dark-mode');
    }else{
      this.document.body.classList.remove('dark-mode');
    }
  }
}
