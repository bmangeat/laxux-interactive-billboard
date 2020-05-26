let billboard = {
    language: "",
    text: "COME CLOSER",
    x: 20,
    y: 20,
    w: 600,
    h: 100
}

let bluetoothZone = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
}

let phone1 = {
    language: "english",
    bluetooth: false,
    rollover: false,
    dragging: false,
    x: 20,
    y: 270,
    w: 50,
    h: 100,
    dist: 0,
    inRange: false,
    color: {
        r: 0,
        v: 0,
        b: 255
    }
}
let phone2 = {
    language: "turkish",
    bluetooth: false,
    rollover: false,
    dragging: false,
    x: 90,
    y: 270,
    w: 50,
    h: 100,
    dist: 0,
    inRange: false,
    color: {
        r: 255,
        v: 0,
        b: 0
    }
}

let phone3 = {
    language: "italian",
    bluetooth: false,
    rollover: false,
    dragging: false,
    x: 160,
    y: 270,
    w: 50,
    h: 100,
    dist: 0,
    inRange: false,
    color: {
        r: 0,
        v: 255,
        b: 0
    }
}

let offsetX, offsetY
let phones = [phone1, phone2, phone3]

setup = () => {
    createCanvas(1100, 500)
    phones.forEach(e => e.dist = evaluateDist(e))                                                                 // parse array of phones
    billboard.language = phones.reduce((min, b) => Math.min(min, b.dist), phones[0].dist)       // define language according to the closest phone
    bluetoothZone.x = billboard.x + billboard.w / 2
    bluetoothZone.y = billboard.y + billboard.h / 2
    bluetoothZone.w = billboard.w + 200
    bluetoothZone.h = billboard.h + 200
}

/**
 * Proceed the distance between billboard and phone
 * @param p
 * @returns {number}
 */
evaluateDist = (p) => sqrt(pow((p.x + p.w / 2) - (billboard.x + billboard.w / 2), 2) + pow((p.y + p.h / 2) - (billboard.y + billboard.h / 2), 2))


draw = () => {
    background(200)
    phones.forEach(e => draggableObject(e))

    stroke(0, 0, 0)
    fill(30, 255, 255)
    ellipse(bluetoothZone.x, bluetoothZone.y, bluetoothZone.w, bluetoothZone.h)
    createBillboard(billboard);
    createPhoneDisplay(phoneDisplay);

    phones.forEach(e => createIphone(e))
    
    updatePhoneDisplay();
    updateBillboard();
}

/**
 * @desc Create design of billboard
 * @param b Object (billboard)
 */
let createBillboard = (b) => {
    noStroke()
    fill(29, 176, 152)
    rect(b.x, b.y, b.w, b.h, 5)

    fill(239, 239, 239)
    rect(b.x + 2.5, b.y + 2.5, b.w - 5, b.h - 5, 5)

    stroke(55, 71, 79)
    fill(29, 176, 152);
    textSize(36);
    textFont('Staatliches')
    textAlign(CENTER);
    text("LAXUX", 320, 50)

    noStroke();
    textSize(12);
    textFont('Dosis')
    fill(55, 71, 79)
    text(b.text, b.x + b.w/2, b.y + b.h/2 +10)

}

let updateBillboard = () => {
    //console.log(billboard.language);
    switch (billboard.language) {
        case "english":
            billboard.text = "My name is Brice"
            break
        case "turkish":
            billboard.text = "benim adım Brice"
            break
        case "italian":
            billboard.text = "Mi chiamo Brice"
            break
        default:
            billboard.text = "COME CLOSER AND TURN ON YOUR BLUETOOTH"
    }
}

/**
 * @desc Create design of iPhone
 * @param p Object (...phone)
 */
let createIphone = (p) => {
    noStroke()
    fill(0, 0, 0)
    rect(p.x, p.y, p.w, p.h, 8)

    // incrust iphone


    switch (p.language) {
        case "turkish":
            noStroke()
            fill(p.color.r, p.color.v, p.color.b)
            rect(p.x + 2, p.y + 10, p.w - 4, p.h - 20, 4)

            fill(255, 255, 255)
            ellipse(p.x + p.w / 2, p.y + p.h / 2, p.w - 20, p.w - 20)

            fill(p.color.r, p.color.v, p.color.b)
            ellipse(p.x + p.w / 2 + 5, p.y + p.h / 2, p.w - 26, p.w - 26)
            break

        case "english":
            noStroke()
            fill(p.color.r, p.color.v, p.color.b)
            rect(p.x + 2, p.y + 10, p.w - 4, p.h - 20, 4)
            strokeWeight(8)
            //strokeCap(SQUARE);

            stroke(255, 255, 255)
            line(p.x + 7, p.y + 15, p.x + 3 + p.w - 10, p.y + 11 + p.h - 26)
            line(p.x + 3 + p.w - 10, p.y + 15, p.x + 7, p.y + 11 + p.h - 26)
            line(p.x + 6, p.y + p.h / 2, p.x + 3 + p.w - 9, p.y + p.h / 2)
            line(p.x + p.w / 2, p.y + 14, p.x + p.w / 2, p.y + p.h - 14)

            strokeWeight(3)
            //strokeCap(SQUARE);
            stroke(255, 0, 0)
            line(p.x + 7, p.y + 15, p.x + 3 + p.w - 10, p.y + 11 + p.h - 26)
            line(p.x + 3 + p.w - 10, p.y + 15, p.x + 7, p.y + 11 + p.h - 26)
            line(p.x + 6, p.y + p.h / 2, p.x + 3 + p.w - 9, p.y + p.h / 2)
            line(p.x + p.w / 2, p.y + 14, p.x + p.w / 2, p.y + p.h - 14)


        default:
        /*         noStroke()
                 fill(p.color.r, p.color.v, p.color.b)
                 rect(p.x + 2, p.y + 10, p.w - 4, p.h - 20, 4)*/

    }

    noStroke()
    fill(52)
    ellipse(p.x + 25, p.y + 95, 7, 7)

    noStroke()
    fill(52)
    rect(p.x + 20, p.y + 5, 12, 2, 4)
}

/**
 * @desc Detect if phones are enter in the zone when mouse released
 * @param p dragging phone
 */
let detectBluetoothArea = (p) => {
    p.inRange = (pow(p.x - bluetoothZone.x, 2) / pow((bluetoothZone.w / 2), 2) + pow(p.y - bluetoothZone.y, 2) / pow((bluetoothZone.h / 2), 2)) <= 1
}
let draggableObject = (p) => {
    p.rollover = mouseX > p.x && mouseX < p.x + p.w && mouseY > p.y && mouseY < p.y + p.h

    if (p.dragging) {
        p.x = mouseX + offsetX
        p.y = mouseY + offsetY
    }
}


/**
 * @desc Determine which phone is clicked
 * @param p selected phone
 */
let mousePressedObjectDrag = (p) => {
    if (mouseX > p.x && mouseX < p.x + p.w && mouseY > p.y && mouseY < p.y + p.h) {
        p.dragging = true

        offsetX = p.x - mouseX
        offsetY = p.y - mouseY

        phoneDisplay.language = p.language;
        phoneDisplay.bluetooth = p.bluetooth;
    }
}

/**
 * Call when object is released -> determine which phone is closer
 * @param p dragging phone
 */
let mouseReleasedObjectDrag = (p) => {
    p.dragging = false
    p.dist = evaluateDist(p)
    detectBluetoothArea(p)

    phones.sort(compare)
    let phoneDetected = false;
    for(var i=0; i<3; i++){
        if(phones[i].inRange && phones[i].bluetooth) {
            phoneDetected = true;
            billboard.language = phones[i].language
            break;
        }
    } 

    if(!phoneDetected){
        billboard.language = ""
    }
}

let displayIphone = (p) =>
{


}

/**
 * @desc In order to compare and sort array of phones according to distance
 * @param a Phone a
 * @param b Phone b
 * @returns {number}
 */
let compare = (a, b) => {
    if (a.dist > b.dist) return 1
    if (b.dist > a.dist) return -1

    return 0
}

/**
 * @desc In order to see if x is between two coordinates
 * @param a Int
 * @param b Int
 * @returns {boolean}
 */
let between = (a, b, x) => {
    if(x >= a && x <= b) return true;
    else return false
}

function mousePressed() {
    phones.forEach(e => mousePressedObjectDrag(e))

    //If clicked on switch button
    if(between(910, 990, mouseX) && between(210, 290, mouseY)){
        changeBluetoothStatus();
    }
}
function mouseReleased() {
    phones.forEach(e => mouseReleasedObjectDrag(e))
}

windowResized = () => resizeCanvas(windowWidth, windowHeight)
