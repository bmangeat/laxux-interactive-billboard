let billboard =  {
    language: "english",
    x: 20,
    y: 20,
    w: 600,
    h: 100
};

let phone1 = {
    language : "english",
    bluetooth : false,
    rollover: false,
    dragging: false,
    x: 20,
    y: 270,
    w: 50,
    h: 80,
    dist: 0
};
let phone2 = {
    language : "turkish",
    bluetooth : false,
    rollover: false,
    dragging: false,
    x: 90,
    y: 270,
    w: 50,
    h: 80,
    dist: 0
};

let offsetX, offsetY;


setup = () => {
    createCanvas(640, 360);
    phone2.dist = evaluateDist(phone2);
    phone1.dist = evaluateDist(phone1);
    console.log(phone1.dist);
    console.log(phone2.dist);


}

evaluateDist = (p) => sqrt(pow(p.x - billboard.x, 2) + pow(p.y - billboard.y, 2));


draw = () => {
    background(255);


    draggableObject(phone1);
    draggableObject(phone2);

    rect(phone1.x, phone1.y, phone1.w, phone1.h );
    rect(phone2.x, phone2.y, phone2.w, phone2.h );
    ellipse(billboard.x + billboard.w/2, billboard.y + billboard.h/2, billboard.w + 200, billboard.h + 200);
    rect(billboard.x, billboard.y, billboard.w, billboard.h);

    phone2.dist = evaluateDist(phone2);
    phone1.dist = evaluateDist(phone1);



};

let draggableObject = (p) => {
    p.rollover = mouseX > p.x && mouseX < p.x + p.w && mouseY > p.y && mouseY < p.y + p.h;

    if (p.dragging) {
        p.x = mouseX + offsetX;
        p.y = mouseY + offsetY;
    }
};


function mousePressed() {
    mousePressedObjectDrag(phone1);
    mousePressedObjectDrag(phone2);

}

let mousePressedObjectDrag = (p) => {
    if (mouseX > p.x && mouseX < p.x + p.w && mouseY > p.y && mouseY < p.y + p.h) {
        p.dragging = true;

        offsetX = p.x-mouseX;
        offsetY = p.y-mouseY;
    }
};

function mouseReleased() {
    mouseReleasedObjectDrag(phone1);
    mouseReleasedObjectDrag(phone2);
}

let mouseReleasedObjectDrag = (p) => p.dragging = false;

windowResized = () => resizeCanvas(windowWidth, windowHeight);

setup();
draw();
windowResized();
