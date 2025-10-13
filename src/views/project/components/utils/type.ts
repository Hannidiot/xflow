interface ProjectForm {
  name: string;
  description: string;
  type: string;
}

interface FormProps {
  formInline: ProjectForm;
}

export type { ProjectForm, FormProps };
