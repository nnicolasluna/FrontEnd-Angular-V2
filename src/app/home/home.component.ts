import {MatExpansionModule} from '@angular/material/expansion';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  panelOpenState = false;
  sidebarVisible = true; 
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  sidenav(){
    this.sidebarVisible=false
  }
  
}
