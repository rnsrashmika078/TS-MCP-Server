import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create server instance
const server = new McpServer({
    name: "mcp-server-template",
    version: "0.0.1",
});

// Tool 1: Original sample tool
server.tool(
    "sample-tool",
    "A sample tool for demonstration purposes",
    {
        input: z.string().describe("Input parameter for the sample tool"),
    },
    async ({ input }) => {
        const output = `Processed: ${input}`;
        return {
            content: [
                {
                    type: "text",
                    text: output,
                },
            ],
        };
    }
);

// Tool 2: Calculator
server.tool(
    "calculator",
    "Performs basic math operations",
    {
        operation: z
            .enum(["add", "subtract", "multiply", "divide"])
            .describe("The math operation"),
        a: z.number().describe("First number"),
        b: z.number().describe("Second number"),
    },
    async ({ operation, a, b }) => {
        let result;
        switch (operation) {
            case "add":
                result = a + b;
                break;
            case "subtract":
                result = a - b;
                break;
            case "multiply":
                result = a * b;
                break;
            case "divide":
                result = b !== 0 ? a / b : "Error: Division by zero";
                break;
        }
        return {
            content: [
                {
                    type: "text",
                    text: `Result: ${result}`,
                },
            ],
        };
    }
);

// Tool 3: Text Transformer
server.tool(
    "text-transformer",
    "Transforms text in various ways",
    {
        text: z.string().describe("The text to transform"),
        mode: z
            .enum(["uppercase", "lowercase", "reverse", "length"])
            .describe("Transformation mode"),
    },
    async ({ text, mode }) => {
        let result;
        switch (mode) {
            case "uppercase":
                result = text.toUpperCase();
                break;
            case "lowercase":
                result = text.toLowerCase();
                break;
            case "reverse":
                result = text.split("").reverse().join("");
                break;
            case "length":
                result = `Length: ${text.length} characters`;
                break;
        }
        return {
            content: [
                {
                    type: "text",
                    text: result,
                },
            ],
        };
    }
);

// Tool 4: JSON Formatter
server.tool(
    "json-formatter",
    "Formats and validates JSON",
    {
        jsonString: z.string().describe("JSON string to format"),
    },
    async ({ jsonString }) => {
        try {
            const parsed = JSON.parse(jsonString);
            const formatted = JSON.stringify(parsed, null, 2);
            return {
                content: [
                    {
                        type: "text",
                        text: `Formatted JSON:\n${formatted}`,
                    },
                ],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error: Invalid JSON - ${
                            error instanceof Error ? error.message : ""
                        }`,
                    },
                ],
            };
        }
    }
);

// Tool 5: Random Number Generator
server.tool(
    "random-number",
    "Generates a random number within a range",
    {
        min: z.number().describe("Minimum value (inclusive)"),
        max: z.number().describe("Maximum value (inclusive)"),
    },
    async ({ min, max }) => {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        return {
            content: [
                {
                    type: "text",
                    text: `Random number between ${min} and ${max}: ${random}`,
                },
            ],
        };
    }
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
