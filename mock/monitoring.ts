import { defineFakeRoute } from "vite-plugin-fake-server/client";
import type {
  TrafficRecord,
  TrafficMonitoringResponse
} from "@/api/monitoring";

const generateTrafficRecords = (): TrafficRecord[] => {
  const methods = ["GET", "POST", "PUT", "DELETE"];
  const statusCodes = [200, 404, 500, 302];
  const statusTexts = ["OK", "Not Found", "Server Error", "Found"];
  const protocols = ["HTTP/1.1", "HTTP/2"];
  const contentTypes = ["application/json", "text/html", "application/xml"];

  const data: TrafficRecord[] = [];

  for (let i = 0; i < 10000; i++) {
    const method = methods[Math.floor(Math.random() * methods.length)];
    const statusIndex = Math.floor(Math.random() * statusCodes.length);

    data.push({
      id: `record-${i}`,
      method,
      url: `/api/v${Math.floor(Math.random() * 3) + 1}/endpoint/${i}`,
      protocol: protocols[Math.floor(Math.random() * protocols.length)],
      statusCode: statusCodes[statusIndex],
      statusText: statusTexts[statusIndex],
      size: `${Math.floor(Math.random() * 10000)} bytes`,
      time: `${Math.random().toFixed(2)}s`,
      contentType:
        contentTypes[Math.floor(Math.random() * contentTypes.length)],
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      request: {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token123",
          "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify({
          id: i,
          action: "get",
          timestamp: new Date().toISOString(),
          data: Array.from({ length: 5 }, (_, idx) => ({
            itemId: idx,
            value: `Item ${idx}`
          }))
        })
      },
      response: {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Server: "nginx/1.18.0"
        },
        body: JSON.stringify({
          data: Array.from({ length: 5 }, (_, idx) => ({
            itemId: idx,
            value: `Item ${idx}`
          })),
          success: true,
          timestamp: new Date().toISOString()
        })
      }
    });
  }

  return data;
};

export default defineFakeRoute([
  {
    url: "/monitoring/traffic",
    method: "get",
    response: ({ query }) => {
      const { searchQuery, method, status, page = 1, pageSize = 100 } = query;
      const allData = generateTrafficRecords();

      // Filter data based on search criteria
      let filteredData = allData;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredData = filteredData.filter(
          item =>
            item.url.toLowerCase().includes(query) ||
            item.method.toLowerCase().includes(query) ||
            item.statusText.toLowerCase().includes(query)
        );
      }

      if (method) {
        filteredData = filteredData.filter(item => item.method === method);
      }

      if (status) {
        filteredData = filteredData.filter(
          item => item.statusCode.toString() === status
        );
      }

      // Paginate data
      const startIndex = (Number(page) - 1) * Number(pageSize);
      const endIndex = startIndex + Number(pageSize);
      const paginatedData = filteredData.slice(startIndex, endIndex);

      const response: TrafficMonitoringResponse = {
        data: paginatedData,
        total: filteredData.length
      };

      return {
        code: "200",
        err_msg: "",
        data: response
      };
    }
  }
]);
