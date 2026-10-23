(() => {
  const face = document.querySelector('.keyboard-face');
  const tooltip = document.querySelector('.key-hover-label');
  if (!face || !tooltip) return;

  // Key widths and staggered positions follow the supplied Keyboard Layout Editor layout.
  const rows = [
    { y: 0, x: 0, keys: [['Esc','Esc'], ['F1','F1',1,.25], ['F2','F2'], ['F3','F3'], ['F4','F4'], ['F5','F5',1,.25], ['F6','F6'], ['F7','F7'], ['F8','F8'], ['F9','F9',1,.25], ['F10','F10'], ['F11','F11'], ['F12','F12']] },
    { y: 1.5, x: 0, keys: [['~','~\n`'], ['1','!\n1'], ['2','@\n2'], ['3','#\n3'], ['4','$\n4'], ['5','%\n5'], ['6','^\n6'], ['7','&\n7'], ['8','*\n8'], ['9','(\n9'], ['0',')\n0'], ['-','_\n-'], ['=','+\n='], ['Backspace','Backspace',2], ['DEL','DEL',1,.5]] },
    { y: 2.5, x: 0, keys: [['Tab','TAB',1.5], ['Q','Q'], ['W','W'], ['E','E'], ['R','R'], ['T','T'], ['Y','Y'], ['U','U'], ['I','I'], ['O','O'], ['P','P'], ['[','{\n['], [']','}\n]'], ['\\','|\n\\',1.5], ['PRNT','PRNT',1,.5]] },
    { y: 3.5, x: 0, keys: [['Caps','CAPS',1.75], ['A','A'], ['S','S'], ['D','D'], ['F','F'], ['G','G'], ['H','H'], ['J','J'], ['K','K'], ['L','L'], [';',':\n;'], ["'",'"\n\''], ['Enter','Enter',2.25], ['Page Up','Page Up',1,.5]] },
    { y: 4.5, x: 0, keys: [['Shift','SHIFT',2.25], ['Z','Z'], ['X','X'], ['C','C'], ['V','V'], ['B','B'], ['N','N'], ['M','M'], [',','<\n,'], ['.','>\n.'], ['/','?\n/'], ['Shift','SHIFT',1.75], ['Page Down','Page Down',1,1.5]] },
    { y: 4.75, x: 14.25, keys: [['↑','↑']] },
    { y: 5.5, x: 0, keys: [['Ctrl','CTRL',1.25], ['Win','Win',1.25], ['Alt','Alt',1.25], ['Space','',6.25], ['Alt','ALT'], ['Fn','FN'], ['Ctrl','CTRL']] },
    { y: 5.75, x: 13.25, keys: [['←','←'], ['↓','↓'], ['→','→']] }
  ];

  const switchCards = new Map(
    [...document.querySelectorAll('[data-axis-card]')].map((card) => [card.dataset.axisCard,
      card.querySelector('h3')?.textContent.trim() || '未命名軸體'
    ])
  );

  const buttons = [];
  for (const row of rows) {
    let x = row.x;
    for (const [name, legend, width = 1, gap = 0] of row.keys) {
      x += gap;
      const key = document.createElement('button');
      key.type = 'button';
      key.className = 'key';
      key.dataset.key = name;
      key.dataset.layoutX = x;
      key.dataset.layoutY = row.y;
      key.dataset.layoutWidth = width;
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

  const controls = document.createElement('div');
  controls.className = 'board-controls';
  controls.setAttribute('aria-label', '點陣螢幕與旋鈕');
  controls.innerHTML = '<span class="matrix-screen" aria-hidden="true">' + '<i></i>'.repeat(20) + '</span><span class="control-icons" aria-hidden="true"><span>◈</span><span>♪</span></span><span class="knob" aria-hidden="true"></span>';
  face.append(controls);

  function sizeKeyboard() {
    const unit = Math.min(50, Math.max(40, window.innerWidth * 0.037));
    face.style.setProperty('--face-width', `${17 * unit}px`);
    face.style.setProperty('--face-height', `${6.75 * unit}px`);
    face.style.setProperty('--unit', `${unit}px`);
    face.parentElement.style.setProperty('--device-width', `${17 * unit + 28}px`);
    controls.style.left = `${14 * unit}px`;
    controls.style.width = `${2.5 * unit}px`;
    controls.style.height = `${unit}px`;
    buttons.forEach((key) => {
      key.style.left = `${Number(key.dataset.layoutX) * unit}px`;
      key.style.top = `${Number(key.dataset.layoutY) * unit}px`;
      key.style.width = `${Number(key.dataset.layoutWidth) * unit}px`;
    });
  }
  sizeKeyboard();
  window.addEventListener('resize', sizeKeyboard);

  const assign = (label, axis, occurrence = null) => {
    const matches = buttons.filter((key) => key.dataset.key === label);
    const selected = occurrence === null ? matches : [matches[occurrence]].filter(Boolean);
    selected.forEach((key) => { key.dataset.axis = axis; });
  };

  // Factory Marble switches remain on every key that has not been replaced.
  buttons.forEach((key) => { key.dataset.axis = 'marble'; });
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((letter) => assign(letter, 'ice'));
  ['Space', 'Backspace', 'Enter'].forEach((keyName) => assign(keyName, 'graywood'));
  assign('Shift', 'graywood', 0);
  ['Tab', 'Caps', 'Win', 'Alt', 'Fn', ...Array.from({length: 12}, (_, i) => `F${i + 1}`), 'DEL', 'PRNT', 'Page Up', 'Page Down', 'Ctrl'].forEach((keyName) => assign(keyName, 'purple'));
  assign('Shift', 'purple', 1);

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
