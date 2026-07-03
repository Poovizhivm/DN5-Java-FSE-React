package com.cts.junit;

import com.cts.junit.mockito.AuditService;
import com.cts.junit.mockito.ExternalApi;
import com.cts.junit.mockito.NotificationService;
import com.cts.junit.mockito.User;
import com.cts.junit.mockito.UserService;

import org.junit.jupiter.api.Test;
import org.mockito.InOrder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Test
    void testGetUserName() {

        ExternalApi api = mock(ExternalApi.class);

        when(api.getUserById(1))
                .thenReturn(new User(1, "Poovizhi"));

        UserService service = new UserService(api);

        String result = service.getUserName(1);

        assertEquals("Poovizhi", result);

        verify(api).getUserById(1);
    }
    @Test
    void testVerifyInteraction() {

        ExternalApi api = mock(ExternalApi.class);

        when(api.getUserById(2))
                .thenReturn(new User(2, "John"));

        UserService service = new UserService(api);

        service.getUserName(2);

        verify(api).getUserById(2);

    }
    
    @Test
    void testArgumentMatcher() {

        ExternalApi api = mock(ExternalApi.class);

        when(api.getUserById(anyInt()))
                .thenReturn(new User(100, "CTS User"));

        UserService service = new UserService(api);

        String result = service.getUserName(25);

        assertEquals("CTS User", result);

        verify(api).getUserById(anyInt());
    }
    @Test
    void testDoNothing() {

        NotificationService notificationService =
                mock(NotificationService.class);

        doNothing().when(notificationService)
                .sendNotification(anyString());

        UserService service =
                new UserService(notificationService);

        service.notifyUser("Welcome");

        verify(notificationService)
                .sendNotification("Welcome");
    }
    @Test
    void testMultipleReturns() {

        ExternalApi api = mock(ExternalApi.class);

        when(api.getUserById(1))
                .thenReturn(new User(1, "First User"))
                .thenReturn(new User(1, "Second User"));

        UserService service = new UserService(api);

        String first = service.getUserName(1);
        String second = service.getUserName(1);

        assertEquals("First User", first);
        assertEquals("Second User", second);

        verify(api, times(2)).getUserById(1);
    }
    @Test
    void testInteractionOrder() {

        NotificationService notificationService =
                mock(NotificationService.class);

        AuditService auditService =
                mock(AuditService.class);

        notificationService.sendNotification("Welcome");

        auditService.log("Notification Sent");

        InOrder inOrder = inOrder(notificationService, auditService);

        inOrder.verify(notificationService)
                .sendNotification("Welcome");

        inOrder.verify(auditService)
                .log("Notification Sent");
    }
    @Test
    void testVoidMethodException() {

        NotificationService notificationService =
            mock(NotificationService.class);

        doThrow(new RuntimeException("Notification Failed"))
            .when(notificationService)
            .sendNotification(anyString());

        UserService service =
            new UserService(notificationService);

        RuntimeException exception =
            assertThrows(RuntimeException.class, () -> {
                service.notifyUser("Welcome");
            });

        assertEquals("Notification Failed", exception.getMessage());

        verify(notificationService)
                .sendNotification("Welcome");
    }
}