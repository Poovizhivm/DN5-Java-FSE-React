function BookDetails() {
  const books = [
    { id: 1, name: "React Learning", price: 500 },
    { id: 2, name: "Java Fundamentals", price: 450 },
    { id: 3, name: "Spring Boot", price: 600 }
  ];

  return (
    <div>
      <h2>Book Details</h2>

      {books.map(book => (
        <div key={book.id}>
          <h4>{book.name}</h4>
          <p>Price : {book.price}</p>
        </div>
      ))}
    </div>
  );
}

export default BookDetails;