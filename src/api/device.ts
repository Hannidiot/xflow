import { http, type Response } from "@/utils/http";

export type DeviceInfo = {
  dev_id: string;
  dev_name?: string;
  dev_status?: string;
  dev_type: string;
};

export type DeviceInterfaceInfo = {
  interface: string;
  ip: string;
};

export type DeviceOperationRequest = {
  id: string;
};

export type DeviceConnectRequest = {
  ip: string;
  port: string;
};

export type DeviceDisconnectRequest = {
  dev_id: string;
};

export type DeviceRestartRequest = {
  dev_id: string;
};

export const getDeviceList = (params?: object) => {
  return http.request<Response<DeviceInfo[]>>("get", "/device/list", {
    params
  });
};

export const getDeviceInterfaceList = (params: { dev_id: string }) => {
  return http.request<Response<DeviceInterfaceInfo[]>>(
    "get",
    "/device/interface",
    { params }
  );
};

export const connectDevice = (data: DeviceConnectRequest) => {
  return http.post<Response<any>, DeviceConnectRequest>("/device/connect", {
    data
  });
};

export const disconnectDevice = (data: DeviceDisconnectRequest) => {
  return http.post<Response<any>, DeviceDisconnectRequest>(
    "/device/disconnect",
    { data }
  );
};

export const restartDevice = (data: DeviceRestartRequest) => {
  return http.post<Response<any>, DeviceRestartRequest>("/device/reboot", {
    data
  });
};
