import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { DrawerModule } from 'primeng/drawer';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-company-navbar',
  imports: [Menu, RouterLink, DrawerModule, Button],
  templateUrl: './company-navbar.html',
  styleUrl: './company-navbar.scss',
})
export class CompanyNavbar implements OnInit {
  items: MenuItem[] | undefined;
  visible: boolean = false;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: './',
      },
    ];
  }
}
