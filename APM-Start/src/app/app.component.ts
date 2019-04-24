import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading: boolean = true;
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }
  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }
  constructor(
    private authService: AuthService, 
    private router: Router,
    private messageService: MessageService) { 
    this.router.events.subscribe(
      (routerEvent: Event)=>
      {
        this.checkRouterEvent(routerEvent);
      }
    )
  }
  hideMessages(): void{
    this.router.navigate([
      {
        outlets: {
          popup: null
        }
      }
    ])
    this.messageService.isDisplayed = false;
  }
  displayMessages() : void{
    this.router.navigate([
      {
        outlets: {
          popup: ['messages']
        }
      }
    ])
    this.messageService.isDisplayed = true;
  }
  checkRouterEvent(routerEvent: Event): void{
    if (routerEvent instanceof NavigationStart){
      this.loading = true;
    }
    if (routerEvent instanceof NavigationEnd|| routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel){
      this.loading = false;
    }
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigate(['/welcome'])
  }
}
