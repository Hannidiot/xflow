type DeviceForm = {
  ip: string;
  port: string;
};
interface FormProps {
  formInline: DeviceForm;
}

export type { DeviceForm, FormProps };
