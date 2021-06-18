// intro code

let logo = document.getElementById("intro-logo");
let dateAndButton = document.getElementById("date-and-button");
let date = document.getElementById("intro-date");
let button = document.getElementById("intro-button");
let rocket = document.getElementById("intro-rocket");
let planet1 = document.getElementById("intro-planet1");
// let bg = document.getElementById("intro-bg");

var layer1 = [logo];
var layer2 = [rocket];
var layer3 = [planet1];

window.addEventListener('scroll', function(){
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    if (!(vw <= 670)){
        let value = window.scrollY;
        // console.log("yea "+stars[0].style.top);
        // stars[0].style.top = value+"px";

        dateAndButton.style.top = value * 0.25 * -0.5 + 50 + '%';
        layer1.forEach((item, index) => {
            item.style.top = value * 0.25 * -0.5 + 50 + '%';
        });

        layer2.forEach((item, index) => {
            item.style.bottom = value * 0.1 * 0.5 + -108 + '%';
        });

        layer3.forEach((item, index) => {
            item.style.bottom = value * 0.03 * 0.5 + -3 + '%';
        });

        // bg.style.bottom = value + "px";
    }
})



// counter code
const counters = document.querySelectorAll('.counter');

// Where el is the DOM element you'd like to test for visibility
// function isHidden(el) {
//     return (el.offsetParent === null)
// }

const updateCounts = (speed) => {
    var i = 1;
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            console.log({iamspeed: count})

            // Lower inc to slow and higher to slow
            var inc = target / speed;
            if (i==2){
                console.log("yeeeeeeeeeeeeeeeeee")
                inc = target / 1;
            }

            // console.log(inc);
            // console.log(count);

            // Check if target is reached
            if (count < target) {
                // Add inc to count and output in counter
                counter.innerText = Math.round(count + inc);
                // Call function every ms
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
        i++;
    });
}