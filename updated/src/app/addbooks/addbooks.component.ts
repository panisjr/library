import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addbooks',
  templateUrl: './addbooks.component.html',
  styleUrls: ['./addbooks.component.css']
})
export class AddbooksComponent implements OnInit {
  name: string = '';
  category: string = '';
  description: string = '';
  photo: string = ''; // Assuming photo will be sent as base64 string
  books: any[] = []; // Define books array
  selectedBook: any = {}; // Define selectedBook object
  editingBook: boolean = false; // Define editingBook boolean
  qrData: string = 'Data to encode into QR code';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchBooks(); // Fetch books when component initializes
  }

  addBook() {
    const bookData = { name: this.name, category: this.category, description: this.description, photo: this.photo };
    this.http.post<any>('http://localhost:3000/addbook', bookData).subscribe(
      response => {
        console.log(response);
        this.name = '';
        this.category = '';
        this.description = '';
        this.photo = '';
        this.fetchBooks(); // Refresh the book list after adding a new book
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
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
}
