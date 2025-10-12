import { defineFakeRoute } from "vite-plugin-fake-server/client";
import type { DeviceInfo, DeviceInterfaceInfo } from "@/api/device";

const interface_list: DeviceInterfaceInfo[] = [
  {
    interface: "wlan0",
    ip: "192.168.0.1/24"
  },
  {
    interface: "en0",
    ip: "192.168.0.1/16"
  }
];

const device_list: DeviceInfo[] = [
  {
    dev_id: "test1",
    dev_name: "hcp3_vm",
    dev_status: "offline",
    dev_type: "tcp"
  },
  {
    dev_id: "192.168.0.1",
    dev_status: "device",
    dev_type: "usb"
  }
];

export default defineFakeRoute([
  {
    url: "/device/interface",
    method: "get",
    response: () => {
      return {
        code: "200",
        data: interface_list
      };
    }
  },
  {
    url: "/device/list",
    method: "get",
    response: () => {
      return {
        code: "200",
        data: device_list
      };
    }
  },
  {
    url: "/device/connect",
    method: "post",
    response: () => {
      return {
        code: "200",
        data: {}
      };
    }
  },
  {
    url: "/device/disconnect",
    method: "post",
    response: () => {
      return {
        code: "200",
        data: {}
      };
    }
  },
  {
    url: "/device/reboot",
    method: "post",
    response: () => {
      return {
        code: "200",
        data: {}
      };
    }
  }
]);
