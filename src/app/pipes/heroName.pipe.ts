import { Pipe, PipeTransform } from '@angular/core';
import * as constants from '../dota_constants/index.js';

const heroes = constants.heroes;

@Pipe({name: 'heroName'})
export class HeroNamePipe implements PipeTransform {
  transform(value: number): string {
    const hero = heroes[value];
    return hero.localized_name;
  }
}
