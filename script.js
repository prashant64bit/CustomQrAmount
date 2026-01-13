document.getElementById("payeeName").textContent = UPI_CONFIG.payeeName;
document.getElementById("upiId").textContent = UPI_CONFIG.upiId;
document.getElementById("shareName").textContent = UPI_CONFIG.payeeName;

const base =
  "upi://pay?pa=" + encodeURIComponent(UPI_CONFIG.upiId) +
  "&pn=" + encodeURIComponent(UPI_CONFIG.payeeName) +
  "&cu=" + encodeURIComponent(UPI_CONFIG.currency);

function generateQR(){
  const amt = document.getElementById("amount").value;
  if(!amt || amt <= 0) return;

  const link = base + "&am=" + encodeURIComponent(amt);

  document.getElementById("qr").innerHTML = "";
  document.getElementById("shareQR").innerHTML = "";

  new QRCode(document.getElementById("qr"), { text: link, width:220, height:220 });
  new QRCode(document.getElementById("shareQR"), { text: link, width:220, height:220 });

  document.getElementById("qrArea").style.display = "block";
  document.getElementById("shareBtn").style.display = "block";
}

function shareQR(){
  html2canvas(document.getElementById("shareView")).then(canvas=>{
    canvas.toBlob(blob=>{
      const file = new File([blob],"upi-qr.png",{type:"image/png"});
      navigator.share({ files:[file] });
    });
  });
}
