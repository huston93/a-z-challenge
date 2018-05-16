import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'matchDuration'})
export class MatchDurationPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 3600),
    minutes = Math.floor(value % 3600 / 60),
    seconds = Math.floor(value % 3600 % 60);

    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);

  }
}
