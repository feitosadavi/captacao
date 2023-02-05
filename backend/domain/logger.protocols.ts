export type StackMessageType = {
  type: 'success' | 'info' | 'error' | 'warning',
  label: string
  description: string
}

export type ProgressMessageType = {
  current: number
  total: number
}

export type LogMessageType = {
  type: 'progress' | 'stack',
  content: ProgressMessageType | StackMessageType
}

export interface ILogger {
  emit (channel: string, message: LogMessageType | ProgressMessageType): Promise<void>
  on (channel: string, cb: any): Promise<void>
}