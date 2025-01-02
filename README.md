# gOOOplanner

## Team Holiday Planner Application

gOOOplanner is a web-based tool designed to manage and visualize team members' availability by tracking out-of-office and holiday schedules.

## Features

- User authentication and authorization
- Calendar-based interface for schedule visualization
- Team availability overviews
- User management and permissions
- Data persistence with PostgreSQL

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/goooplanner-api.git
   cd goooplanner-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Generate secure JWT secrets:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('base64'));"
   ```

5. Update your `.env` file with the generated values for:
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`

## Configuration

The application requires the following environment variables:

- Database configuration (DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE)
- JWT configuration (JWT_SECRET, JWT_REFRESH_SECRET, JWT_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME)

## Development

### Running the application
```bash
npm run start:dev
```

### Building the application
```bash
npm run build
```

### Running tests
```bash
npm run test
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a complete list of changes.

## License

[MIT License](LICENSE)
