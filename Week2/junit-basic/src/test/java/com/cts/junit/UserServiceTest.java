package com.cts.junit;

import com.cts.junit.mockito.ExternalApi;
import com.cts.junit.mockito.User;
import com.cts.junit.mockito.UserService;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
}