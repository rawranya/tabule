import { app, analytics } from './firebase.js';

console.log('Firebase app:', app);
console.log('Firebase analytics:', analytics);

const months = [
  { name: "January", days: 31 },
  { name: "February", days: 28 }, // Leap year handled below
  { name: "March", days: 31 },
  { name: "April", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "August", days: 31 },
  { name: "September", days: 30 },
  { name: "October", days: 31 },
  { name: "November", days: 30 },
  { name: "December", days: 31 }
];

const currentYear = new Date().getFullYear();
const isLeap = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

if (isLeap(currentYear)) months[1].days = 29;

const monthMenu = document.getElementById('monthMenu');
const tableContainer = document.getElementById('tableContainer');
let selectedMonth = new Date().getMonth();

function getStorageKey(monthIdx) {
  return `attendance-table-${currentYear}-${monthIdx}`;
}

function saveTableData(monthIdx, data) {
  localStorage.setItem(getStorageKey(monthIdx), JSON.stringify(data));
}

function loadTableData(monthIdx) {
  const data = localStorage.getItem(getStorageKey(monthIdx));
  return data ? JSON.parse(data) : {};
}

function renderMonthMenu() {
  monthMenu.innerHTML = '';
  months.forEach((m, idx) => {
    const btn = document.createElement('button');
    btn.className = 'month-btn' + (idx === selectedMonth ? ' active' : '');
    btn.textContent = m.name;
    btn.onclick = () => {
      selectedMonth = idx;
      renderMonthMenu();
      renderTable();
    };
    monthMenu.appendChild(btn);
  });
}

function renderTable() {
  const month = months[selectedMonth];
  const days = month.days;
  const data = loadTableData(selectedMonth);

  let html = `<div class="table-wrap"><table class="attendance-table">
    <thead>
      <tr>
        <th rowspan="2">Date</th>
        <th colspan="3">Person 1</th>
        <th colspan="3">Person 2</th>
      </tr>
      <tr>
        <th>Name</th><th>MOP</th><th>Chip</th>
        <th>Name</th><th>MOP</th><th>Chip</th>
      </tr>
    </thead>
    <tbody>
  `;

  for (let d = 1; d <= days; d++) {
    const row1Key = `${d}-0`;
    const row2Key = `${d}-1`;
    const row1 = data[row1Key] || { name: '', mop: '', chip: 'Ano' };
    const row2 = data[row2Key] || { name: '', mop: '', chip: 'Ano' };

    html += `<tr class="person-row">
      <td rowspan="2" style="vertical-align: middle; text-align: center; font-weight: 600;">${d}.${selectedMonth + 1}.</td>
      <td>
        <input type="text" data-day="${d}" data-person="0" data-field="name" value="${row1.name || ''}" placeholder="First name and surname">
      </td>
      <td>
        <input type="text" data-day="${d}" data-person="0" data-field="mop" value="${row1.mop || ''}" placeholder="MOP">
      </td>
      <td>
        <select data-day="${d}" data-person="0" data-field="chip">
          <option value="Ano"${row1.chip === 'Ano' ? ' selected' : ''}>Ano</option>
          <option value="Ne"${row1.chip === 'Ne' ? ' selected' : ''}>Ne</option>
        </select>
      </td>
      <td>
        <input type="text" data-day="${d}" data-person="1" data-field="name" value="${row2.name || ''}" placeholder="First name and surname">
      </td>
      <td>
        <input type="text" data-day="${d}" data-person="1" data-field="mop" value="${row2.mop || ''}" placeholder="MOP">
      </td>
      <td>
        <select data-day="${d}" data-person="1" data-field="chip">
          <option value="Ano"${row2.chip === 'Ano' ? ' selected' : ''}>Ano</option>
          <option value="Ne"${row2.chip === 'Ne' ? ' selected' : ''}>Ne</option>
        </select>
      </td>
    </tr>
    <tr class="person-row">
      <td>
        <input type="text" data-day="${d}" data-person="0" data-field="name2" style="visibility:hidden;" tabindex="-1" disabled>
      </td>
      <td>
        <input type="text" data-day="${d}" data-person="0" data-field="mop2" style="visibility:hidden;" tabindex="-1" disabled>
      </td>
      <td>
        <select data-day="${d}" data-person="0" data-field="chip2" style="visibility:hidden;" tabindex="-1" disabled>
          <option>Ano</option><option>Ne</option>
        </select>
      </td>
      <td>
        <input type="text" data-day="${d}" data-person="1" data-field="name2" style="visibility:hidden;" tabindex="-1" disabled>
      </td>
      <td>
        <input type="text" data-day="${d}" data-person="1" data-field="mop2" style="visibility:hidden;" tabindex="-1" disabled>
      </td>
      <td>
        <select data-day="${d}" data-person="1" data-field="chip2" style="visibility:hidden;" tabindex="-1" disabled>
          <option>Ano</option><option>Ne</option>
        </select>
      </td>
    </tr>
    `;
  }

  html += `</tbody></table></div>`;
  tableContainer.innerHTML = html;

  tableContainer.querySelectorAll('input:not([disabled]),select:not([disabled])').forEach(el => {
    el.addEventListener('change', function () {
      const day = this.getAttribute('data-day');
      const person = this.getAttribute('data-person');
      const field = this.getAttribute('data-field');
      const key = `${day}-${person}`;
      const tableData = loadTableData(selectedMonth);
      if (!tableData[key]) tableData[key] = { name: '', mop: '', chip: 'Ano' };
      tableData[key][field.replace('2','')] = this.value;
      saveTableData(selectedMonth, tableData);
    });
  });
}

renderMonthMenu();
renderTable();
