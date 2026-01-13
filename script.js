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
  const shareQR = document.getElementById("shareQR");

  qr.innerHTML = "";
  shareQR.innerHTML = "";

  new QRCode(qr,{ text: link, width:220, height:220 });
  new QRCode(shareQR,{ text: link, width:220, height:220 });

  document.getElementById("qrArea").style.display = "block";
  document.getElementById("shareBtn").style.display = "block";
}

function shareQR(){
  html2canvas(document.getElementById("shareView")).then(canvas=>{
    canvas.toBlob(blob=>{
      const file = new File([blob], "upi-qr.png", { type:"image/png" });
      navigator.share({ files:[file] });
    });
  });
}
