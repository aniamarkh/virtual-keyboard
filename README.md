# Virtual Keyboard
[Deploy](https://aniamarkh.github.io/virtual-keyboard/)

For this project, I created a virtual keyboard with the following functionalities:
- The design of the virtual keyboard was at my discretion.
- I generated all necessary elements using JavaScript, and the index.html file was empty.
- Pressing a key on a physical keyboard highlighted the corresponding key on the virtual keyboard.
- When multiple buttons were pressed, all pressed buttons were highlighted on the virtual keyboard, including Ctrl, Alt, and Shift.
- The virtual keyboard could switch between two language layouts, with the language buttons displaying symbols of the selected language.
- Keystrokes were animated.
- Clicking on the virtual keyboard buttons or pressing keys on a physical keyboard input symbols to the text area above the virtual keyboard.
- Pressing Enter moved the text cursor to the next line.
- Pressing Tab created a horizontal indent.
- The Backspace key removed the character before the text cursor, and Del removed the character after it.
- The Shift, Alt, Ctrl, Caps lock, and Space keys worked as on a real keyboard.
## Technical Requirements:

- The virtual keyboard works on the latest version of Google Chrome.
- I did not use JQuery or other JS libraries, Bootstrap or other UI libraries, or Angular/React/Vue and other frameworks.
- I used ESLint (eslint-config-airbnb-base), with the option to ignore the import/extensions rule if using modules and needing to import them into the main file.
