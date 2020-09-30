import { Pipe, PipeTransform } from '@angular/core';
import * as marked from "marked";
@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return marked(value);
  }

}
