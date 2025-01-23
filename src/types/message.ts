export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isCondolence: boolean;
  response?: string;
}

export interface ResponseTemplate {
  id: string;
  content: string;
  name: string;
}