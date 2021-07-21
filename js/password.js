import {run} from "./magic.js"
import {run2} from "./paper.js"

var password1 = [0,3,2,1,1,3];
const reset1 = [0,3,2,1,1,3];


var password2 = [0,3,3,2,1,3,0];
const reset2 = [0,3,3,2,1,3,0];

//JQuery below

$('#0').click(validation1);

$('#1').click(validation1);

$('#2').click(validation1);

$('#3').click(validation1);

$('.0').click(validation2);

$('.1').click(validation2);

$('.2').click(validation2);

$('.3').click(validation2);

function validation1(event) {
	console.log("here");

	console.log(event.target);
	console.log(password1[0].toString());
	if (event.target.id === password1[0].toString())
	{
		password1.splice(0, 1);
	}

	if (password1.length === 0) 
	{
		// below code is leo code
		$("#canvas").css("display", "block");
		$(".main").remove();
		$("body").css("height", "100%");
		$("body").css("margin", "0");
		$("body").css("overflow", "hidden");
		$("html").css("height", "100%");
		$("html").css("margin", "0");
		$("html").css("overflow", "hidden");
		console.log("correct");
		run2();

		// below code is danny code
		// $("html").css("margin", "0");
		// $("html").css("overflow", "hidden");
		// $("html").css("height", "100%");
		// $("#canvas").css("margin", "0");
		// $("#canvas").css("overflow", "hidden");
		// $("#canvas").css("height", "100%");
		// console.log("yoooo");
		// run2();


	}

	if (password1[0] !== parseInt(event.target.id)) {
		password1 = reset1;
	}

}

function validation2(event) {

	if (event.target.classList.contains(password2[0].toString()))
	{
		password2.splice(0, 1);
	}

	if (password2.length === 0) 
	{
		$("#Totally_Not_Suspicious_Random_Canvas_😏🤫").css("display", "block");
		$("#info").css("display", "block")
		$(".main").remove();
		$("body").css("height", "100%");
		$("html").css("height", "100%");
		run();

	}

	if (password2[0] !== parseInt(event.target.id)) {
		password2 = reset2;
	}

}