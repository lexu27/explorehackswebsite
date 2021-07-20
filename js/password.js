import {run} from "./magic.js"

var password = [0,3,3,2,1,3,0];
const reset = [0,3,3,2,1,3,0];

//JQuery below

$('.0').click(validation);

$('.1').click(validation);

$('.2').click(validation);

$('.3').click(validation);


function validation(event) {

	if (event.target.classList.contains(password[0].toString()))
	{
		password.splice(0, 1);
	}

	if (password.length === 0) 
	{
		$("#Totally_Not_Suspicious_Random_Canvas_😏🤫").css("display", "block");
		$("#info").css("display", "block")
		$(".main").remove();
		$("body").css("height", "100%");
		$("html").css("height", "100%");
		run();

	}

	if (password[0] !== parseInt(event.target.id)) {
		password = reset;
	}

}