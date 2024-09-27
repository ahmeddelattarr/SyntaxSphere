
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
- **URL:** `/posts/`
- **Method:** `GET`
- **Description:** Retrieve a list of all posts.
- **Response:**
  ```json
  [
    {
      "id": "uuid",
      "title": "string",
      "url": "string",
      "user_id": "string",
      "posted_at": "datetime",
      "like_count": "integer"
    },
    ...
  ]
  ```

#### Create Post
- **URL:** `/posts/`
- **Method:** `POST`
- **Description:** Create a new post.
- **Request Data:**
  ```json
  {
    "title": "string",
    "url": "string"
  }
  ```
- **Response:**
  ```json
  {
    "id": "uuid",
    "title": "string",
    "url": "string",
    "user_id": "string",
    "posted_at": "datetime",
    "like_count": "integer"
  }
  ```

#### Retrieve Post
- **URL:** `/posts/<uuid:id>/`
- **Method:** `GET`
- **Description:** Retrieve a specific post by its ID.
- **Response:**
  ```json
  {
    "id": "uuid",
    "title": "string",
    "url": "string",
    "user_id": "string",
    "posted_at": "datetime",
    "like_count": "integer"
  }
  ```

#### Delete Post
- **URL:** `/posts/<uuid:id>/`
- **Method:** `DELETE`
- **Description:** Delete a specific post by its ID.
- **Response:** `HTTP 204 No Content` on success.

  


### Update Post

**URL:** `/posts/<uuid:id>/update/`

**Method:** `PUT`

**Description:** This endpoint allows authenticated users to update an existing post.

**URL Parameters:**
- `id` (UUID): The unique identifier of the post to be updated.

**Request Body:**
- `title` (string): The new title of the post.
- `url` (string): The new URL of the post.

**Response:**
- **Success:** 
  - **Status Code:** `200 OK`
  - **Body:** JSON object containing the updated post details.
    ```json
    {
      "id": "uuid",
      "title": "new title",
      "url": "new url",
      "user": "username",
      "posted_at": "timestamp",
      "like_count": 0
    }
    ```
- **Failure:**
  - **Status Code:** `400 Bad Request` (if the request body is invalid)
  - **Status Code:** `404 Not Found` (if the post with the given ID does not exist)
  - **Status Code:** `403 Forbidden` (if the user is not authenticated or authorized to update the post)

**Example Request:**
```http
PUT /posts/123e4567-e89b-12d3-a456-426614174000/update/
Content-Type: application/json

{
  "title": "Updated Post Title",
  "url": "https://newurl.com"
}
```

**Example Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Updated Post Title",
  "url": "https://newurl.com",
  "user": "username",
  "posted_at": "2023-10-01T12:34:56Z",
  "like_count": 0
}
```

### Like Management

#### Like Post
- **URL:** `/posts/<uuid:pk>/like/`
- **Method:** `POST`
- **Description:** Like a specific post.
- **Response:**
  ```json
  {
    "id": "uuid",
    "user_id": "string",
    "post_id": "string"
  }
  ```

### Comment Management

#### List Comments
- **URL:** `/posts/<uuid:pk>/comments/`
- **Method:** `GET`
- **Description:** Retrieve a list of comments for a specific post.
- **Response:**
  ```json
  [
    {
      "id": "uuid",
      "user_id": "string",
      "post_id": "string",
      "comment": "string",
      "posted_at": "datetime"
    },
    ...
  ]
  ```

#### Create Comment
- **URL:** `/posts/<uuid:pk>/comments/`
- **Method:** `POST`
- **Description:** Create a new comment for a specific post.
- **Request Data:**
  ```json
  {
    "comment": "string"
  }
  ```
- **Response:**
  ```json
  {
    "id": "uuid",
    "user_id": "string",
    "post_id": "string",
    "comment": "string",
    "posted_at": "datetime"
  }
  ```

## Installation

### Backend
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

### Frontend
1. Navigate to the frontend directory:
   ```sh
   cd client
   ```
2. Install the required dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## License
MIT License

© 2024 Ahmed elattar
```
