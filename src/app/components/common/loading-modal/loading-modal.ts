import { Component } from '@angular/core';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';

@Component({
  selector: 'app-loading-modal',
  imports: [LoadingSpinner],
  templateUrl: './loading-modal.html',
  styleUrl: './loading-modal.scss',
})
export class LoadingModal {}
