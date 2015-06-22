$(function()
{
	// $('#productTitle').css('background', '#ff0000');

	var cover = $('<div></div>')
	.attr('id', 'cover')
	.appendTo('body');

	var floating_window = new $temazon.FloatingWindow(cover);
	cover.click(function()
	{
		floating_window.hide();
	});

	var pic_frame = $('<div></div>')
	.attr('id', 'pic_frame')
	.appendTo('body');

	var pics_link = $('<a></a>')
	.attr('id', 'teaka_link')
	.html('手垢本の画像を見る');

	var pics_area = $('<div></div>')
	.attr('id', 'teaka_pics_area')
	.css('width', $('#leftCol').width())
	.append(pics_link)
	.appendTo('#leftCol');

	$('#teaka_link')
	.click(function()
	{
		floating_window.show();
	});

});