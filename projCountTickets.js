// ==UserScript==
// @name           Nodeone: AC Count Tickets
// @namespace      http://proj.nodeone.se/
// ==/UserScript==

var $ = unsafeWindow.$;

var defaultStatusbarCss = {
  'padding' : '10px',
  'margin': '10px 0',
  'background-color'  : '#000',
  'color' : '#FFFFFF',
  'font-size' : '9px',
  'font-weight' : 'bold',
};

$('div.section_container ul.tickets_list').each(function() {
	$statusbar = $('<div>').text(countTickets($(this))).css(defaultStatusbarCss);
	$(this).append($statusbar);
});

function countTickets(elem) {
	var estimated = 0;
	var questions = 0;
	
	var pattern1 = /\[([0-9].*)h\]/i;
	var pattern2 = /\[\?h\]/i;
	$('.main_data a', elem).each(function() {
		var em = $(this).text().match(pattern1);
		var qm = $(this).text().match(pattern2);
		if(em) {
			estimated += parseInt(em[1]);
		}
		if(qm) {
			questions += 1;
		}
	});
	
	return 'Total estimated: ' + estimated + " hours - Questions: "  + questions
}

