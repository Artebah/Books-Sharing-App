Entities:

- User
- Book
- BorrowRequest

Actions to implement

Users

- `POST /auth/register` — register a new user
- `POST /auth/login` — authenticate and obtain a token
- `GET /users/me` — get current authenticated user profile

Books

- `POST /books` — add a book (add your own)
- `GET /books` — list all available books
- `GET /books/:id` — get book details
- `PATCH /books/:id` — update a book
- `DELETE /books/:id` — delete a book

Borrow Requests

- `POST /books/:id/request` — request to borrow a book
- `GET /requests/my` — list my requests
- `PATCH /requests/:id/accept` — accept a borrow request
- `PATCH /requests/:id/reject` — reject a borrow request
- `PATCH /requests/:id/return` — mark a book as returned
