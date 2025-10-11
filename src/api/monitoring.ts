import { http, type Response } from "@/utils/http";

export type TrafficRecord = {
  id: string;
  method: string;
  url: string;
  protocol: string;
  statusCode: number;
  statusText: string;
  size: string;
  time: string;
  contentType: string;
  timestamp: string;
  request: {
    headers: Record<string, string>;
    body: string;
  };
  response: {
    headers: Record<string, string>;
    body: string;
  };
};

export type TrafficMonitoringRequest = {
  searchQuery?: string;
  method?: string;
  status?: string;
  page?: number;
  pageSize?: number;
};

export type TrafficMonitoringResponse = {
  data: TrafficRecord[];
  total: number;
};

export const getTrafficRecords = (params: TrafficMonitoringRequest) => {
  return http.request<Response<TrafficMonitoringResponse>>(
    "get",
    "/monitoring/traffic",
    {
      params
    }
  );
};
