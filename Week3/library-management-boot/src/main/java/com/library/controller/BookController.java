package com.library.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.library.entity.Book;
import com.library.repository.BookRepository;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookRepository repository;

    // Get all books
    @GetMapping
    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    // Add a book
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return repository.save(book);
    }

    // Get a book by ID
    @GetMapping("/{id}")
    public Book getBook(@PathVariable int id) {
        return repository.findById(id).orElse(null);
    }

    // Delete a book
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable int id) {
        repository.deleteById(id);
        return "Book Deleted Successfully";
    }
}