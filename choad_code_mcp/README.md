# MCP Server

This is a Multi-Model MCP Server that intelligently routes queries to different backend services like Rovodev, Gemini, and local processing.

## Installation

```bash
npm install
```

## Configuration

The server uses the `config` library for configuration. You can create `config/local.json` to override the default settings.

**Default Configuration (`config/default.json`):**

```json
{
  "port": 3000,
  "services": {
    "local": {
      "url": "http://localhost:3000",
      "timeout": 5000
    },
    "rovodev": {
      "url": "http://rovodev-service.example.com",
      "timeout": 30000
    },
    "gemini": {
      "url": "http://gemini-service.example.com",
      "timeout": 30000
    }
  },
  "logging": {
    "level": "info",
    "file": "mcp-server.log"
  }
}
```

## Running the Server

### Development

```bash
npm run build
npm start
```

### Production

For production, it is recommended to use PM2.

```bash
npm install -g pm2
npm run build
pm2 start ecosystem.config.js --env production
```

## API Endpoints

### `GET /tools`

Returns the list of available tools.

### `POST /multi_model_query`

Handles a multi-model query.

**Request Body:**

```json
{
  "query": "Your query string",
  "context": {
    "key": "value"
  }
}
```

### `GET /health`

Returns the health status of the server and its downstream services.
