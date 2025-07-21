# Choad Code MCP

Choad Code MCP is a multi-model routing and response generation engine. It is designed to be a flexible and extensible platform for building and deploying AI-powered applications.

## Installation

To install Choad Code MCP, you will need to have Node.js and npm installed on your system. Once you have these prerequisites, you can install the project by running the following command:

```bash
npm install
```

## Usage

To start the Choad Code MCP server, run the following command:

```bash
npm start
```

This will start the server on port 3000. You can then send requests to the server to generate responses from the configured models.

## API

The Choad Code MCP server exposes the following API endpoints:

* `POST /api/v1/generate`: This endpoint generates a response from the configured models. The request body should be a JSON object with the following properties:

    * `model`: The name of the model to use for generating the response.
    * `prompt`: The prompt to use for generating the response.

The response will be a JSON object with the following properties:

* `response`: The generated response.

## Contributing

Contributions to Choad Code MCP are welcome. If you would like to contribute, please fork the repository and submit a pull request.

## License

Choad Code MCP is licensed under the MIT License.
