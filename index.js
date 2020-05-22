let billboard =  {
    language: "",
    text: "",
    x: 20,
    y: 20,
    w: 600,
    h: 100
}

let phone1 = {
    language : "english",
    bluetooth : false,
    rollover: false,
    dragging: false,
    x: 20,
    y: 270,
    w: 50,
    h: 100,
    dist: 0,
    color: {
        r: 0,
        v: 0,
        b: 255
    }
}
let phone2 = {
    language : "turkish",
    bluetooth : false,
    rollover: false,
    dragging: false,
    x: 90,
    y: 270,
    w: 50,
    h: 100,
    dist: 0,
    color: {
        r: 255,
        v: 0,
        b: 0
    }
}

let offsetX, offsetY

let phones = [phone1, phone2]


setup = () => {
    createCanvas(640, 360)
    phone2.dist = evaluateDist(phone2)
    phone1.dist = evaluateDist(phone1)

    phones.sort(compare)
    billboard.language = phones[0].language

}

/**
 * Proceed the distance between billboard and phone
 * @param p
 * @returns {number}
 */
evaluateDist = (p) => sqrt(pow((p.x + p.w/2) - (billboard.x + billboard.w/2), 2) + pow((p.y + p.h/2) - (billboard.y + billboard.h/2), 2))


draw = () => {
    background(255)


    draggableObject(phone1)
    draggableObject(phone2)

    fill(255, 255, 255)
    ellipse(billboard.x + billboard.w/2, billboard.y + billboard.h/2, billboard.w + 200, billboard.h + 200)
    createBillboard(billboard);

    createIphone(phone1)
    createIphone(phone2)

}

/**
 * @desc Create design of billboard
 * @param b Object (billboard)
 */
let createBillboard = (b) => {
    fill(0, 0, 0)
    rect(b.x, b.y, b.w, b.h, 20)

    fill(255, 255, 0)
    rect(b.x + 10, b.y + 10, b.w - 20, b.h - 20, 15)

    fill(255, 0, 0)
    text(b.text, b.x + 20, b.y + 20, b.w - 40, b.h - 40  )

}

/**
 * @desc Create design of iPhone
 * @param p Object (...phone)
 */
let createIphone = (p) => {
    noStroke()
    fill(0, 0, 0)
    rect(p.x,p.y, p.w, p.h, 8)

    // incrust iphone
    fill(p.color.r, p.color.v, p.color.b)
    rect(p.x + 2, p.y+10, p.w - 4, p.h - 20, 4)

    fill(52)
    ellipse(p.x + 25, p.y + 95, 7, 7)

    fill(52)
    rect(p.x + 20, p.y + 5, 12, 2, 4)
}

let draggableObject = (p) => {
    p.rollover = mouseX > p.x && mouseX < p.x + p.w && mouseY > p.y && mouseY < p.y + p.h

    if (p.dragging) {
        p.x = mouseX + offsetX
        p.y = mouseY + offsetY
    }
}


function mousePressed() {
    mousePressedObjectDrag(phone1)
    mousePressedObjectDrag(phone2)

}

let mousePressedObjectDrag = (p) => {
    if (mouseX > p.x && mouseX < p.x + p.w && mouseY > p.y && mouseY < p.y + p.h) {
        p.dragging = true

        offsetX = p.x-mouseX
        offsetY = p.y-mouseY
    }
}

function mouseReleased() {
    mouseReleasedObjectDrag(phone1)
    mouseReleasedObjectDrag(phone2)
}

let mouseReleasedObjectDrag = (p) => {
    p.dragging = false
    p.dist = evaluateDist(p)
    p.dist = evaluateDist(p)

    phones.sort(compare)
    billboard.language = phones[0].language

    console.log(billboard.language)
    console.log(billboard.text)
    switch (billboard.language) {
        case "english":
            billboard.text = "My name is Brice"
            break
        case "turkish":
            billboard.text = "benim adım Brice"
            break
        default:
            billboard.text = "My name is Brice"
    }
}

/**
 * @desc Update text of object
 */
switch (billboard.language) {
    case "english":
        billboard.text = "My name is Brice"
        break
    case "turkish":
        billboard.text = "benim adım Brice"
        break
    default:
        billboard.text = "My name is Brice"
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
windowResized = () => resizeCanvas(windowWidth, windowHeight)

setup()
draw()
windowResized()

