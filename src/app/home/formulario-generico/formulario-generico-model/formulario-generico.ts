export interface FormField {
    label: string;
    name: string;
    type: 'text' | 'select' | 'checkbox'; // Puedes añadir más tipos según tus necesidades
    options?: { value: string, label: string }[];
  }