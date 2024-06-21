# API Documentation for OpenMentors

## Overview

This API provides functionalities for VMX platform. It includes features such as account creation, email verification, password reset, and video upload and retrieval.



## User Registration

### Endpoint
`POST /api/register`

### Description
This endpoint allows a new user to register by providing their email and password. Upon successful registration, an email verification process is initiated.

### Request

#### Headers
- `Content-Type: application/json`

#### Body
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Response
 - Success (201 Created)
```json
  "User registered successfully."
```

 - Error (208 Already Reported)
```json
  "Email already exists."
```
- Error (400 Bad Request)
```json
  "Please provide email or password."
```

## Password Reset Verification

### Endpoint
`POST /api/password-reset-verify`

### Description
This endpoint verifies the OTP (One-Time Password) sent to the user's email for password reset purposes. The OTP is valid for 10 minutes.

### Request

#### Headers
- `Content-Type: application/json`

#### Body
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```
### Response
 - Success (200 OK)
```json
  "OTP is valid."
```

 - Error (400 Bad Request)
```json
  "Invalid OTP."

```
```json
  "OTP has expired."

```
- Error (404 Not Found)
```json
  "No account associated with this email."
```

## Password Reset Request

### Endpoint
`POST /api/password-reset-request`

### Description
This endpoint initiates the password reset process by sending an OTP (One-Time Password) to the user's email.

### Request

#### Headers
- `Content-Type: application/json`

#### Body
```json
{
  "email": "user@example.com"
}
```
### Response
 - Success (200 OK)
```json
  "OTP sent to email."
```

 - Error (400 Bad Request)
```json
  "Please provide email."
```
- Error (404 Not Found)
```json
  "No account associated with this email."
```
- Error (500 Internal Server Error)
```json
  "Failed to send OTP."
```

## Password Reset

### Endpoint
`POST /api/password-reset`

### Description
This endpoint allows a user to reset their password by providing their email and new password.

### Request

#### Headers
- `Content-Type: application/json`

#### Body
```json
{
  "email": "user@example.com",
  "password": "newpassword"
}
```
### Response
 - Success (200 OK)
```json
  "Password reset successfully."
```

 - Error (404 Bad Request)
```json
  "No account associated this email."
```


## Sign In

### Endpoint
`POST /api/login`

### Description
This endpoint allows a user to sign in by providing their email and password. If the credentials are valid and the account is verified, it returns a refresh token and an access token.

### Request

#### Headers
- `Content-Type: application/json`

#### Body
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
### Response
 - Success (200 OK)
```json

{
  "refresh": "refresh_token_here",
  "access": "access_token_here",
  "userStatus": true
}
```

 - Error (400 Bad Request)
```json
  "Please provide email or password."
```
- Error (401 Unauthorized)
```json
  "Invalid credentials."
```
```json
  "Account not verified."
```

## Videos

### List Videos

#### Endpoint
`GET /api/videos`

#### Description
Retrieve a list of all videos.

#### Request

##### Headers
- `Content-Type: application/json`

#### Responses

##### Success (200 OK)
```json
[
  {
    "id": 1,
    "title": "Video Title",
    "description": "Video Description",
    "video": "http://example.com/video.mp4",
    "thumbnail": "http://example.com/pic.png"
  },
  {
    "id": 2,
    "title": "Another Video Title",
    "description": "Another Video Description",
    "video": "http://example.com/video2.mp4",
    "thumbnail": "http://example.com/pic.png"
  }
]
```

### Retrieve Video
#### Endpoint
#### GET `/api/videos/{id}`

#### Description
Retrieve details of a specific video by its ID.

#### Request
#### Headers
- `Content-Type: application/json`

#### Responses
##### Success (200 OK)
```json
{
  "id": 1,
  "title": "Video Title",
  "description": "Video Description",
  "url": "http://example.com/video.mp4"
}
```
#### Error (404 Not Found)
```json
{
  "Not found."
}
```

### Upload Video
#### Endpoint
#### POST `/api/videos`
#### Description
Upload a video to the server.

#### Request
#### Headers
- `Content-Type: multipart/form-data`
- `Authorization: Bearer access_token_here`
```json
{
  "title": "New Video Title",
  "description": "New Video Description",
  "video": "http://example.com/newvideo.mp4",
  "thumbnail": "http://example.com/newpic.png"
}
```
#### Responses
##### Success (201 Created)
```json
{
    "Video uploaded successfully"
}
```
##### Error (400 Bad Request)
```json
{
  "title": [
    "This field is required."
  ],
  "video": [
    "This field is required."
  ],
  "description": [
    "This field is required."
  ],
}

```

