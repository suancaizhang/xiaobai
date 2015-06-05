//javascript dom	
	var total = 15;
	var zWin = $(window);
	var render = function() {
		var tmpl = '';
		var padding = 2;
		var scrollBarWidth = 0;
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		var picWidth = Math.floor((winWidth - padding * 2 - scrollBarWidth) / 3);
		var picHeight = Math.floor((winHeight - padding * 4 - scrollBarWidth) / 5);
		for (var i = 1; i <= total; i++) {
			var p = padding;
			if (i % 3 == 1) {
				p = 0;
			}
			tmpl += '<li data-id="' + i + '" class="animated bounceIn" style="width:' + picWidth + 'px;height:' + picHeight + 'px;padding-left:' + p + 'px;padding-top:' + padding + 'px;"><img src="img/' + i + '.jpg"></li>';
		}
		$('#container').html(tmpl);
	}
	render();
	var cid;
	var wImage = $('#large_img');
	var domImage = wImage[0];

	var loadImg = function(id, callback) {
		$('#container').css({
			height: zWin.height(),
			'overflow': 'hidden'
		})
		$('#large_container').css({
			width: zWin.width(),
			height: zWin.height()
				//top:$(window).scrollTop()
		}).show();
		var imgsrc = 'img/' + id + '.large.jpg';
		var ImageObj = new Image();
		ImageObj.src = imgsrc;
		ImageObj.onload = function() {
			var w = this.width;
			var h = this.height;
			var winWidth = zWin.width();
			var winHeight = zWin.height();
			var realw = parseInt((winWidth - winHeight * w / h) / 2);
			var realh = parseInt((winHeight - winWidth * h / w) / 2);

			wImage.css('width', 'auto').css('height', 'auto');
			wImage.css('padding-left', '0px').css('padding-top', '0px');
			if (h / w > 1.2) {
				wImage.attr('src', imgsrc).css('height', winHeight).css('padding-left', realw + 'px');;
			} else {
				wImage.attr('src', imgsrc).css('width', winWidth).css('padding-top', realh + 'px');
			}

			callback && callback();
		}


	}
	$('#container').delegate('li', 'tap', function() {
		var _id = cid = $(this).attr('data-id');
		loadImg(_id);
	});

	$('#large_container').tap(function() {
		$('#container').css({
			height: 'auto',
			'overflow': 'auto'
		})
		$('#large_container').hide();
	});
	$('#large_container').mousedown(function(e) {
		e.preventDefault();
	});
	var lock = false;
	$('#large_container').swipeLeft(function() {
		if (lock) {
			return;
		}
		cid++;

		lock = true;
		loadImg(cid, function() {
			domImage.addEventListener('webkitAnimationEnd', function() {
				wImage.removeClass('animated bounceInRight');
				domImage.removeEventListener('webkitAnimationEnd');
				lock = false;
			}, false);
			wImage.addClass('animated bounceInRight');
		});
	});

	$('#large_container').swipeRight(function() {
		if (lock) {
			return;
		}
		cid--;
		lock = true;
		if (cid > 0) {
			loadImg(cid, function() {
				domImage.addEventListener('webkitAnimationEnd', function() {
					wImage.removeClass('animated bounceInLeft');
					domImage.removeEventListener('webkitAnimationEnd');
					lock = false;
				}, false);
				wImage.addClass('animated bounceInLeft');
			});
		} else {
			cid = 1;
		}
	});
