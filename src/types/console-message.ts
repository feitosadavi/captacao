import { StackMessageType } from '@/backend/domain/logger.protocols';

export type ConsoleMessage = StackMessageType & { targetName: string }
