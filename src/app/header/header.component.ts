import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent, RouterLink, NavbarMobileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  navItems: { de: string; en: string; id: string }[] = [];
  showNav = false;

  getNavItems(navItems: { de: string; en: string; id: string }[]) {
    this.navItems = navItems;
  }
  getNavStatus(navStatus: boolean) {
    this.showNav = navStatus;
  }
  getNavStatusMobile(navStatus: boolean) {
    this.showNav = navStatus;
  }
}
