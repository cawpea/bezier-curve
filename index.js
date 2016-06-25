var w = 480,
	h = 480,
	r = 5;

//キャンバスの初期化
var initCnvs = function() {
	var cnvs = $('<canvas>')
		.attr('width', w)
		.attr('height', h)
		.get(0);
	var cntx = cnvs.getContext('2d');

	$('body').append(cnvs);
	$(cnvs).click(function() {
		open( cnvs.toDataURL() );
	});

	cntx.fillStyle = '#FFC';
	cntx.fillRect(0,0,w,h);
	cntx.strokeStyle = '#000';
	cntx.fillStyle = '#F00';
	return cntx;
};
//比率の計算
var bzr = function( p0, p1, p2, rate ) {
	var p0_1 = p0 * (1 - rate) + p1 * rate;
	var p1_2 = p1 * (1 - rate) + p2 * rate;
	var p = p0_1 * (1 - rate) + p1_2 * rate;
	return [p0_1, p1_2, p];
};
//円の描画
var round = function(c, x, y) {
	c.beginPath();
	c.arc( x, y, r, 0, Math.PI * 2, false );
	c.fill();
};
//線の描画
var line = function() {
	var a = arguments,
		c = a[0];

	c.beginPath();
	for( var i = 1;i < a.length; i+= 2 ) {
		c[i == 1 ? 'moveTo':'lineTo'](a[i], a[i + 1]);
		c.stroke();
	}
};
//二次ベジェ曲線の描画
var drawBzr2 = function(c) {
	var x0 = 10,
		y0 = 10,
		x1 = w - 10,
		y1 = 10,
		x2 = w - 10,
		y2 = h - 10;

	line( c, x0, y0, x1, y1, x2, y2 );
	round( c, x0, y0 );
	round( c, x1, y1 );
	round( c, x2, y2 );

	var rt = 0;
	var id = setInterval( function() {
		if( rt > 1 ) {
			clearInterval(id);
			return;
		}
		var x = bzr( x0, x1, x2, rt ),
			y = bzr( y0, y1, y2, rt );

		line( c, x[0], y[0], x[1], y[1] );
		round( c, x[2], y[2] );

		rt += 0.025;
	}, 100);
};

//三次ベジェ曲線の描画
var drawBzr3 = function(c) {
	var x0 = 10,
		y0 = 10,
		x1 = w - 10,
		y1 = 10,
		x2 = w - 10,
		y2 = h - 10,
		x3 = 10,
		y3 = h - 10;

	line( c, x0, y0, x1, y1, x2, y2, x3, y3 );
	round( c, x0, y0 );
	round( c, x1, y1 );
	round( c, x2, y2 );
	round( c, x3, y3 );

	var rt = 0;
	var id = setInterval(function() {
		if( rt > 1 ) {
			clearInterval(id);
			return;
		}
		var xA = bzr( x0, x1, x2, rt ),
			yA = bzr( y0, y1, y2, rt );

		line( c, xA[0], yA[0], xA[1], yA[1] );

		var xB = bzr( x1, x2, x3, rt ),
			yB = bzr( y1, y2, y3, rt );

		line( c, xB[0], yB[0], xB[1], yB[1] );

		var xC = bzr( xA[0], xA[1], xB[1], rt ),
			yC = bzr( yA[0], yA[1], yB[1], rt );

		line( c, xC[0], yC[0], xC[1], yC[1] );
		round( c, xC[2], yC[2] );

		rt += 0.025;
	}, 100);
};

$(function () {
	drawBzr2( initCnvs() );
	drawBzr3( initCnvs() );
});
