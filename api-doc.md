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
- 201 in case of successful user creation
