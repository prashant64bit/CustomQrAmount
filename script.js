const defaultPayeeName = window.UPI?.name;
const defaultUpiId     = window.UPI?.id;

let payeeName = localStorage.getItem('payeeName') || defaultPayeeName;
let upiId     = localStorage.getItem('upiId')     || defaultUpiId;

const payeeNameEl = document.getElementById('payeeName');
const upiIdEl     = document.getElementById('upiId');
const amountInput = document.getElementById('amount');
const editBtn     = document.getElementById('editBtn');
const generateBtn = document.getElementById('generateBtn');
const backBtn     = document.getElementById('backBtn');
const inputArea   = document.getElementById('inputArea');
const qrArea      = document.getElementById('qrArea');
const qrBox       = document.getElementById('qr');
const editModal   = document.getElementById('editModal');
const editNameInput  = document.getElementById('editName');
const editUpiIdInput = document.getElementById('editUpiId');
const saveEdit    = document.getElementById('saveEdit');
const cancelEdit  = document.getElementById('cancelEdit');

payeeNameEl.textContent = payeeName;
upiIdEl.textContent     = upiId;

amountInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/[^0-9.]/g, '');
  const parts = value.split('.');
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('');
  }
  if (parts[1]) {
    parts[1] = parts[1].substring(0, 2);
    value = parts[0] + '.' + parts[1];
  }
  e.target.value = value;
});

editBtn.addEventListener('click', () => {
  editNameInput.value = payeeName;
  editUpiIdInput.value = upiId;
  editModal.style.display = 'flex';
});

cancelEdit.addEventListener('click', () => {
  editModal.style.display = 'none';
});

saveEdit.addEventListener('click', () => {
  payeeName = editNameInput.value.trim() || payeeName;
  upiId     = editUpiIdInput.value.trim() || upiId;

  payeeNameEl.textContent = payeeName;
  upiIdEl.textContent     = upiId;

  localStorage.setItem('payeeName', payeeName);
  localStorage.setItem('upiId', upiId);

  editModal.style.display = 'none';
});

generateBtn.addEventListener('click', () => {
  const amount = amountInput.value.trim();

  if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    alert('Please enter a valid amount');
    return;
  }

  if (!upiId) {
    alert('UPI ID is required. Please edit payee details.');
    return;
  }

  const encodedName = encodeURIComponent(payeeName);
  const upiString = `upi://pay?pa=${upiId}&pn=${encodedName}&am=${amount}&cu=INR`;

  qrBox.innerHTML = '';

  new QRCode(qrBox, {
    text: upiString,
    width: 220,
    height: 220,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  inputArea.style.display = 'none';
  generateBtn.style.display = 'none';

  qrArea.style.display = 'block';
  backBtn.style.display = 'block';
  backBtn.textContent = 'Back';
});

backBtn.addEventListener('click', () => {
  qrArea.style.display = 'none';
  backBtn.style.display = 'none';
  qrBox.innerHTML = '';

  inputArea.style.display = 'block';
  generateBtn.style.display = 'block';
  editBtn.style.display = 'flex';

  amountInput.value = '';
});