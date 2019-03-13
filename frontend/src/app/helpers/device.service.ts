import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private readonly isDesktop: boolean;

  constructor() {
    this.isDesktop = window.innerWidth > 768;
  }

  public deviceIsDesktop(): boolean {
    return this.isDesktop;
  }


}
