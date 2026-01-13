document.getElementById("payeeName").textContent = UPI_CONFIG.payeeName;
document.getElementById("upiId").textContent = UPI_CONFIG.upiId;

const base =
  "upi://pay?pa=" + encodeURIComponent(UPI_CONFIG.upiId) +
  "&pn=" + encodeURIComponent(UPI_CONFIG.payeeName) +
  "&cu=" + encodeURIComponent(UPI_CONFIG.currency);

function generateQR(){
  const amt = document.getElementById("amount").value;
  if(!amt || amt <= 0) return;

  const link = base + "&am=" + encodeURIComponent(amt);
  const box = document.getElementById("qr");
  box.innerHTML = "";

  new QRCode(box,{
    text:link,
    width:220,
    height:220,
    colorDark:"#000",
    colorLight:"#fff"
  });

  document.getElementById("qrArea").style.display = "block";
  document.getElementById("shareBtn").style.display = "block";
}

function shareQR(){
  html2canvas(document.getElementById("capture")).then(canvas=>{
    canvas.toBlob(blob=>{
      const file = new File([blob],"payment-qr.png",{type:"image/png"});
      navigator.share({
        files:[file],
        title:"UPI Payment",
        text:"Scan this QR to pay"
      });
    });
  });
}
