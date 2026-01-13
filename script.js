const qrEl = document.getElementById("qr");
const qrArea = document.getElementById("qrArea");
const shareBtn = document.getElementById("shareBtn");

let qrInstance = null;
let lastAmount = "";

document.getElementById("generateBtn").onclick = () => {
  const amount = document.getElementById("amount").value;
  if(!amount || amount <= 0) return;

  lastAmount = amount;

  qrEl.innerHTML = "";

  const upi =
    "upi://pay?pa=" + encodeURIComponent(UPI_CONFIG.upiId) +
    "&pn=" + encodeURIComponent(UPI_CONFIG.payeeName) +
    "&am=" + encodeURIComponent(amount) +
    "&cu=" + UPI_CONFIG.currency;

  qrInstance = new QRCode(qrEl, {
    text: upi,
    width:220,
    height:220
  });

  qrArea.style.display = "block";
  shareBtn.style.display = "block";
};

shareBtn.onclick = async () => {
  const qrImg = qrEl.querySelector("img");
  if(!qrImg) return;

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0d0d0d";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  const boxSize = 520;
  const boxX = (canvas.width - boxSize) / 2;
  const boxY = 300;

  ctx.fillStyle = "#fff";
  roundRect(ctx, boxX, boxY, boxSize, boxSize, 32);
  ctx.fill();

  const img = new Image();
  img.src = qrImg.src;

  img.onload = () => {
    ctx.drawImage(
      img,
      boxX + 20,
      boxY + 20,
      boxSize - 40,
      boxSize - 40
    );

    ctx.fillStyle = "#fff";
    ctx.font = "bold 40px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(
      UPI_CONFIG.payeeName,
      canvas.width / 2,
      180
    );

    ctx.font = "28px system-ui";
    ctx.fillText(
      "Scan to pay with any UPI app",
      canvas.width / 2,
      boxY + boxSize + 80
    );

    canvas.toBlob(blob => {
      const file = new File([blob], "upi-qr.png", { type:"image/png" });
      navigator.share({ files:[file] });
    });
  };
};

function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.lineTo(x+w-r,y);
  ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);
  ctx.quadra
