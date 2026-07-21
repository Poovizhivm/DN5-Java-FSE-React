package com.cognizant.account_service.controller;

import com.cognizant.account_service.model.Account;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @GetMapping("/{number}")
    public Account getAccount(
            @PathVariable String number) {

        return new Account(
                number,
                "Savings",
                234343
        );
    }
}