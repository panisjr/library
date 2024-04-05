import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-management',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  books: any[] = [];
  selectedBook: any = {};
  editingBook: boolean = false;
  qrData: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchBooks();
    this.fetchBookData(); 
  }

  fetchBooks() {
    this.http.get<any>('http://localhost:3000/books')
      .subscribe(response => {
        this.books = response.books;
      }, error => {
        console.error('Error fetching books:', error);
      });
  }

  selectBook(book: any) {
    this.selectedBook = { ...book };
    this.editingBook = true;
  }

  editBook() {
    this.http.put<any>(`http://localhost:3000/editbook/${this.selectedBook.id}`, this.selectedBook)
      .subscribe(response => {
        console.log(response.message);
        this.fetchBooks();
        this.editingBook = false;
      }, error => {
        console.error('Error editing book:', error);
      });
  }

  deleteBook(bookId: string) {
    this.http.delete<any>(`http://localhost:3000/deletebook/${bookId}`)
      .subscribe(response => {
        console.log(response.message);
        this.fetchBooks();
      }, error => {
        console.error('Error deleting book:', error);
      });
  }

  cancelEdit() {
    this.editingBook = false;
  }

  fetchBookData() {
    // Make HTTP request to fetch book data
    this.http.get<any>('http://localhost:3000/books')
      .subscribe(
        (response) => {
          // Assuming response is an array of books
          const books = response.books;
          if (books && books.length > 0) {
            // Loop through each book
            this.books = books.map((book: any) => {
              // Encode name and category into QR code for each book
              const qrData = `Name: ${book.name}, Category: ${book.category}`;
              return { ...book, qrData }; // Add qrData to each book object
            });
          }
        },
      );
  }
  
}


