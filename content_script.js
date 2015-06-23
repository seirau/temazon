$(function()
{
	$('#productTitle').css('background', '#ff0000');

	var book_title = $('#productTitle').html();

	if ("ちいさなたまねぎさん (こどものくに傑作絵本)".match(/ちいさなたまねぎさん/))
	{
		console.log("match");
	}

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
				if (book_title.match(new RegExp(val['book_title'])))
				{
					console.log('match');
				}
			});
		}
		,error: function(XMLHttpRequest, textStatus, errorThrown)
		{

		}
	});

	// foreach ($res as $data)
	// {
	// 	console.log($data['book_title']);

	// 	if (strpos($data['book_title'], book_title) != FALSE)
	// 	{
	// 	}
	// }

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