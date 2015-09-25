
function loadJSON(url)
{
	var json;
	$.ajax({
		async: false
		,url: url
		,cache: false
		,scriptCharset: 'utf-8'
		,dataType: 'json'
		,success: function(data)
		{
			json = data;
		}
		,error: function(XMLHttpRequest, textStatus, errorThrown)
		{
		}
	});
	return json;
}

function setupTeakaBookPics(teakas)
{
	$.each(teakas, function(key, val)
	{
		var book_data = loadJSON('http://49.212.141.66/DYY/list.php?book_id='+val);
		var urls = book_data[0]['url'].split(",");
		$.each(urls, function(key, val)
		{
			$.ajax({
				async: true
				,url: 'http://49.212.141.66/DYY/flickr_parser.php?url='+val
				,cache: false
				,scriptCharset: 'utf-8'
				,dataType: 'text'
				,success: function(data)
				{
					$('<img>')
					.attr('src', data)
					.css({
						width: '550px'
						,marginTop: '8px'
					})
					.appendTo('#pic_frame');
				}
			});
		});
	});
}

/*
 * 指定したタイトルから手垢インデックスを返す
*/
function getTeakaIndexes(title)
{
	var teakas = [];

	var books = loadJSON('http://49.212.141.66/DYY/list.php');
	$.each(books, function(key, val)
	{
		var book_title = val['book_title'];
		book_title = book_title.replace(/　/g, "　?");

		if (title.match(new RegExp(book_title, "i")))
		{
			teakas.push(val['index']);
		}
	});

	return teakas;
}

function setupHTML()
{
	// 手垢本写真
	var pics_area = $('<div></div>')
	.attr('id', 'teaka_pics_area')
	.css('width', $('#leftCol').width())
	.append($('<a></a>').attr('id', 'teaka_link').html('手垢本の画像を見る'))
	.appendTo('#leftCol');

	$('#teaka_link').click(function()
	{
		floating_window.show();
	});

	var sell_section = $('<div></div>')
	.addClass('a-section a-spacing-medium a-padding-base');

	// 手垢本登録ボタン
	$('<span></span>')
	.addClass('a-size-small sdpText')
	.html('この商品の手垢本をお持ちですか？')
	.appendTo(sell_section);

	$('<span></span>')
	.addClass('a-button a-button-small a-float-right')
	.append(
		$('<span></span>')
		.addClass('a-button-inner')
		.append(
			$('<a></a>')
			.addClass('a-button-text')
			.attr('href', 'https://docs.google.com/forms/d/1IotgbGNCHX9DBL2_gAEvuL8T3tV10S5kK7dCIHSc8tA/viewform')
			.attr('target', '_blank')
			.attr('role', 'button')
			.html('手垢本を登録する')
			)
	)
	.appendTo(sell_section);

	$('#sellYoursHere_feature_div')
	.append(sell_section);
}

/* =======================================================
 * エントリポイント
=========================================================*/
$(function()
{
	var cur_book_title = $('#productTitle').html();
	var teakas = getTeakaIndexes(cur_book_title);
	if (teakas.length <= 0)
	{
		return;
	}

	// $('#productTitle').css('background', '#ff0000');

	// フローティングウィンドウカバー
	var cover = $('<div></div>')
	.attr('id', 'cover')
	.appendTo('body');

	var floating_window = new $temazon.FloatingWindow(cover, teakas);
	cover.click(function()
	{
		floating_window.hide();
	});

	var pic_frame_width = 760;
	var pic_frame_height = 520;
	var pic_frame = $('<div></div>')
	.attr('id', 'pic_frame')
	.css({
		width: pic_frame_width
		,height: pic_frame_height
	})
	.appendTo('body');

	setupTeakaBookPics(teakas);

	setupHTML();
});