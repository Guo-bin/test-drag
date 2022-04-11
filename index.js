function beginSliding(e) {
    slider.onpointermove = slide;
    slider.setPointerCapture(e.pointerId);
    slider2.onpointerenter = beingOver;
    console.log(e.pointerId);
}

function stopSliding(e) {
    slider.onpointermove = null;
    slider.releasePointerCapture(e.pointerId);
}

function slide(e) {
    // console.log(e);
    slider.style.transform = `translate(${e.clientX - 70}px,${e.clientY - slider.offsetHeight / 2}px)`;
}

function beingOver(e) {
    console.log(e);
}

const slider = document.getElementById("slider");
const slider2 = document.getElementById("slider2");
slider2.onpointerenter = beingOver;
slider.onpointerdown = beginSliding;
slider.onpointerup = stopSliding;
