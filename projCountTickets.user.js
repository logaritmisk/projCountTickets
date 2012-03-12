// ==UserScript==
// @name           activeCollab - Tickets Summary
// @namespace      http://activeCollab.com/
// @exclude        *
// ==/UserScript==

var $ = unsafeWindow.$;

var defaultSummaryCss = {
  'padding': '0 15px 7px',
  'font-size' : '10px',
};

$('#tickets h2.section_name').each(function() {
	$summary = $('<div class="section_summary_div">')
	  .text(countTickets($('+ div.section_container', this).children('ul.tickets_list')))
	  .css(defaultSummaryCss);

	$(this).append($summary);
});

/*
$('div.section_container ul.tickets_list').bind('sortover', function(event, ui) { console.log(ui); });
*/

function countTickets(elem) {
	var estimated = 0;
	var questions = 0;
	var points = 0;

	var pattern1 = /\[([0-9].*)h\]/i;
	var pattern2 = /\[\?h\]/i;
	var pattern3 = /\(([0-9].*)p\)/i

	$('.main_data a', elem).each(function() {
		var em = $(this).text().match(pattern1);
		var qm = $(this).text().match(pattern2);
		var pm = $(this).text().match(pattern3);

		if (em) {
			estimated += parseInt(em[1]);
		}
		if (qm) {
			questions += 1;
		}
		if (pm) {
			points += parseInt(pm[1]);
		}
	});

	return points + ' points (≈ ' + estimated + ' hours) - ' + questions + ' unknow';
}
