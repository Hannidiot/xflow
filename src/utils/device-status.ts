export const getStatusColor = (status: string) => {
  if (status == "device") {
    return "color-success";
  } else if (status == "init") {
    return "color-init";
  } else {
    return "color-error";
  }
};

export const getStatusDescription = (status: string) => {
  if (status == "device") {
    return "在线";
  } else if (status == "init") {
    return "初始化中";
  } else if (status == "offline") {
    return "离线";
  } else {
    return "未知状态";
  }
};

export const getTaskStatusColor = (status: number) => {
  if (status == -1) {
    return "color-error";
  } else if (status == 2) {
    return "color-success";
  } else if (status == 1) {
    return "color-init";
  }
  return "color-offline";
};

export const getTaskDescriptionColor = (status: number) => {
  if (status == -1) {
    return "执行失败";
  } else if (status == 2) {
    return "执行成功";
  } else if (status == 1) {
    return "正在执行";
  }
  return "等待执行";
};
