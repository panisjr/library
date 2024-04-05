import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-management',
  templateUrl: './bookmanagement.component.html',
  styleUrls: ['./bookmanagement.component.css']
})
export class BookManagementComponent implements OnInit {
  books: any[] = [];
  selectedBook: any = {};
  editingBook: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchBooks();
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
