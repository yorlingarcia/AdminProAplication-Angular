import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  meniItems: any[];
  constructor(private sidebarService: SidebarService) {
    this.meniItems = sidebarService.menu;
  }
}
