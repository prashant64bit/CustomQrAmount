document.getElementById("payeeName").textContent = UPI_CONFIG.payeeName;
document.getElementById("upiId").textContent = UPI_CONFIG.upiId;
document.getElementById("shareName").textContent = UPI_CONFIG.payeeName;

function buildBaseUPI(){
  return (
    "upi://pay?pa=" + encodeURIComponent(UPI_CONFIG.upiId) +
    "&pn=" + encodeURIComponent(UPI_CONFIG.payeeName) +
    "&cu=" + encodeURIComponent(UPI_CONFIG.currency)
  );
}

function generateQR(){
  const amt = document.getElementById("amount").value;
  if(!amt || amt <= 0) return;

  const link = buildBaseUPI() + "&am=" + encodeURIComponent(amt);

  const qrBox = document.getElementById("qr");
  const shareBox = document.getElementById("shareQR");

  qrBox.innerHTML = "";
  shareBox.innerHTML = "";

  new QRCode(qrBox,{
    text: link,
    width: 220,
    height: 220
  });

  new QRCode(shareBox,{
    text: link,
    width: 220,
    height: 220
  });

  document.getElementById("qrArea").style.display = "block";
  document.getElementById("shareBtn").style.display = "block";
}

function shareQR(){
  html2canvas(document.getElementById("shareView")).then(canvas=>{
    canvas.toBlob(blob=>{
      const file = new File([blob],"upi-qr.png",{type:"image/png"});
      navigator.share({
        files:[file]
      });
    });
  });
}
