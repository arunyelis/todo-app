// src/utils/voiceCommandProcessor.ts
import { Priority } from '../types';

type CommandResult = {
  action: 'add' | 'delete' | 'complete' | 'filter' | 'unknown';
  taskName?: string;
  priority?: Priority;
  filterType?: 'all' | 'active' | 'completed';
  taskId?: number;
};

export function processVoiceCommand(command: string): CommandResult {
  // Convert to lowercase for easier matching
  const lowerCommand = command.toLowerCase().trim();

  // Add task command
  if (lowerCommand.startsWith('add') || lowerCommand.startsWith('create')) {
    const taskMatch = lowerCommand.match(/^(add|create)(\s+task)?\s+(.+)$/i);

    if (taskMatch && taskMatch[3]) {
      let taskName = taskMatch[3];
      let priority: Priority = 'low';

      // Extract priority if specified
      if (taskName.includes('high priority')) {
        priority = 'high';
        taskName = taskName.replace('high priority', '').trim();
      } else if (taskName.includes('medium priority')) {
        priority = 'medium';
        taskName = taskName.replace('medium priority', '').trim();
      } else if (taskName.includes('low priority')) {
        priority = 'low';
        taskName = taskName.replace('low priority', '').trim();
      }

      return {
        action: 'add',
        taskName,
        priority,
      };
    }
  }

  // Filter commands
  if (
    lowerCommand.includes('show all') ||
    lowerCommand.includes('filter all')
  ) {
    return { action: 'filter', filterType: 'all' };
  }

  if (
    lowerCommand.includes('show active') ||
    lowerCommand.includes('filter active')
  ) {
    return { action: 'filter', filterType: 'active' };
  }

  if (
    lowerCommand.includes('show completed') ||
    lowerCommand.includes('filter completed')
  ) {
    return { action: 'filter', filterType: 'completed' };
  }

  // Unknown command
  return { action: 'unknown' };
}
