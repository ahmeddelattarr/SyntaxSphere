# SyntaxSphere

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
  - [Post Management](#post-management)
  - [Like Management](#like-management)
  - [Comment Management](#comment-management)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

SyntaxSphere is a Django-based web application that provides a platform for users to share and discuss programming-related content. It offers user authentication (including GitHub OAuth), post management, and social features like commenting and liking posts.

## Features

- User authentication (local and GitHub OAuth)
- Post creation, retrieval, updating, and deletion
- Commenting system
- Post liking functionality
- User-specific post retrieval

## API Endpoints

### User Authentication

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/signup/` | POST | Register a new user | `{"username": "string", "email": "string", "password": "string", "first_name": "string", "last_name": "string"}` | `{"refresh": "string", "access": "string"}` |
| `/signin/` | POST | Authenticate an existing user | `{"username": "string", "password": "string"}` | `{"refresh": "string", "access": "string"}` |
| `/signout/` | POST | Log out the authenticated user | `{"refresh": "string"}` | HTTP 205 Reset Content on success |
| `/accounts/github/login/` | GET | Initiate GitHub OAuth login | N/A | Redirects to GitHub |
| `/accounts/github/login/callback/` | GET | Handle GitHub OAuth callback | N/A | Redirects to app with auth result |

Example Response (Sign Up / Sign In):
```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Post Management

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/posts/` | GET | Retrieve all posts | N/A | Array of post objects |
| `/posts/` | POST | Create a new post | `{"title": "string", "url": "string"}` | Created post object |
| `/posts/<uuid:id>/` | GET | Retrieve a specific post | N/A | Post object |
| `/posts/<uuid:id>/` | DELETE | Delete a specific post | N/A | HTTP 204 No Content |
| `/posts/<uuid:id>/update/` | PUT | Update a specific post | `{"title": "string", "url": "string"}` | Updated post object |
| `/posts/users/<str:username>/` | GET | Retrieve posts by a specific user | N/A | Array of post objects |

Example Response (GET /posts/):
```json
[
  {
    "id": "c616613b-1483-4d98-930d-688f7660a965",
    "title": "Introduction to Python",
    "url": "https://example.com/python-tutorial",
    "user": "johndoe",
    "posted_at": "2024-09-26T11:55:36.523615Z",
    "like_count": 0
  },
  {
    "id": "c770a17c-6b82-40c5-85c0-136c9717ac7c",
    "title": "JavaScript for Beginners",
    "url": "https://example.com/js-for-beginners",
    "user": "janedoe",
    "posted_at": "2024-09-26T11:57:26.744238Z",
    "like_count": 2
  }
]
```

### Like Management

| Endpoint                      | Method | Description | Request Body | Response |
|-------------------------------|--------|-------------|--------------|----------|
| `/posts/<uuid:pk>/like/`      | POST | Like a specific post | N/A | Like object |
| `users/<str:username>/likes/` | GET | Retrieve posts liked by a specific user | N/A | Array of like objects |

Example Response (POST /posts/<uuid:pk>/like/):
```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "user_id": "1",
  "post_id": "c616613b-1483-4d98-930d-688f7660a965"
}
```

Example Response (GET /likes/<str:username>/):
```json
[
  {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "user_id": 1,
    "post_id": "c616613b-1483-4d98-930d-688f7660a965"
  },
  {
    "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "user_id": 1,
    "post_id": "c770a17c-6b82-40c5-85c0-136c9717ac7c"
  }
]
```

### Comment Management

| Endpoint                          | Method | Description                              | Request Body               | Response                 |
|-----------------------------------|--------|------------------------------------------|----------------------------|--------------------------|
| `/posts/<uuid:pk>/comments/`      | GET    | Retrieve comments for a specific post    | N/A                        | Array of comment objects |
| `/posts/<uuid:pk>/comments/`      | POST   | Create a new comment for a specific post | `{"comment": "string"}`    | Created comment object   |
| `/users/<str:username>/comments/` | GET    | Retrieve comments for a specific user    | N/A| Array of comments        |

Example Response (GET /posts/<uuid:pk>/comments/):
```json
[
  {
    "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "user_id": "1",
    "post_id": "c616613b-1483-4d98-930d-688f7660a965",
    "comment": "Great tutorial! Very helpful for beginners.",
    "posted_at": "2024-09-27T08:30:12.123456Z"
  },
  {
    "id": "098f6bcd-4621-3373-8ade-4e832627b4f6",
    "user_id": "2",
    "post_id": "c616613b-1483-4d98-930d-688f7660a965",
    "comment": "Could you add more advanced topics in the future?",
    "posted_at": "2024-09-27T09:15:30.987654Z"
  }
]
```

## Installation

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/ahmeddelattarr/SyntaxSphere.git
   cd SyntaxSphere
   ```

2. Set up a virtual environment (optional but recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required dependencies:
   ```sh
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Create a `.env` file in the project root
   - Add necessary variables (e.g., `SECRET_KEY`, `DEBUG`, `DATABASE_URL`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`)

5. Apply migrations:
   ```sh
   python manage.py migrate
   ```

6. Run the development server:
   ```sh
   python manage.py runserver
   ```



## License

Distributed under the MIT License. See `LICENSE` file for more information.

---

© 2024 Ahmed elattar