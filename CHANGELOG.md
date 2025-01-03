# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.1.0] - 2025-01-02

### Added
- JWT refresh token support
- Changelog file to track project changes

### Changed
- User service methods to return User entities instead of UserResponseDto
- Local strategy to pass email and password as separate arguments

### Fixed
- TypeScript compilation errors in authentication and user modules
- Missing JWT_REFRESH_SECRET environment variable configuration
- Type mismatches between User and UserResponseDto

### Security
- Added password hashing for user creation
- Implemented proper JWT secret management