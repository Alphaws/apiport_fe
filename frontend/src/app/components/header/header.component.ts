import { Component } from '@angular/core';
import {LanguageSelectorComponent} from '../language-selector/language-selector.component';
import {TranslatePipe} from '../../pipes/translate.pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    LanguageSelectorComponent,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected userMenuOpen: boolean = false;
  protected mobileMenuOpen: boolean = false;

  protected isAuthenticated() {
    return false;
  }

  protected toggleUserMenu() {

  }

  protected avatarUrl() {
    return false;
  }

  protected getUserInitials() {
    return "";
  }

  protected userDisplayName() {
    return "";
  }

  protected navigateToProfile() {

  }

  protected currentUser() {

  }

  protected navigateToAdmin() {

  }

  protected logout() {

  }

  protected toggleMobileMenu() {

  }

  protected closeMobileMenu() {

  }
}
