const amountInput = document.getElementById("amount");
const qrEl = document.getElementById("qr");
const qrArea = document.getElementById("qrArea");
const generateBtn = document.getElementById("generateBtn");
const shareBtn = document.getElementById("shareBtn");

generateBtn.onclick = () => {
  const amount = amountInput.value.trim();
  if (!amount) return;

  qrEl.innerHTML = "";

  const upiLink =
    "upi://pay?pa=" + encodeURIComponent(UPI.id) +
    "&pn=" + encodeURIComponent(UPI.name) +
    "&am=" + encodeURIComponent(amount) +
    "&cu=" + UPI.currency;

  new QRCode(qrEl, {
    text: upiLink,
    width: 220,
    height: 220
  });

  qrArea.style.display = "block";
  shareBtn.style.display = "block";
};

shareBtn.onclick = async () => {
  const qrImg = qrEl.querySelector("img");
  if (!qrImg) return;

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0f1115";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 42px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(UPI.name, canvas.width/2, 200);

  const box = 520;
  const x = (canvas.width - box)/2;
  const y = 320;

  ctx.beginPath();
  ctx.roundRect(x,y,box,box,28);
  ctx.fill();

  const img = new Image();
  img.src = qrImg.src;

  img.onload = () => {
    ctx.drawImage(img, x+20, y+20, box-40, box-40);

    ctx.font = "28px system-ui";
    ctx.fillText(
      "Scan to pay with any UPI app",
      canvas.width/2,
      y + box + 80
    );

    canvas.toBlob(blob=>{
      const file = new File([blob],"upi-qr.png",{type:"image/png"});
      navigator.share({ files:[file] });
    });
  };
};
