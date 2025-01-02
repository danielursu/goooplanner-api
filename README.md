# gOOOplanner

## Environment Setup

1. Copy `.env.example` to `.env`:

    ```
    cp .env.example .env
    ```

2. Generate a secure JWT secret:

    ```
    node -e "console.log(require('crypto').randomBytes(64).toString('base64'));"
    ```

3. Update the `JWT_SECRET` in your `.env` file with the generated value.
