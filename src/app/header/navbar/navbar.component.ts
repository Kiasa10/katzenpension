import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  navItems = output<{de: string, en: string, id: string}[]>();
  showNav = input.required<boolean>();
  navStatus = output<boolean>();


  navigationItems = [
    {de: "Home", en:"home", id: uuid()},
    {de: "Zimmer", en:"rooms", id: uuid()},
    {de: "Stammgäste", en:"guests", id: uuid()},
    {de: "Gästebuch", en:"guestbook", id: uuid()},
    {de: "Buchen", en:"booking", id: uuid()},
    {de: "FAQ", en:"faq", id: uuid()}
  ]


  clickBurger(){
    this.navItems.emit(this.navigationItems);
    this.navStatus.emit(!this.showNav());
  }

}
