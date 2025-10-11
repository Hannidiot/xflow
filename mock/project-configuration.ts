import { defineFakeRoute } from "vite-plugin-fake-server/client";
import type {
  ProxySettings,
  Device,
  ProxySettingsResponse,
  DeviceListResponse
} from "@/api/project-configuration";

// Mock proxy settings data
const mockProxySettings: ProxySettings = {
  mode: "direct",
  dnsFilter: "example.com,test.com",
  autoEncrypt: false
};

// Mock device list data
const mockDevices: Device[] = [
  {
    id: "device-1",
    name: "Main Server",
    ipAddress: "192.168.1.100",
    status: "online",
    lastSeen: "2024-01-20 10:30:00",
    selected: true
  },
  {
    id: "device-2",
    name: "Backup Server",
    ipAddress: "192.168.1.101",
    status: "offline",
    lastSeen: "2024-01-19 15:45:00",
    selected: false
  },
  {
    id: "device-3",
    name: "Development VM",
    ipAddress: "192.168.1.102",
    status: "online",
    lastSeen: "2024-01-20 09:15:00",
    selected: false
  },
  {
    id: "device-4",
    name: "Testing Server",
    ipAddress: "192.168.1.103",
    status: "unknown",
    lastSeen: "2024-01-18 14:20:00",
    selected: false
  },
  {
    id: "device-5",
    name: "Production DB",
    ipAddress: "192.168.1.104",
    status: "online",
    lastSeen: "2024-01-20 11:00:00",
    selected: false
  }
];

export default defineFakeRoute([
  {
    url: "/project/proxy-settings",
    method: "get",
    response: () => {
      const response: ProxySettingsResponse = {
        data: mockProxySettings
      };

      return {
        code: "200",
        err_msg: "",
        data: response
      };
    }
  },
  {
    url: "/project/proxy-settings",
    method: "post",
    response: () => {
      return {
        code: "200",
        err_msg: "",
        data: {}
      };
    }
  },
  {
    url: "/project/devices",
    method: "get",
    response: () => {
      const response: DeviceListResponse = {
        data: mockDevices
      };

      return {
        code: "200",
        err_msg: "",
        data: response
      };
    }
  },
  {
    url: "/project/test-connection",
    method: "post",
    response: () => {
      // Simulate random test result
      const success = Math.random() > 0.3;

      return {
        code: "200",
        err_msg: success ? "" : "Connection failed",
        data: {
          success,
          message: success
            ? "Connection test successful"
            : "Connection test failed"
        }
      };
    }
  },
  {
    url: "/project/certificate",
    method: "get",
    response: () => {
      return {
        code: "200",
        err_msg: "",
        data: {
          downloadUrl: "/api/download/certificate.pem"
        }
      };
    }
  }
]);
