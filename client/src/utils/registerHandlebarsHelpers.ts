import Handlebars from 'handlebars';
import formatDateTime from './formatDateTime';

Handlebars.registerHelper('areEqual', (value1: string | number, value2: string | number): boolean => (
  value1 === value2
));

Handlebars.registerHelper('formatTime', (value: string | undefined | null): string => {
  if (!value) {
    return '';
  }

  return formatDateTime(value, 'time');
});

Handlebars.registerHelper('formatDateTime', (value: string | undefined | null): string => {
  if (!value) {
    return '';
  }

  return formatDateTime(value, 'full');
});

Handlebars.registerHelper('isLessThanOne', (value: number | undefined): boolean => !value || value < 1);

Handlebars.registerHelper('addAvatar', (imageUrl: string | undefined | null): string | Handlebars.SafeString => {
  if (imageUrl) {
    const avatarInlineStyles = `style="background-image: url(${imageUrl}); background-size: cover;"`;
    return new Handlebars.SafeString(avatarInlineStyles);
  }
  return '';
});
