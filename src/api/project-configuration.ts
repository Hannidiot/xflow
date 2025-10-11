import { http, type Response } from "@/utils/http";

export type ProxyMode = "direct" | "http" | "https" | "socks";

export interface ProxySettings {
  mode: ProxyMode;
  dnsFilter: string;
  autoEncrypt: boolean;
}

export interface Device {
  id: string;
  name: string;
  ipAddress: string;
  status: "online" | "offline" | "unknown";
  lastSeen: string;
  selected: boolean;
}

export interface DeviceListResponse {
  data: Device[];
}

export interface ProxySettingsResponse {
  data: ProxySettings;
}

/**
 * Get proxy settings
 */
export const getProxySettings = () => {
  return http.request<Response<ProxySettingsResponse>>(
    "get",
    "/project/proxy-settings"
  );
};

/**
 * Update proxy settings
 */
export const updateProxySettings = (data: ProxySettings) => {
  return http.post<Response<any>, ProxySettings>("/project/proxy-settings", {
    data
  });
};

/**
 * Get device list for project configuration
 */
export const getProjectDevices = () => {
  return http.request<Response<DeviceListResponse>>("get", "/project/devices");
};

/**
 * Test device connection
 */
export const testDeviceConnection = (deviceId: string) => {
  return http.post<Response<any>, { deviceId: string }>(
    "/project/test-connection",
    {
      data: { deviceId }
    }
  );
};

/**
 * Download certificate
 */
export const downloadCertificate = () => {
  return http.request<Response<{ downloadUrl: string }>>(
    "get",
    "/project/certificate"
  );
};
