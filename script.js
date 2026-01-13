document.getElementById("payeeName").textContent = UPI_CONFIG.payeeName;
document.getElementById("upiId").textContent = UPI_CONFIG.upiId;
document.getElementById("shareName").textContent = UPI_CONFIG.payeeName;

document.getElementById("generateBtn").addEventListener("click", generateQR);
document.getElementById("shareBtn").addEventListener("click", shareQR);

function buildUPILink(amount){
  return (
    "upi://pay?pa=" + encodeURIComponent(UPI_CONFIG.upiId) +
    "&pn=" + encodeURIComponent(UPI_CONFIG.payeeName) +
    "&cu=" + encodeURIComponent(UPI_CONFIG.currency) +
    "&am=" + encodeURIComponent(amount)
  );
}

function generateQR(){
  const amount = document.getElementById("amount").value;
  if(!amount || amount <= 0) return;

  const link = buildUPILink(amount);

  const qr = document.getElementById("qr");
  const shareQRBox = document.getElementById("shareQR");

  qr.innerHTML = "";
  shareQRBox.innerHTML = "";

  new QRCode(qr, { text: link, width:220, height:220 });
  new QRCode(shareQRBox, { text: link, width:220, height:220 });

  document.getElementById("qrArea").style.display = "block";
  document.getElementById("shareBtn").style.display = "block";
}

function shareQR(){
  const shareView = document.getElementById("shareView");

  // Make it renderable but invisible
  shareView.style.position = "fixed";
  shareView.style.top = "0";
  shareView.style.left = "0";
  shareView.style.opacity = "0";
  shareView.style.pointerEvents = "none";

  // Wait one frame so QR fully renders
  requestAnimationFrame(() => {
    html2canvas(shareView).then(canvas => {
      canvas.toBlob(blob => {
        const file = new File([blob], "upi-qr.png", { type: "image/png" });

        navigator.share({ files: [file] }).finally(() => {
          // Hide again
          shareView.style.top = "-9999px";
          shareView.style.left = "-9999px";
          shareView.style.opacity = "1";
        });
      });
    });
  });
}
