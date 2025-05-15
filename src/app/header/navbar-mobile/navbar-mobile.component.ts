import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-mobile',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.css',
})
export class NavbarMobileComponent {
  navItems = input.required<{ en: string; de: string; id: string }[]>();
  navStatusMobile = output<boolean>();
  showNav = input.required<boolean>();

  selectedPage() {
    this.navStatusMobile.emit(!this.showNav());
  }
}
