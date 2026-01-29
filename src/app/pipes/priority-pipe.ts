import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../enums/task-priority.enum';

@Pipe({
  name: 'priority',
  standalone: true
})
export class PriorityPipe implements PipeTransform {

  transform(value: TaskPriority): string {
    switch(value) {
      case TaskPriority.HIGH:
        return '🔴 גבוהה';
      case TaskPriority.MEDIUM:
        return '🟡 בינונית';
      case TaskPriority.LOW:
        return '🟢 נמוכה';
      default:
        return '⚪ לא הוגדר';
    }
  }

}
