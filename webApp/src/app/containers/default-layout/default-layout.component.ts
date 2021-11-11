import { ApiService } from './../../api/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { navItemsInt } from '../../_navInt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItemsUser;

  constructor(private router: Router, public api: ApiService) {

  }

  async ngOnInit() {
    let url = this.router.url.replaceAll("/", "**")
    let respuesta = await this.api.validateToken({ jwt: localStorage.getItem('JWT') })

    if (respuesta.tipo == 0) {
      this.navItemsUser = navItems;
    } else if (respuesta.tipo == 1) {
      this.navItemsUser = navItemsInt;
    } else {
      this.router.navigate(['/login/' + url],)
    }

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
