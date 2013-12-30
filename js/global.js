$(document).ready(function(){
	updateWindow();
	truncatePreview();
	beResponsive();

	$(window).resize(function(){
		updateWindow();
		beResponsive();
	});
});






// Make post container clickable as well as <a>
var postHref;

$('#recent .post').each(function(){
	postHref = $(this).find('a.title').attr('href');
});

$('#recent .post').click(function(e){
	if(mobile){
		window.location = postHref;
		e.preventDefault();
	}
});

$('.comments').on('click', function(e){
	if($('#comments').length == 0) {
		window.location = postHref + '#comments';
		e.preventDefault();
	} else {
		$('html,body').animate({
			scrollTop: $('#comments').offset().top
		}, 1000);
		e.preventDefault();
	}
});

var mobMenu;

$('.mob-menu-btn').click(function(e){
	if(!mobMenu) {
		$('#menu').show();
		mobMenu = true;
	} else {
		$('#menu').hide();
		mobMenu = false;
	}
});






// Truncate posts on homepage
function truncatePreview() {
	var postShort,
		postDate,
		postComments,
		commentsTitle;

	$('a.more').remove();

	$('.preview').each(function(){
		postDate = $(this).parent().find('.date').text();
		postComments = $(this).parent().find('.comments').text();

		postComments == 1 ? commentsTitle = 'Comment' : commentsTitle = 'Comments';


		if(mobile) {
			$(this).parent().find('.post-info').html('<span class="date">' + postDate + '</span> &bull; <a href="' + postHref + '" class="comments">' + postComments + '</a>');
		}

		if($(this).parent().hasClass('newest')){
			mobile ? postShort = $(this).text().trim().substring(0,120).split(' ').slice(0,-1).join(' ') + '...' : postShort = $(this).text().trim().substring(0,540).split(' ').slice(0,-1).join(' ') + '...';
		} else {
			mobile ? $(this).remove() : postShort = $(this).text().trim().substring(0,150).split(' ').slice(0,-1).join(' ') + '...';
		}

		if(mobile){
			$(this).html('<p>&ldquo;' + postShort + '&rdquo;</p>');
		} else {
			$(this).html('<p>&ldquo;' + postShort + '&rdquo; <a href="' + postHref +'" class="more">Read More</a></p>');
		}

		$(this).parent().find('.comments').attr('href', postHref + '#comments').attr('title', postComments + ' ' + commentsTitle);
	});
}


function beResponsive() {
	// If for some reason the headers' height gets fudged with, re-position everything below it accordingly; aesthetics only
	var headerHeight = $('#header').height();

	$('#collection').css('padding-top', '');
	$('#space').css('top','');

	$('#collection').css('padding-top', headerHeight);

	if(!mobile) {
		$('#space').css('top', headerHeight + 60);
	}

	if(mobile) {
		$('.mob-menu-btn').css('height', headerHeight);
	}
}


function updateWindow() {
	var windowWidth = window.screen.width < window.outerWidth ? window.screen.width : window.outerWidth;
		mobile = windowWidth < 768;
}