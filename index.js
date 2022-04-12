// function beginSliding(e) {
//     slider.onpointermove = slide;
//     slider.setPointerCapture(e.pointerId);
//     slider2.onpointerenter = beingOver;
//     console.log(e.pointerId);
// }

// function stopSliding(e) {
//     slider.onpointermove = null;
//     slider.releasePointerCapture(e.pointerId);
// }

// function slide(e) {
//     console.log(e);
//     slider.style.transform = `translate(0px,${e.clientY - slider.offsetHeight / 2}px)`;
// }

// function beingOver(e) {
//     console.log(e);
// }

// const slider = document.getElementById("slider");
// const slider2 = document.getElementById("slider2");
// const body = document.querySelector("body");
// console.log(body);
// body.onpointerover = beingOver;
// slider2.onpointerover = beingOver;
// slider.onpointerdown = beginSliding;
// slider.onpointerup = stopSliding;

const boxs = document.querySelectorAll(".box");
const box = document.querySelector(".box2");
const container = document.querySelector(".container");
let distance = container.offsetHeight / 5;
let distanceArr = [];
console.log(distance);
boxs.forEach((box, index) => {
    distanceArr.push(index * distance + distance / 2);
    box.dataset.index = index;
    box.dataset.move = "false";
    box.dataset.number = index;
    addPointerEvt(box, index);
});
console.log(distanceArr);
function addPointerEvt(element, index) {
    let itemIndex = Number(element.dataset.index);
    function translate(e) {
        console.log(index);
        e.preventDefault();
        element.setPointerCapture(e.pointerId);
        let number = Number(element.dataset.number);
        let moveDistance = e.clientY - element.offsetHeight / 2 - element.offsetHeight * number;
        this.setPointerCapture(e.pointerId);
        this.style.transform = `translate(0px,${moveDistance}px)`;

        //如果該元素超過下面元素的中間線時
        if (e.clientY + element.offsetHeight / 2 > distanceArr[itemIndex + 1]) {
            const nextElement = document.querySelector(`[data-index="${itemIndex + 1}"]`);
            if (nextElement.dataset.move == "true") {
                nextElement.style.transform = `translateY(0)`;
                element.dataset.index = `${itemIndex + 1}`;
                nextElement.dataset.index = `${itemIndex}`;
                itemIndex++;
                nextElement.dataset.move = "false";
                return;
            }
            element.dataset.index = `${itemIndex + 1}`;
            nextElement.style.transform = `translateY(-${element.offsetHeight}px)`;
            nextElement.dataset.index = `${itemIndex}`;
            nextElement.dataset.move = "true";
            itemIndex++;
            return;
        }
        if (e.clientY - element.offsetHeight / 2 < distanceArr[itemIndex - 1]) {
            const lastElement = document.querySelector(`[data-index="${itemIndex - 1}"]`);
            if (lastElement.dataset.move == "true") {
                lastElement.style.transform = `translateY(0)`;
                element.dataset.index = `${itemIndex - 1}`;
                lastElement.dataset.index = `${itemIndex}`;
                itemIndex--;
                lastElement.dataset.move = "false";
                return;
            }
            element.dataset.index = `${itemIndex - 1}`;
            lastElement.style.transform = `translateY(+${element.offsetHeight}px)`;
            lastElement.dataset.index = `${itemIndex}`;
            lastElement.dataset.move = "true";
            itemIndex--;
            return;
        }

        // if (moveDistance > this.offsetHeight / 2) {
        //     let nextBox = this.nextElementSibling;
        //     this.style.zIndex = `${5}`;
        //     nextBox.style.transform = `translate(0px,-${this.offsetHeight}px)`;
        //     nextBox.addEventListener("animationend", () => {
        //         nextBox.parentElement.insertBefore(element, nextBox.nextElementSibling);
        //     });
        // }

        // this.style.top = `${e.clientY - this.offsetHeight / 2}px`;
    }
    element.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        itemIndex = Number(element.dataset.index);
        console.log("itemIndex", typeof itemIndex);
        element.style.zIndex = "8";
        element.addEventListener("pointermove", translate);
    });
    element.addEventListener("pointerup", () => {
        console.log("pointerup");
        let newArr = [];
        for (let i = 0; i < 5; i++) {
            const item = document.querySelector(`[data-index="${i}"]`);
            newArr.push(item);
        }
        newArr.forEach((item) => {
            item.style.transform = `translateY(0)`;
            item.style.zIndex = 0;
            item.dataset.number = `${item.dataset.index}`;
            container.appendChild(item);
        });
        boxs.forEach((box) => {
            box.dataset.move = "false";
        });
        element.removeEventListener("pointermove", translate);
    });
}

// box.addEventListener("pointerdown", (e) => {
//     box.addEventListener("pointermove", translate);
// });

// box.addEventListener("pointerup", () => {
//     console.log("pointerup");
//     box.removeEventListener("pointermove", translate);
// });
