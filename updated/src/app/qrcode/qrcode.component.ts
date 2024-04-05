import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  qrData: string = ''; // Initialize to empty string
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchBookData(); // Fetch book data when component initializes
  }

  fetchBookData() {
    // Make HTTP request to fetch book data
    this.http.get<any>('http://localhost:3000/books')
      .subscribe(
        (response) => {
          // Assuming response is an array of books
          const books = response.books;
          if (books && books.length > 0) {
            // Take the first book for demonstration, you can loop through all books here
            const book = books[0];
            // Encode only name and category into QR code
            this.qrData = `Name: ${book.name}, Category: ${book.category}`;
          }
        },
      );
  }
}
