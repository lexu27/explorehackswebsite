import {run} from "./magic.js"

const password = [0,3,3,2,1,3,0];
var position = 0;

//JQuery below

$('.0').click(validation);

$('.1').click(validation);

$('.2').click(validation);

$('.3').click(validation);


function validation(event) {
	if (event.target.classList.contains(password[position].toString()))
	{
		position++;
	}

	if (position === password.length) 
	{
		$("#Totally_Not_Suspicious_Random_Canvas_😏🤫").css("display", "block");
		$("#info").css("display", "block")
		$(".main").remove();
		$("body").css("height", "100%");
		$("html").css("height", "100%");
		run();

	}

	if (password[position] !== parseInt(event.target.id)) {
		position = 0;
	}

}