(() => {
  const face = document.querySelector('.keyboard-face');
  const tooltip = document.querySelector('.key-hover-label');
  if (!face || !tooltip) return;

  // Compact 98-key layout, with the K98M action-key row beside the function row.
  const rows = [
    { y: 0, x: 0, keys: [['Esc','Esc'], ['F1','F1',1,2/3], ['F2','F2'], ['F3','F3'], ['F4','F4'], ['F5','F5',1,2/3], ['F6','F6'], ['F7','F7'], ['F8','F8'], ['F9','F9',1,2/3], ['F10','F10'], ['F11','F11'], ['F12','F12']] },
    { y: 0, x: 16.5, keys: [['Del','Del'], ['Actions Ring','Actions\nRing'], ['PgUp','PgUp'], ['PgDn','PgDn']] },
    { y: 1.5, x: 0, keys: [['~','~\n`'], ['1','!\n1'], ['2','@\n2'], ['3','#\n3'], ['4','$\n4'], ['5','%\n5'], ['6','^\n6'], ['7','&\n7'], ['8','*\n8'], ['9','(\n9'], ['0',')\n0'], ['-','_\n-'], ['=','+\n='], ['Backspace','Backspace',2]] },
    { y: 2.5, x: 0, keys: [['Tab','TAB',1.5], ['Q','Q'], ['W','W'], ['E','E'], ['R','R'], ['T','T'], ['Y','Y'], ['U','U'], ['I','I'], ['O','O'], ['P','P'], ['[','{\n['], [']','}\n]'], ['\\','|\n\\',1.5]] },
    { y: 3.5, x: 0, keys: [['Caps','CAPS',1.75], ['A','A'], ['S','S'], ['D','D'], ['F','F'], ['G','G'], ['H','H'], ['J','J'], ['K','K'], ['L','L'], [';',':\n;'], ["'",'"\n\''], ['Enter','Enter',2.25]] },
    { y: 4.5, x: 0, keys: [['Shift','SHIFT',2.25], ['Z','Z'], ['X','X'], ['C','C'], ['V','V'], ['B','B'], ['N','N'], ['M','M'], [',','<\n,'], ['.','>\n.'], ['/','?\n/'], ['Shift','SHIFT',1.75]] },
    { y: 4.83, x: 14.5, keys: [['↑','↑']] },
    { y: 5.5, x: 0, keys: [['Ctrl','CTRL',1.25], ['Win','Win',1.25], ['Alt','Alt',1.25], ['Space','',6.25], ['Alt','ALT'], ['Fn','FN'], ['Ctrl','CTRL']] },
    { y: 5.83, x: 13.5, keys: [['←','←'], ['↓','↓'], ['→','→']] },
    { y: 1.5, x: 16.5, keys: [['Num','Num'], ['/','/'], ['*','*'], ['-','−']] },
    { y: 2.5, x: 16.5, keys: [['7','7'], ['8','8'], ['9','9'], ['+','+',1,0,2]] },
    { y: 3.5, x: 16.5, keys: [['4','4'], ['5','5'], ['6','6']] },
    { y: 4.5, x: 16.5, keys: [['1','1'], ['2','2'], ['3','3'], ['Enter','Enter',1,0,2]] },
    { y: 5.5, x: 17.5, keys: [['0','0'], ['.','.']] }
  ];

  const switchCards = new Map(
    [...document.querySelectorAll('[data-axis-card]')].map((card) => [card.dataset.axisCard,
      card.querySelector('h3')?.textContent.trim() || '未命名軸體'
    ])
  );

  const buttons = [];
  for (const row of rows) {
    let x = row.x;
    for (const [name, legend, width = 1, gap = 0, height = 1] of row.keys) {
      x += gap;
      const key = document.createElement('button');
      key.type = 'button';
      key.className = 'key';
      key.dataset.key = name;
      key.dataset.layoutX = x;
      key.dataset.layoutY = row.y;
      key.dataset.layoutWidth = width;
      key.dataset.layoutHeight = height;
      const [upper, lower] = legend.split('\n');
      if (upper) {
        const main = document.createElement('span');
        main.className = 'key-main-legend';
        main.textContent = upper;
        key.append(main);
      }
      if (lower) {
        const sub = document.createElement('span');
        sub.className = 'key-sub-legend';
        sub.textContent = lower;
        key.append(sub);
      }
      face.append(key);
      buttons.push(key);
      x += width;
    }
  }

  function sizeKeyboard() {
    const unit = Math.min(50, Math.max(40, window.innerWidth * 0.037));
    face.style.setProperty('--face-width', `${21 * unit}px`);
    face.style.setProperty('--face-height', `${6.9 * unit}px`);
    face.style.setProperty('--unit', `${unit}px`);
    face.parentElement.style.setProperty('--device-width', `${21 * unit + 28}px`);
    buttons.forEach((key) => {
      key.style.left = `${Number(key.dataset.layoutX) * unit}px`;
      key.style.top = `${Number(key.dataset.layoutY) * unit}px`;
      key.style.width = `${Number(key.dataset.layoutWidth) * unit}px`;
      key.style.height = `${Number(key.dataset.layoutHeight) * unit}px`;
    });
  }
  sizeKeyboard();
  window.addEventListener('resize', sizeKeyboard);

  const assign = (label, axis, occurrence = null) => {
    const matches = buttons.filter((key) => key.dataset.key === label);
    const selected = occurrence === null ? matches : [matches[occurrence]].filter(Boolean);
    selected.forEach((key) => { key.dataset.axis = axis; });
  };

  // Most keys keep the factory Marble switches. Only the user's listed keys
  // are assigned Graywood V4 or Maorbeng Purple.
  buttons.forEach((key) => { key.dataset.axis = 'marble'; });
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ','].forEach((keyName) => assign(keyName, 'purple'));
  assign('/', 'purple', 0); // Main keyboard slash; leave numpad division Marble.
  assign('.', 'purple', 0); // Main keyboard period; leave numpad decimal Marble.
  assign('Shift', 'graywood', 0); // Left Shift
  assign('Caps', 'graywood');
  assign('Space', 'graywood');
  assign('Ctrl', 'purple', 0); // Left Ctrl
  ['Win', 'Alt', 'Fn'].forEach((keyName) => assign(keyName, 'ice'));
  assign('Ctrl', 'ice', 1); // Right Ctrl

  function placeTooltip(x, y) {
    tooltip.classList.add('is-visible');
    const bounds = tooltip.getBoundingClientRect();
    const left = x + 14 + bounds.width > window.innerWidth - 8 ? x - bounds.width - 14 : x + 14;
    const top = y + 14 + bounds.height > window.innerHeight - 8 ? y - bounds.height - 14 : y + 14;
    tooltip.style.left = `${Math.max(8, left)}px`;
    tooltip.style.top = `${Math.max(8, top)}px`;
  }

  function showKey(key, x, y) {
    const axis = key.dataset.axis;
    buttons.forEach((item) => item.classList.toggle('is-active', item === key));
    document.querySelectorAll('[data-axis-card]').forEach((card) => {
      card.classList.toggle('is-active', card.dataset.axisCard === axis);
    });
    tooltip.textContent = switchCards.get(axis) || '尚未標示軸體';
    tooltip.style.setProperty('--tip-accent', getComputedStyle(key).getPropertyValue('--keycap').trim() || '#8cf0c2');
    placeTooltip(x, y);
  }

  function hideTooltip() {
    tooltip.classList.remove('is-visible');
    buttons.forEach((item) => item.classList.remove('is-active'));
    document.querySelectorAll('[data-axis-card]').forEach((card) => card.classList.remove('is-active'));
  }

  buttons.forEach((key) => {
    const axisName = switchCards.get(key.dataset.axis) || '尚未標示軸體';
    key.setAttribute('aria-label', `${key.dataset.key} 鍵，${axisName}`);
    key.addEventListener('mouseenter', (event) => showKey(key, event.clientX, event.clientY));
    key.addEventListener('mousemove', (event) => showKey(key, event.clientX, event.clientY));
    key.addEventListener('mouseleave', hideTooltip);
    key.addEventListener('focus', () => {
      const rect = key.getBoundingClientRect();
      showKey(key, rect.right, rect.top + rect.height / 2);
    });
    key.addEventListener('blur', hideTooltip);
    key.addEventListener('click', (event) => showKey(key, event.clientX, event.clientY));
  });
})();
