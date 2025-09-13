export interface PushNotificationSchema {
  /**
   * Called when the push notification action is performed.
   */
  pushNotificationReceived(notification: {
    title: string;
    body: string;
    id: string;
    badge?: number;
    data?: any;
  }): void;

  /**
   * Called when a push notification action is clicked.
   */
  pushNotificationActionPerformed(notification: {
    actionId: string;
    notification: any;
  }): void;
}

export interface AppUpdateSchema {
  /**
   * Called when an app update is available.
   */
  appUpdateAvailable(update: {
    currentVersion: string;
    availableVersion: string;
  }): void;
}