import { z } from "zod";
import { default as mongoose, model } from "mongoose";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
//+++++++++++++++++++++++++++++++++++
//Fetch API Calling External Function
//+++++++++++++++++++++++++++++++++++
async function getCityWeatherReport(city) {
    const response = await fetch('http://localhost:3000/getWeatherDetails?city=' + city);
    const dataReturn = await response.json();
    return dataReturn;
}
//+++++++++++++++++++++++++++++++++++
//Fetch API Calling External Function
//+++++++++++++++++++++++++++++++++++
async function getLoctionWiseUserReport(city) {
    const response = await fetch('http://localhost:3000/getUserByCity?city=' + city);
    const dataReturn = await response.json();
    return dataReturn;
}
//+++++++++++++++++++++++++++++++++++
// Create an MCP server
//+++++++++++++++++++++++++++++++++++
const server = new McpServer({
    name: "TheMCPCustomAPIServer",
    version: "1.0.0"
});
// //+++++++++++++++++++++++++++++++++++
// // Add an addition tool
// //+++++++++++++++++++++++++++++++++++
// server.tool("getSum", { a: z.number(), b: z.number() },
//     async ({ a, b }) => ({
//         content: [{ type: "text", text: String(a + b) }]
//     })
// );
// //+++++++++++++++++++++++++++++++++++
// // Add an addition tool
// //+++++++++++++++++++++++++++++++++++
// server.tool("getMultiply", { a: z.number(), b: z.number() },
//     async ({ a, b }) => ({
//         content: [{ type: "text", text: String(a * b) }]
//     })
// );
//+++++++++++++++++++++++++++++++++++
// Add an addition tool
//+++++++++++++++++++++++++++++++++++
server.tool("getWeatherData", { city: z.string() },
    async ({ city, }) => ({
        content: [{ type: "text", text: JSON.stringify(await getCityWeatherReport(city)) }]
    })
);
//+++++++++++++++++++++++++++++++++++
// Add an addition tool
//+++++++++++++++++++++++++++++++++++
server.tool("getLoctionWiseUserData", { city: z.string() },
    async ({ city, }) => ({
        content: [{ type: "text", text: JSON.stringify(await getLoctionWiseUserReport(city)) }]
    })
);
//+++++++++++++++++++++++++++++++++++
// Start receiving messages on stdin and sending messages on stdout
//+++++++++++++++++++++++++++++++++++
const transport = new StdioServerTransport();
await server.connect(transport);