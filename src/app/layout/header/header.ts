import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
