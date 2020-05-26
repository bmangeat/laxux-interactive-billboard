let phoneDisplay = {
    language: "",
    bluetooth: false,
    x: 850,
    y: 20,
    w: 170,
    h: 340
}

/*Images for phone display*/
let switchOn;
let switchOff;
let bluetooth;
let disconnectedImg;
let englishImg;
let turkishImg;

let font
preload = () => {
  switchOn = loadImage('https://img.icons8.com/officel/80/000000/switch-on.png');
  bluetooth = loadImage("https://img.icons8.com/officel/80/000000/bluetooth-2.png");
  switchOff = loadImage("https://img.icons8.com/officel/80/000000/switch-off.png");
  disconnectedImg = loadImage("https://img.icons8.com/officel/80/000000/disconnected.png");
  englishImg = loadImage("https://img.icons8.com/officel/80/000000/great-britain.png");
  turkishImg = loadImage("https://img.icons8.com/officel/80/000000/turkey.png");
}

/**
 * @desc Create design of phone's window
 * @param d Object (phoneDisplay)
 */
let createPhoneDisplay = (d) => {
    noStroke()
    fill(0, 0, 0)
    rect(d.x, d.y, d.w, d.h, 20)

    fill(255, 255, 0)
    rect(d.x + 2, d.y + 15, d.w - 4, d.h - 25, 15)

}

let updatePhoneDisplay = () => {
    if(phoneDisplay.language != ""){
        bluetoothDisplay(phoneDisplay.bluetooth, phoneDisplay.language);
    }else{
        disconnected();
    }
}
/**
 * @desc Window where no phone is connected
 */
let disconnected = () => {
    image(disconnectedImg, 895, 150, 80, 80);
    text("No devices connected", 875, 260)
}

/**
 * @desc Window where bluetooth is on
 * @param state Boolean, language String
 */
let bluetoothDisplay = (state, language) => {
    switch (language) {
        case "turkish": image(turkishImg, 970, 40, 40, 40);
        break;
        case "english": image(englishImg, 970, 40, 40, 40);
        break;
        default: break;
    }
    image(bluetooth, 895, 110, 80, 80);

    if(state)
        image(switchOn, 895, 210, 80, 80);
    else{
        image(switchOff, 895, 210, 80, 80);
    }
}

/**
 * @desc Change the bluetooth state of a phone
 */
let changeBluetoothStatus = () => {
    if(phoneDisplay.language != ""){
        phones.forEach(e => {
            if(e.language == phoneDisplay.language){
                e.bluetooth = !e.bluetooth;
                phoneDisplay.bluetooth = e.bluetooth;
            }
        })
    }
}