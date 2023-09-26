# Node RESTful API

This repository contains a RESTful API built using Node.js and Express. This API serves as a basic template for creating web services that can handle CRUD (Create, Read, Update, Delete) operations on resources.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed. You can download it from [https://nodejs.org/](https://nodejs.org/).

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/isaiac/node-rest-api.git

   ```

2. Navigate to the project directory:

   ```bash
   cd your-api

   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Rename `.env.example` to `.env` and update the environment variables with your configuration.

5. Start the server:

   ```bash
   npm start
   ```

## Usage

After installing and starting the server, your API should be up and running. You can now use this API to perform CRUD operations on your resources. You can make HTTP requests to the endpoints described below.

## Endpoints

The following endpoints are available:

`GET /users`: Retrieve a list of all users.\
`POST /users`: Create a new user.\
`GET /users/:id`: Retrieve a specific user by its ID.\
`PUT /users/:id`: Update a specific user by its ID.\
`DELETE /users/:id`: Delete a specific user by its ID.

`GET /roles`: Retrieve a list of all roles.\
`POST /roles`: Create a new role.\
`GET /roles/:id`: Retrieve a specific role by its ID.\
`PUT /roles/:id`: Update a specific role by its ID.\
`DELETE /roles/:id`: Delete a specific role by its ID.

`GET /permissions`: Retrieve a list of all permissions.\
`POST /permissions`: Create a new permission.\
`GET /permissions/:id`: Retrieve a specific permission by its ID.\
`PUT /permissions/:id`: Update a specific permission by its ID.\
`DELETE /permissions/:id`: Delete a specific permission by its ID.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m "Add new feature"`.
4. Push to your fork: `git push origin feature/your-feature-name`.
5. Create a pull request to the `main` branch of the original repository.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/isaiac/node-rest-api/blob/main/LICENSE/) file for details.
