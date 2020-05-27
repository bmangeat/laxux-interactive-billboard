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
    x: 100,
    y: 270,
    w: 50,
    h: 100,
    dist: 0,
    inRange: false,
    color: {
        r: 51,
        v: 154,
        b: 240
    }
}
let phone2 = {
    language: "turkish",
    bluetooth: false,
    rollover: false,
    dragging: false,
    x: 250,
    y: 270,
    w: 50,
    h: 100,
    dist: 0,
    inRange: false,
    color: {
        r: 250,
        v: 82,
        b: 82
    }
}
let phone3 = {
    language: "italian",
    bluetooth: false,
    rollover: false,
    dragging: false,
    x: 400,
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
let phone4 = {
    language: "japanese",
    bluetooth: false,
    rollover: false,
    dragging: false,
    x: 550,
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
let phones = [phone1, phone2, phone3, phone4]


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
    background(233, 236, 239)
    phones.forEach(e => draggableObject(e))

    stroke(51, 154, 240)
    fill(165, 216, 255)
    ellipse(bluetoothZone.x, bluetoothZone.y, bluetoothZone.w, bluetoothZone.h)
    createBluetoothLogo()
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
const createBillboard = (b) => {
    noStroke()
    fill(29, 176, 152)
    rect(b.x, b.y, b.w, b.h, 5)

    fill(248, 249, 250)
    rect(b.x + 2.5, b.y + 2.5, b.w - 5, b.h - 5, 5)

    stroke(55, 71, 79)
    fill(29, 176, 152);
    textSize(36);
    textFont('Staatliches')
    textAlign(CENTER);
    text("LAXUX", 320, 50)

    noStroke();
    textSize(14);

    switch (billboard.language) {
        case "english":
            textFont('Jost')
            break
        case "turkish":
            textFont('Amiri')
            break
        case "italian":
            textFont('Quattrocento Sans')
            break
        case "japanese":
            textFont('Amiri')
            break
        default:
            textFont('Dosis')
            billboard.text = "COME CLOSER AND TURN ON YOUR BLUETOOTH"
    }
    fill(55, 71, 79)
    text(b.text, b.x + b.w/2, b.y + b.h/2 +10)

}

const updateBillboard = () => {
    //console.log(billboard.language);
    switch (billboard.language) {
        case "english":
            billboard.text = "Next train in 5 minutes"
            break
        case "turkish":
            billboard.text = "Sonraki trende 5 dakika"
            break
        case "italian":
            billboard.text = "Prossimo treno tra 5 minuti"
            break
        case "japanese":
            billboard.text = "5分後に次の電車"
            break
        default:
            billboard.text = "COME CLOSER AND TURN ON YOUR BLUETOOTH"
    }
}

const createBluetoothLogo = () => {

    let offsetxx = billboard.x + billboard.w/2
    let offsetyy = billboard.y + billboard.h*4/3

    stroke(255,255,255)
    line(offsetxx, 13.5 + offsetyy, 20 + offsetxx, 40.5+ offsetyy)
    line(20 + offsetxx,40.5 + offsetyy, 10 + offsetxx, 54 + offsetyy)
    line(10 + offsetxx, 54 + offsetyy, 10 + offsetxx, offsetyy)
    line(10 + offsetxx, offsetyy, 20 + offsetxx, 13.5 + offsetyy)
    line(20 + offsetxx, 13.5 + offsetyy, offsetxx, 40.5 + offsetyy)
}
/**
 * @desc Create design of iPhone
 * @param p Object (...phone)
 */
const createIphone = (p) => {
    noStroke()
    fill(52, 58, 64)
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
            stroke(250, 82, 82)
            line(p.x + 7, p.y + 15, p.x + 3 + p.w - 10, p.y + 11 + p.h - 26)
            line(p.x + 3 + p.w - 10, p.y + 15, p.x + 7, p.y + 11 + p.h - 26)
            line(p.x + 6, p.y + p.h / 2, p.x + 3 + p.w - 9, p.y + p.h / 2)
            line(p.x + p.w / 2, p.y + 14, p.x + p.w / 2, p.y + p.h - 14)
            break


        case "italian":
            noStroke()
            fill(255, 255, 255)
            rect(p.x + 2, p.y + 10, p.w - 4, p.h - 20, 4)

            fill(105, 219, 124)
            rect(p.x + 2, p.y + 10, p.w/3 - 4, p.h - 20, 4, 0, 0, 4)


            fill(250, 82, 82)
            rect(p.x + 2 +2/3*p.w, p.y + 10, p.w/3 - 4, p.h - 20, 0, 4, 4, 0)
            break

        case "japanese":
            noStroke()
            fill(255, 255, 255)
            rect(p.x + 2, p.y + 10, p.w - 4, p.h - 20, 4)

            fill(250, 82, 82)
            ellipse(p.x + p.w/2, p.y + p.h/2, 20, 20)


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
const detectBluetoothArea = (p) => {
    p.inRange = (pow(p.x - bluetoothZone.x, 2) / pow((bluetoothZone.w / 2), 2) + pow(p.y - bluetoothZone.y, 2) / pow((bluetoothZone.h / 2), 2)) <= 1
}
const draggableObject = (p) => {
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
const mousePressedObjectDrag = (p) => {
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
const mouseReleasedObjectDrag = (p) => {
    p.dragging = false
    p.dist = evaluateDist(p)
    detectBluetoothArea(p)

    phones.sort(compare)
    let phoneDetected = false
    for(let i=0; i<phones.length; i++){
        if(phones[i].inRange && phones[i].bluetooth) { //If the closest phone doesn't have bluetooth turned on
            phoneDetected = true;
            billboard.language = phones[i].language
            break;
        }
    }

    if(!phoneDetected){
        billboard.language = ""
    }
}

/**
 * @desc In order to compare and sort array of phones according to distance
 * @param a Phone a
 * @param b Phone b
 * @returns {number}
 */
const compare = (a, b) => {
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
const between = (a, b, x) => {
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
