package com.cts.junit.mockito;

public class UserService {

    private ExternalApi api;

    public UserService(ExternalApi api) {
        this.api = api;
    }

    public String getUserName(int id) {

        User user = api.getUserById(id);

        return user.getName();
    }
}