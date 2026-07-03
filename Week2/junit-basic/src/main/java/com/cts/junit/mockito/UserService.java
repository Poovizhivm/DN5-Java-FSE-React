package com.cts.junit.mockito;

public class UserService {

    private ExternalApi api;
    private NotificationService notificationService;

    public UserService(ExternalApi api) {
        this.api = api;
    }

    public String getUserName(int id) {

        User user = api.getUserById(id);

        return user.getName();
    }
    public UserService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    public void notifyUser(String message) {
        notificationService.sendNotification(message);
    }
}