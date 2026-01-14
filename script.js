document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("payeeName").textContent = UPI.name;
  document.getElementById("upiId").textContent = UPI.id;
  document.getElementById("generateBtn").addEventListener("click", generateQR);
  document.getElementById("shareBtn").addEventListener("click", goBack);
});

function buildUPILink(amount) {
  return `upi://pay?pa=${encodeURIComponent(UPI.id)}&pn=${encodeURIComponent(UPI.name)}&cu=${encodeURIComponent(UPI.currency)}&am=${encodeURIComponent(amount)}`;
}

function generateQR() {
  const amountInput = document.getElementById("amount");
  const amount = amountInput.value.trim();
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    alert("Please enter a valid amount greater than 0");
    amountInput.focus();
    return;
  }
  const link = buildUPILink(amount);
  const qrContainer = document.getElementById("qr");
  qrContainer.innerHTML = "";
  new QRCode(qrContainer, {
    text: link,
    width: 220,
    height: 220,
    colorDark: "#000000",
    colorLight: "#ffffff"
  });
  document.getElementById("qrArea").style.display = "block";
  document.getElementById("generateBtn").style.display = "none";
  document.getElementById("upiId").style.display = "none";
  document.getElementById("amount").style.display = "none";
  document.getElementById("shareBtn").style.display = "block";
  document.getElementById("shareBtn").textContent = "Back";
}

function goBack() {
  location.reload();
}
