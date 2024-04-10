import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  isLoading = signal<boolean>(false);
  public hide(): void {
    this.isLoading.set(false);
  }

  public show(): void {
    this.isLoading.set(true);
  }
}
