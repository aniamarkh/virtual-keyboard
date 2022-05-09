const keyLayoutEn = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
  'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
  'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
  'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'up', 'shift2',
  'ctrl1', 'alt1', 'space', 'alt2', 'ctrl2', 'left', 'down', 'right', 'done',
];

const keyLayoutRu = [
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
  'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
  'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
  'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'up', 'shift2',
  'ctrl1', 'alt1', 'space', 'alt2', 'ctrl2', 'left', 'down', 'right', 'done',
];

const keyLayoutShiftOnEn = [
  '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '<i class="material-icons">backspace</i>',
  '<i class="material-icons">keyboard_tab</i>', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
  '<i class="material-icons">keyboard_capslock</i>', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '<i class="material-icons">keyboard_return</i>',
  'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '<i class="material-icons">arrow_upward</i>', 'shift',
  'ctrl', 'alt', '<i class="material-icons">space_bar</i>', 'ctrl', 'alt', '<i class="material-icons">arrow_back</i>', '<i class="material-icons">arrow_downward</i>', '<i class="material-icons">arrow_forward</i>',
  '<i class="material-icons">done</i>',
];
const keyLayoutShiftOnRu = [
  'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', '<i class="material-icons">backspace</i>',
  '<i class="material-icons">keyboard_tab</i>', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/',
  '<i class="material-icons">keyboard_capslock</i>', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '<i class="material-icons">keyboard_return</i>',
  'shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '<i class="material-icons">arrow_upward</i>', 'shift',
  'ctrl', 'alt', '<i class="material-icons">space_bar</i>', 'ctrl', 'alt', '<i class="material-icons">arrow_back</i>', '<i class="material-icons">arrow_downward</i>', '<i class="material-icons">arrow_forward</i>',
  '<i class="material-icons">done</i>',
];
const keyLayoutShiftOffEn = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '<i class="material-icons">backspace</i>',
  '<i class="material-icons">keyboard_tab</i>', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
  '<i class="material-icons">keyboard_capslock</i>', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '<i class="material-icons">keyboard_return</i>',
  'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '<i class="material-icons">arrow_upward</i>', 'shift',
  'ctrl', 'alt', '<i class="material-icons">space_bar</i>', 'ctrl', 'alt', '<i class="material-icons">arrow_back</i>', '<i class="material-icons">arrow_downward</i>', '<i class="material-icons">arrow_forward</i>',
  '<i class="material-icons">done</i>',
];
const keyLayoutShiftOffRu = [
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '<i class="material-icons">backspace</i>',
  '<i class="material-icons">keyboard_tab</i>', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
  '<i class="material-icons">keyboard_capslock</i>', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '<i class="material-icons">keyboard_return</i>',
  'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '<i class="material-icons">arrow_upward</i>', 'shift',
  'ctrl', 'alt', '<i class="material-icons">space_bar</i>', 'ctrl', 'alt', '<i class="material-icons">arrow_back</i>', '<i class="material-icons">arrow_downward</i>', '<i class="material-icons">arrow_forward</i>',
  '<i class="material-icons">done</i>',
];

export {
  keyLayoutEn, keyLayoutRu, keyLayoutShiftOffEn,
  keyLayoutShiftOnEn, keyLayoutShiftOffRu, keyLayoutShiftOnRu,
};
