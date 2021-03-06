# API Documentation

#### Base URL : http://localhost:5000/ (development env)

#### POST /user

> Create a user

**Data Sent**

_All the fields are required_

| Name | Type |
| :------------- | :------------- |
| email | String (unique) |
| username | String (unique) |
| rollnum | String (unique) |
| name | String |
| password | String, SHA256 hash |

**Data returned**

- 400 in case of missing required fields
- 400 in case of `ValidationError`, with error object part of returned JSON
- 201 in case of successful user creation with JSON object:

  ```json
  'message': 'New user created',
  'num_id': 1
  ```

  _1_ will be replaced with approximate ID for the created user.

#### POST /user/login

> Create a session for a user

**Data Sent**

_All the fields are required_

| Name | Type |
| :------------- | :------------- |
| username | String |
| password | String, SHA256 hash |

**Data returned**

- 400 in case of missing required fields
- 404 in case of username not in DB
- 200 in case of successful login, with object :-

    { token: "c3d95dc9ec6e9cf4d5fe92899954f43fdff20e3b" } // 40 character HEX string

    This token must be sent in the object / header in every subsequent request
    that requires user authentication.

#### GET /user/data/:id

> Get the details of user with num_id `id`

**Data returned**

- 200 with a JSON object with keys `name, username, email, rollnum`.

#### GET /user/logout?token=abcdefgh

_Token must be a valid session token that was returned when
the login action was performed_

**Data returned**

- 404 in case of corrupted session token.
- 200 in case of successfully logout with `message`: `Logged out successfully`.

#### GET /users

> Get an array of all the users

**Data returned**

- 200 with an array, that consists of JSON objects, representing each user :-

```json
[
  {
    "_id": "559bfaf481208e8421cc465e",
    "num_id": 1,
    "username": "icyflame",
    "name": "Siddharth Kannan",
    "email": "siddharth@g,com",
    "rollnum": "13TH42312"
  }
]
```
