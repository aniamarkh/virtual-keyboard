import {
  keyLayoutEn, keyLayoutRu, keyLayoutShiftOffEn,
  keyLayoutShiftOnEn, keyLayoutShiftOffRu, keyLayoutShiftOnRu,
} from './keyboard_layout.js';

document.body.innerHTML += `<div class="header">
<h1>Virtual keyboard</h1>    
<textarea class="use-keyboard-input" placeholder="click to start.."></textarea>
<p>Press CTRL + ALT to switch language</p>
<p>Keyboard for Windows operating system</p>
</div>`;

const DEFAULT_LANG = 'en';
const language = localStorage.getItem('language') || DEFAULT_LANG;

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capslock: false,
    shift: false,
    lang: language,
  },

  keyCodes: [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
    'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
  ],

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          // eslint-disable-next-line no-param-reassign
          element.value = currentValue;
        });
      });
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();

    const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

    let keyLayout;
    this.properties.lang = localStorage.getItem('language');
    if (this.properties.lang === 'en') {
      keyLayout = keyLayoutEn;
    } else {
      keyLayout = keyLayoutRu;
    }

    keyLayout.forEach((key, i) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', '\\', 'enter', 'shift2'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.setAttribute('ev', this.keyCodes[i]);
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'up':
          keyElement.classList.add('keyboard__key--light');
          keyElement.innerHTML = createIconHTML('arrow_upward');

          keyElement.addEventListener('click', () => {
            this.properties.value += '↑';
            this.triggerEvent('oninput');
          });

          break;

        case 'left':
          keyElement.classList.add('keyboard__key', 'keyboard__key--light');
          keyElement.innerHTML = createIconHTML('arrow_back');

          keyElement.addEventListener('click', () => {
            this.properties.value += '←';
            this.triggerEvent('oninput');
          });

          break;

        case 'down':
          keyElement.classList.add('keyboard__key', 'keyboard__key--light');
          keyElement.innerHTML = createIconHTML('arrow_downward');

          keyElement.addEventListener('click', () => {
            this.properties.value += '↓';
            this.triggerEvent('oninput');
          });

          break;

        case 'right':
          keyElement.classList.add('keyboard__key', 'keyboard__key--light');
          keyElement.innerHTML = createIconHTML('arrow_forward');

          keyElement.addEventListener('click', () => {
            this.properties.value += '→';
            this.triggerEvent('oninput');
          });

          break;

        case 'backspace':
          keyElement.classList.add('keyboard__key--medium');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value
              .substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });

          break;

        case 'tab':
          keyElement.classList.add('keyboard__key', 'keyboard__key--medium');
          keyElement.innerHTML = createIconHTML('keyboard_tab');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\t';
            this.triggerEvent('oninput');
          });

          break;

        case 'caps':
          keyElement.classList.add('keyboard__key--medium', 'keyboard__key--activatable', 'caps');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active');
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--medium', 'enter');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--medium', 'keyboard__key--activatable', 'shift');
          keyElement.innerHTML += 'shift';

          keyElement.addEventListener('click', () => {
            this.onShift();
            keyElement.classList.toggle('keyboard__key--active');
          });
          document.addEventListener('keydown', (event) => {
            if (event.code === 'ShiftLeft') {
              this.onShift();
              keyElement.classList.toggle('keyboard__key--active');
            }
          });
          document.addEventListener('keyup', (event) => {
            if (event.code === 'ShiftLeft') {
              this.offShift();
              keyElement.classList.toggle('keyboard__key--active');
            }
          });

          break;

        case 'shift2':
          keyElement.classList.add('keyboard__key--medium', 'keyboard__key--activatable', 'shift2');
          keyElement.innerHTML += 'shift';

          keyElement.addEventListener('click', () => {
            this.onShift();
            keyElement.classList.toggle('keyboard__key--active');
          });

          document.addEventListener('keydown', (event) => {
            if (event.code === 'ShiftRight') {
              this.onShift();
              keyElement.classList.toggle('keyboard__key--active');
            }
          });
          document.addEventListener('keyup', (event) => {
            if (event.code === 'ShiftRight') {
              this.offShift();
              keyElement.classList.toggle('keyboard__key--active');
            }
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });

          break;

        case 'done':
          keyElement.classList.add('keyboard__key');
          keyElement.innerHTML = createIconHTML('done');

          keyElement.addEventListener('click', () => {
            this.close();
          });
          break;

        case 'alt1':
          keyElement.classList.add('keyboard__key', 'alt1');
          keyElement.setAttribute('id', 'alt1');
          keyElement.innerHTML += 'alt';

          break;

        case 'alt2':
          keyElement.classList.add('keyboard__key', 'alt2');
          keyElement.setAttribute('id', 'alt2');
          keyElement.innerHTML += 'alt';

          break;

        case 'ctrl1':
          keyElement.classList.add('keyboard__key', 'ctrl1');
          keyElement.setAttribute('id', 'ctrl1');
          keyElement.innerHTML += 'ctrl';

          break;

        case 'ctrl2':
          keyElement.classList.add('keyboard__key', 'ctrl2');
          keyElement.setAttribute('id', 'ctrl2');
          keyElement.innerHTML += 'ctrl';

          break;

        default:
          keyElement.classList.add('char');
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += keyElement.textContent;
            this.triggerEvent('oninput');
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsLock() {
    this.properties.capslock = !this.properties.capslock;
    let i = 0;
    this.elements.keys.forEach((key) => {
      if (key.innerHTML !== 'shift'
      && key.innerHTML !== 'del'
      && key.innerHTML !== 'en'
      && key.innerHTML !== 'ru'
      && key.innerHTML !== 'alt'
      && key.innerHTML !== 'ctrl') {
        if (key.childElementCount === 0) {
          this.elements.keys[i].textContent = this.properties.capslock
            ? key.textContent.toUpperCase()
            : key.textContent.toLowerCase();
        }
      }
      i += 1;
    });
  },

  onShift() {
    this.properties.shift = true;
    let i = 0;
    if (this.properties.lang === 'en') {
      this.elements.keys.forEach((key) => {
        this.elements.keys[i].innerHTML = keyLayoutShiftOnEn[i];
        if (this.elements.keys[i].innerHTML === 'shift') {
          key.addEventListener('click', () => {
            this.offShift();
          });
        }
        i += 1;
      });
    } else {
      this.elements.keys.forEach((key) => {
        this.elements.keys[i].innerHTML = keyLayoutShiftOnRu[i];
        i += 1;
        if (key.innerHTML === 'shift') {
          key.addEventListener('click', () => {
            this.offShift();
          });
        }
      });
    }
  },

  offShift() {
    this.properties.shift = false;
    let i = 0;

    if (this.properties.lang === 'en') {
      this.elements.keys.forEach((key) => {
        this.elements.keys[i].innerHTML = keyLayoutShiftOffEn[i];
        i += 1;
        if (key.innerHTML === 'shift') {
          key.addEventListener('click', () => {
            this.onShift();
          });
        }
      });
    }

    if (this.properties.lang === 'ru') {
      this.elements.keys.forEach((key) => {
        this.elements.keys[i].innerHTML = keyLayoutShiftOffRu[i];
        i += 1;
        if (key.innerHTML === 'shift') {
          key.addEventListener('click', () => {
            this.onShift();
          });
        }
      });
    }
  },

  triggerLang() {
    let i = 0;

    if (this.properties.lang === 'en') {
      this.properties.lang = 'ru';
      this.elements.keys.forEach((key) => {
        if (key.classList.contains('keyboard__key--active')) {
          key.classList.remove('keyboard__key--active');
        }
        this.elements.keys[i].innerHTML = keyLayoutShiftOffRu[i];
        i += 1;
      });
    } else {
      this.properties.lang = 'en';
      this.elements.keys.forEach((key) => {
        if (key.classList.contains('keyboard__key--active')) {
          key.classList.remove('keyboard__key--active');
        }
        this.elements.keys[i].innerHTML = keyLayoutShiftOffEn[i];
        i += 1;
      });
    }
    localStorage.setItem('language', this.properties.lang);
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  },

};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});

const charEvents = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal',
  'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
  'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash',
];

function pressed(eventCode) {
  document.querySelector(`[ev=${eventCode}]`).classList.add('keyboard__key--press');
  Keyboard.properties.value += document.querySelector(`[ev=${eventCode}]`).textContent;
  Keyboard.triggerEvent('oninput');
  setTimeout(() => {
    document.querySelector(`[ev=${eventCode}]`).classList.remove('keyboard__key--press');
  }, '200');
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    document.querySelector("[ev='Enter']").classList.add('keyboard__key--press');
    Keyboard.properties.value += '\n';
    Keyboard.triggerEvent('oninput');
    setTimeout(() => {
      document.querySelector("[ev='Enter']").classList.remove('keyboard__key--press');
    }, '200');
  } else if (event.code === 'ArrowUp') {
    event.preventDefault();
    document.querySelector("[ev='ArrowUp']").classList.add('keyboard__key--press');
    Keyboard.properties.value += '↑';
    Keyboard.triggerEvent('oninput');
    setTimeout(() => {
      document.querySelector("[ev='ArrowUp']").classList.remove('keyboard__key--press');
    }, '200');
  } else if (event.code === 'ArrowLeft') {
    event.preventDefault();
    document.querySelector("[ev='ArrowLeft']").classList.add('keyboard__key--press');
    Keyboard.properties.value += '←';
    Keyboard.triggerEvent('oninput');
    setTimeout(() => {
      document.querySelector("[ev='ArrowLeft']").classList.remove('keyboard__key--press');
    }, '200');
  } else if (event.code === 'ArrowDown') {
    event.preventDefault();
    document.querySelector("[ev='ArrowDown']").classList.add('keyboard__key--press');
    Keyboard.properties.value += '↓';
    Keyboard.triggerEvent('oninput');
    setTimeout(() => {
      document.querySelector("[ev='ArrowDown']").classList.remove('keyboard__key--press');
    }, '200');
  } else if (event.code === 'ArrowRight') {
    event.preventDefault();
    document.querySelector("[ev='ArrowRight']").classList.add('keyboard__key--press');
    Keyboard.properties.value += '→';
    Keyboard.triggerEvent('oninput');
    setTimeout(() => {
      document.querySelector("[ev='ArrowRight']").classList.remove('keyboard__key--press');
    }, '200');
  } else if (event.code === 'Backspace') {
    event.preventDefault();
    document.querySelector("[ev='Backspace']").classList.add('keyboard__key--press');
    Keyboard.properties.value = Keyboard.properties.value
      .substring(0, Keyboard.properties.value.length - 1);
    Keyboard.triggerEvent('oninput');
    setTimeout(() => {
      document.querySelector("[ev='Backspace']").classList.remove('keyboard__key--press');
    }, '200');
  } else if (event.code === 'Tab') {
    event.preventDefault();
    document.querySelector("[ev='Tab']").classList.add('keyboard__key--press');
    Keyboard.properties.value += '\t';
    Keyboard.triggerEvent('oninput');
    setTimeout(() => {
      document.querySelector("[ev='Tab']").classList.remove('keyboard__key--press');
    }, '200');
  } else if (event.code === 'CapsLock') {
    Keyboard.toggleCapsLock();
    document.querySelector("[ev='CapsLock']").classList.toggle('keyboard__key--active');
  } else if (event.code === 'Space') {
    event.preventDefault();
    document.querySelector("[ev='Space']").classList.add('keyboard__key--press');
    Keyboard.properties.value += ' ';
    Keyboard.triggerEvent('oninput');
    setTimeout(() => {
      document.querySelector("[ev='Space']").classList.remove('keyboard__key--press');
    }, '200');
  } else if (event.code === 'ControlLeft') {
    event.preventDefault();
    document.querySelector("[ev='ControlLeft']").classList.add('keyboard__key--press');
    setTimeout(() => {
      document.querySelector("[ev='ControlLeft']").classList.remove('keyboard__key--press');
    }, '200');
  } else if (event.code === 'AltLeft') {
    event.preventDefault();
    document.querySelector("[ev='AltLeft']").classList.add('keyboard__key--press');
    setTimeout(() => {
      document.querySelector("[ev='AltLeft']").classList.remove('keyboard__key--press');
    }, '200');
  } else if (event.code === 'ControlRight') {
    event.preventDefault();
    document.querySelector("[ev='ControlRight']").classList.add('keyboard__key--press');
    setTimeout(() => {
      document.querySelector("[ev='ControlRight']").classList.remove('keyboard__key--press');
    }, '200');
  } else if (event.code === 'AltRight') {
    event.preventDefault();
    document.querySelector("[ev='AltRight']").classList.add('keyboard__key--press');
    setTimeout(() => {
      document.querySelector("[ev='AltRight']").classList.remove('keyboard__key--press');
    }, '200');
  } else {
    charEvents.forEach((char) => {
      if (event.code === char) {
        event.preventDefault();
        pressed(event.code);
      }
    });
  }
});

let flag = false;

document.addEventListener('keydown', (event) => {
  if (event.code === 'ControlLeft') {
    flag = true;
  }
  if (event.code === 'AltLeft' && flag) {
    Keyboard.triggerLang();
    flag = false;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'ControlLeft') {
    flag = false;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'AltRight') {
    flag = true;
  }
  if (event.code === 'ControlRight' && flag) {
    Keyboard.triggerLang();
    flag = false;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'AltRight') {
    flag = false;
  }
});

let flag2 = false;

document.addEventListener('keydown', (event) => {
  if (event.code === 'AltLeft') {
    flag2 = true;
  }
  if (event.code === 'ControlLeft' && flag2) {
    Keyboard.triggerLang();
    flag2 = false;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'AltLeft') {
    flag2 = false;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'ControlRight') {
    flag2 = true;
  }
  if (event.code === 'AltRight' && flag2) {
    Keyboard.triggerLang();
    flag2 = false;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'ControlRight') {
    flag2 = false;
  }
});
