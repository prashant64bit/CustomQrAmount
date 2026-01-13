document.getElementById("payeeName").textContent = UPI.name;
document.getElementById("upiId").textContent = UPI.id;

document.getElementById("generateBtn").addEventListener("click", generateQR);
document.getElementById("shareBtn").addEventListener("click", shareCard);

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
  document.getElementById("shareBtn").style.display = "block";
}

function shareCard() {
  const card = document.getElementById("cardToCapture");

  if (!document.getElementById("qr").querySelector("canvas")) {
    alert("Generate QR first!");
    return;
  }

  const toHide = [
    document.getElementById("generateBtn"),
    document.getElementById("upiId"),
    document.getElementById("amount")
  ];

  const originals = toHide.map(el => ({
    el,
    display: el ? el.style.display : ''
  }));

  toHide.forEach(el => {
    if (el) el.style.display = "none";
  });

  setTimeout(() => {
    htmlToImage.toPng(card, {
      backgroundColor: "#1c1f26",
      pixelRatio: window.devicePixelRatio || 2,
      canvasWidth: card.offsetWidth * (window.devicePixelRatio || 2),
      canvasHeight: card.offsetHeight * (window.devicePixelRatio || 2),
      width: card.offsetWidth,
      height: card.offsetHeight,
      quality: 1.0
    })
    .then(dataUrl => {
      fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "upi-payment.png", { type: "image/png" });

          // Restore visibility
          originals.forEach(item => {
            if (item.el) item.el.style.display = item.display;
          });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({
              files: [file],
              title: `Pay ${UPI.name}`,
              text: "Scan to pay via UPI"
            }).catch(() => {});
          } else {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "upi-payment.png";
            a.click();
            URL.revokeObjectURL(url);
          }
        });
    })
    .catch(err => {
      console.error("html-to-image error:", err);
      alert("Failed to create image");
      originals.forEach(item => {
        if (item.el) item.el.style.display = item.display;
      });
    });
  }, 260);
}
