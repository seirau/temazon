$(function()
{
	var cur_book_title = $('#productTitle').html();
	var teakas = [];

	$.ajax(
	{
		async: false
		,url: "http://49.212.141.66/DYY/list.php"
		,cache: false
		,scriptCharset: 'utf-8'
		,dataType: 'json'
		,success: function(data)
		{
			$.each(data, function(key, val)
			{
				var book_title = val['book_title'];
				book_title = book_title.replace(/　/g, "　?");

				if (cur_book_title.match(new RegExp(book_title, "i")))
				{
					teakas.push(val['index']);
				}
			});
		}
		,error: function(XMLHttpRequest, textStatus, errorThrown)
		{
		}
	});

	if (teakas.length <= 0)
	{
		return;
	}

	// $('#productTitle').css('background', '#ff0000');

	// フローティングウィンドウカバー
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

	$.each(teakas, function(key, val)
	{
	});

	var pics_area = $('<div></div>')
	.attr('id', 'teaka_pics_area')
	.css('width', $('#leftCol').width())
	.append($('<a></a>').attr('id', 'teaka_link').html('手垢本の画像を見る'))
	.appendTo('#leftCol');

	$('#teaka_link')
	.click(function()
	{
		floating_window.show();
	});
});