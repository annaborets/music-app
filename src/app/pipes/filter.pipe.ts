import { Pipe, PipeTransform } from '@angular/core';

import { FormattedResponseItem, Liked } from '../models/formattedResponse';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(albums: (FormattedResponseItem & Liked)[], filterText: string) {
    if (filterText === '') {
      return albums;
    } else {
      return albums.filter((album) => {
        return album.name.toLowerCase().includes(filterText.toLowerCase());
      });
    }
  }
}
