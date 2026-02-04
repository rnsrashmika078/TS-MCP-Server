# MCP Server -> Typescript

## Using with Claude Desktop

Add the following MCP config to your Claude Desktop configuration:

```json
{
    "mcpServers": {
        "your-mcp-name": {
            "command": "node",
            "args": ["ABSOLUTE_PATH_TO_MCP_SERVER/build/index.js"]
        }
    }
}
```

## Development

The template includes a sample tool implementation in `index.ts`. To create your own MCP:

1. Modify the server configuration in `index.ts`:

```typescript
const server = new McpServer({
    name: "your-mcp-name",
    version: "0.0.1",
});
```

2. Define your custom tools using the `server.tool()` method:

```typescript
server.tool(
    "your-tool-name",
    "Your tool description",
    {
        parameter: z.string().describe("Parameter description"),
    },
    async ({ parameter }) => {
        return {
            content: [
                {
                    type: "text",
                    text: "Your tool's response",
                },
            ],
        };
    }
);
```

3. Build and test your implementation:

```bash
npm run build
```"# TS-MCP-Server" 
