import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true
})
  export class CapitalizePipe implements PipeTransform {
  
    transform(value: string): string {
      if (!value) return value;
  
      // Replace underscores with spaces
      const formattedValue = value.replace(/_/g, ' ');
  
      // Capitalize the first letter and lowercase the rest
      return formattedValue
        .split(' ')  // Split into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize each word
        .join(' ');  // Join the words back with spaces
    }
  }

