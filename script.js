document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("payeeName").textContent = UPI.name;
  document.getElementById("upiId").textContent = UPI.id;

  const amountInput = document.getElementById("amount");
  const generateBtn = document.getElementById("generateBtn");
  const backBtn = document.getElementById("backBtn");
  const qrArea = document.getElementById("qrArea");
  const qrBox = document.getElementById("qr");

  generateBtn.addEventListener("click", () => {
    const amount = amountInput.value.trim().replace(/[^0-9.]/g, "");
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount greater than 0");
      amountInput.focus();
      return;
    }

    const upiLink = `upi://pay?pa=${encodeURIComponent(UPI.id)}&pn=${encodeURIComponent(UPI.name)}&cu=${encodeURIComponent(UPI.currency)}&am=${encodeURIComponent(amount)}`;

    qrBox.innerHTML = "";
    new QRCode(qrBox, {
      text: upiLink,
      width: 220,
      height: 220,
      colorDark: "#000000",
      colorLight: "#ffffff"
    });

    document.querySelector(".generate").style.display = "none";
    qrArea.style.display = "block";
    backBtn.style.display = "block";
    amountInput.style.display = "none";
    document.querySelector(".subtitle").style.display = "none";
  });

  backBtn.addEventListener("click", () => {
    amountInput.value = "";
    qrBox.innerHTML = "";
    qrArea.style.display = "none";
    backBtn.style.display = "none";
    document.querySelector(".generate").style.display = "block";
    amountInput.style.display = "block";
    document.querySelector(".subtitle").style.display = "block";
    amountInput.focus();
  });
});
