const qrcode = document.querySelector(".qrcode");
const textInput = document.getElementById("textinput");
const submitbtn = document.getElementById("submit");
const downloadbtn = document.getElementById("download");
const sizeOptions = document.querySelector(".sizeoptions");
const BGColor = document.getElementById("BGColor");
const FGColor = document.getElementById("FGColor");	

let QR_code;
let sizeChoice, BGColorChoice, FGColorChoice;

// size Choice
sizeOptions.addEventListener("change", () => {
    sizeChoice = sizeOptions.value;
});

// Background Color
BGColor.addEventListener("input", () => {
    BGColorChoice = BGColor.value;
});

// Foreground Color
FGColor.addEventListener("input", () => {
    FGColorChoice = FGColor.value;
});


// Format input
const inputFormat = (value) => {
    value = value.replace(/[^a-z0-9A-Z]+/g, ""); // Remove special characters
    return value;
};

submitbtn.addEventListener("click", async () => {
    qrcode.innerHTML = "";

    // QR Code Generation
    QR_code = await new QRCode(qrcode, {
        text: textInput.value,
        width: sizeChoice,
        height: sizeChoice,
        colorDark: FGColorChoice, //#000000 Foreground Color
        colorLight: BGColorChoice, //#ffffff Background Color
    });

    // Set Url for Download
    const src= qrcode.firstChild.toDataURL("image/png");
    downloadbtn.href = src;
    let uservalue = textInput.value;
    try{
        uservalue = new URL(uservalue).hostname;
    }catch{
        uservalue = inputFormat(uservalue);
        downloadbtn.download = `${userValue}QR`;
        downloadbtn.classList.remove("hide");
    }
});

textInput.addEventListener("input", () => {
    if(textInput.value.trim().length < 1){
        submitbtn.disabled = true;
        downloadbtn.href = "";
        downloadbtn.classList.add("hide");
    }
    else{
        submitbtn.disabled = false;
    }
});

window.onload = () => {
    qrcode.innerHTML = "";
    sizeChoice = 100;
    sizeOptions.value = 100;
    textInput.value = "";
    BGColorChoice = BGColorChoice = "#ffffff";
    FGColorChoice = FGColorChoice = "#454a86";
    downloadbtn.classList.add("hide");
    downloadbtn.disabled = true;
};