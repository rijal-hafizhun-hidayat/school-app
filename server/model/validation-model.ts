export interface Validation {
  statusCode: number;
  statusMessage: string;
  data: Record<string, string[]>;
}
