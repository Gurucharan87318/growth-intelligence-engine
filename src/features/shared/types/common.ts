export type BaseRecord = {
  id: string;
  created_at?: string;
  updated_at?: string;
};

export type PageIntro = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export type MetricItem = {
  label: string;
  value: string;
  hint?: string;
};

export type SelectOption = {
  label: string;
  value: string;
};
