# MCP Server: Current State

This document provides a technical breakdown of the current state of the MCP server.

## File-by-File Breakdown

### `package.json`

*   **Purpose**: Defines the project metadata, dependencies, and scripts.
*   **Dependencies**:
    *   `@modelcontextprotocol/sdk`: The MCP SDK for building tools.
    *   `express`: A web framework for Node.js.
    *   `typescript`, `@types/node`, `@types/express`: TypeScript and type definitions.
    *   `eslint`, `prettier`: Code linting and formatting tools.
    *   `jest`, `ts-jest`, `supertest`, `@types/supertest`: Testing framework and utilities.
    *   `winston`, `pm2`, `yaml`: Logging, process management, and configuration libraries.
*   **Scripts**:
    *   `start`: Starts the server.
    *   `build`: Compiles the TypeScript code.
    *   `test`: Runs the tests.

### `tsconfig.json`

*   **Purpose**: Configures the TypeScript compiler.
*   **Settings**:
    *   `target`: `es2020`
    *   `module`: `commonjs`
    *   `strict`: `true`
    *   `esModuleInterop`: `true`
    *   `outDir`: `dist`

### `.eslintrc.js` & `.prettierrc.js`

*   **Purpose**: Configure ESLint and Prettier for code consistency.

### `jest.config.js`

*   **Purpose**: Configures the Jest testing framework.
*   **Settings**:
    *   `preset`: `ts-jest`
    *   `testEnvironment`: `node`
    *   `testMatch`: `**/tests/**/*.test.ts`

### `AGENTS.md`

*   **Purpose**: Provides information for the agent working on the project.

### `src/index.ts`

*   **Purpose**: The entry point of the application. It imports and runs the server.

### `src/core/server.ts`

*   **Purpose**: Creates and configures the Express server.
*   **Endpoints**:
    *   `GET /tools`: Returns the list of available tools.
    *   `POST /multi_model_query`: Handles the `multi_model_query` tool requests.
    *   `GET /health`: A health check endpoint.

### `src/core/requestHandler.ts`

*   **Purpose**: Handles the logic for the `multi_model_query` tool.
*   **Functionality**:
    *   It receives a query from the request body.
    *   It performs a simple local processing check. If the query contains "hello", it returns a greeting.
    *   If the query is not handled locally, it returns the query in the response.
    *   It returns an error if the query is missing.

### `src/core/types.ts`

*   **Purpose**: Defines the `RequestHandler` interface.

### `src/tools/multiModelQuery.ts`

*   **Purpose**: Defines the `multi_model_query` tool using the MCP SDK.

### `tests/server.test.ts` & `tests/system.test.ts`

*   **Purpose**: Contain the unit and system tests for the server.
*   **Coverage**:
    *   Tool discovery
    *   Health check
    *   Request handling (success and error cases)
    *   Local processing fallback
