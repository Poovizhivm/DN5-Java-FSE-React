import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, FormsModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  /*
   * WHY COMPONENT-LEVEL PROVIDING CREATES A SEPARATE SCOPED INSTANCE:
   *
   * By declaring [NotificationService] in the providers array of the @Component decorator:
   * 1. Scope Isolation: Angular's Dependency Injection (DI) system creates a new injector specifically
   *    for this component instance.
   * 2. Scoped Lifecycle: The service instance lives and dies with the component. When the component
   *    is destroyed, this service instance is also destroyed.
   * 3. Multiple Instances: If you render multiple `<app-notification>` elements on a page, each element
   *    receives its own isolated instance of the service, unlike 'providedIn: root' which is a singleton.
   */
  providers: [NotificationService],
})
export class NotificationComponent {
  newMsg = '';

  constructor(private notificationService: NotificationService) {}

  get notifications(): string[] {
    return this.notificationService.getNotifications();
  }

  addNotification() {
    if (this.newMsg.trim()) {
      this.notificationService.addNotification(this.newMsg);
      this.newMsg = '';
    }
  }
}
