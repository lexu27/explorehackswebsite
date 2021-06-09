// var i;
// for (i = 0; i < 50; i++) {
// }
// node = document.getElementById('stars-below');
// node.insertAdjacentHTML('afterend', '<div class="star"></div>');
// stars = document.getElementsByClassName("star");
// stars[0].style.borderRadius = "50%";
// stars[0].style.backgroundColor = "white";
// stars[0].style.width = "2px";
// stars[0].style.height = "2px";
// stars[0].style.top = "90%";
// stars[0].style.left = "50%";

let logo = document.getElementById("intro-logo");
let date = document.getElementById("intro-date");
let button = document.getElementById("intro-button");
let rocket = document.getElementById("intro-rocket");
let planet1 = document.getElementById("intro-planet1");
// let bg = document.getElementById("intro-bg");

var layer1 = [logo, date, button];
var layer2 = [rocket];
var layer3 = [planet1];

window.addEventListener('scroll', function(){
    let value = window.scrollY;
    // console.log("yea "+stars[0].style.top);
    // stars[0].style.top = value+"px";

    layer1.forEach((item, index) => {
        item.style.top = value * 0.25 * -0.5 + 50 + '%';
    });

    layer2.forEach((item, index) => {
        item.style.bottom = value * 0.1 * 0.5 + -108 + '%';
    });

    layer3.forEach((item, index) => {
        item.style.bottom = value * 0.03 * 0.5 + -3 + '%';
    });

    console.log(value);
    // bg.style.bottom = value + "px";
    })

