import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html'
})

export class LogOutComponent {

  constructor(private router: Router) {

    localStorage.clear()
    this.router.navigate(['/login'])
  }
  ngOnInit() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

}
