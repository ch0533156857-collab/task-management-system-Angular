import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../enums/task-status.enum';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: TaskStatus): string {
    switch(value) {
      case TaskStatus.TODO:
        return '📝 לביצוע';
      case TaskStatus.IN_PROGRESS:
        return '🚧 בתהליך';
      case TaskStatus.DONE:
        return '✅ הושלם';
      default:
        return '⚪ לא הוגדר';
    }
  }

}
