import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule,RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  constructor(private route:Router) { }

  ngOnInit() {

  }

  @Output() fnLogout = new EventEmitter<any>();

  public logout = () => this.fnLogout.emit()

  back(){
    this.route.navigate(["/"+String(this.route.url).split('/').slice(1,String(this.route.url).split('/').length -1).join('/')])
  }
}
