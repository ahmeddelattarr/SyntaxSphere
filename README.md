

# SyntaxSphere Project

## Overview
SyntaxSphere is a Django-based project that provides user authentication, including GitHub OAuth, and post management functionalities. This document outlines the available API endpoints and the required data for each endpoint.

## Endpoints

### User Authentication

#### Sign Up
- **URL:** `/signup/`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Data:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "first_name": "string",
    "last_name": "string"
  }
  ```
- **Response:**
  ```json
  {
    "refresh": "string",
    "access": "string"
  }
  ```

#### Sign In
- **URL:** `/signin/`
- **Method:** `POST`
- **Description:** Authenticate an existing user.
- **Request Data:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "refresh": "string",
    "access": "string"
  }
  ```

#### Sign Out
- **URL:** `/signout/`
- **Method:** `POST`
- **Description:** Log out the authenticated user.
- **Request Data:**
  ```json
  {
    "refresh": "string"
  }
  ```
- **Response:** `HTTP 205 Reset Content` on success, `HTTP 400 Bad Request` on failure.

### OAuth

#### GitHub OAuth
- **URL:** `/accounts/github/login/`
- **Method:** `GET`
- **Description:** Redirect to GitHub for authentication.
- **Response:** Redirects to GitHub login page.

- **URL:** `/accounts/github/login/callback/`
- **Method:** `GET`
- **Description:** GitHub callback URL.
- **Response:** Redirects to the application with the authentication result.

### Post Management

#### List Posts
- **URL:** `/posts/list`
- **Method:** `GET`
- **Description:** Retrieve a list of all posts.
- **Response:**
  ```json
  [
    {
      "id": "uuid",
      "title": "string",
      "content": "string",
      "author": "string",
      "created_at": "datetime",
      "updated_at": "datetime"
    },
    ...
  ]
  ```

#### Create Post
- **URL:** `/posts/new`
- **Method:** `POST`
- **Description:** Create a new post.
- **Request Data:**
  ```json
  {
    "title": "string",
    "content": "string",
    "author": "string"
  }
  ```
- **Response:**
  ```json
  {
    "id": "uuid",
    "title": "string",
    "content": "string",
    "author": "string",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```

#### Retrieve Post
- **URL:** `/posts/<uuid:id>`
- **Method:** `GET`
- **Description:** Retrieve a specific post by its ID.
- **Response:**
  ```json
  {
    "id": "uuid",
    "title": "string",
    "content": "string",
    "author": "string",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```

#### Delete Post
- **URL:** `/posts/<uuid:id>`
- **Method:** `DELETE`
- **Description:** Delete a specific post by its ID.
- **Response:** `HTTP 204 No Content` on success.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/ahmeddelattarr/SyntaxSphere.git
   ```
2. Navigate to the project directory:
   ```sh
   cd SyntaxSphere
   ```
3. Install the required dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```sh
   python manage.py migrate
   ```
5. Run the development server:
   ```sh
   python manage.py runserver
   ```

## License
MIT License

Copyright (c) 2024 Ahmed elattar

