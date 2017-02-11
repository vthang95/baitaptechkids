const fs = require('fs');

var creatMap = () => {
	console.log('Map is created!\n');
	var mapDefaultString = fs.readFileSync('./data/mapdefault.json');
	var mapDefaultObject = JSON.parse(mapDefaultString);
	fs.writeFileSync('./data/map.json', JSON.stringify(mapDefaultObject));
	console.log(mapDefaultObject);
}

var randomEnemies = () => {
	var enemyString = fs.readFileSync('./data/mapdefault.json');
	var enemyObject = JSON.parse(enemyString);
	while (true) {
		var a = Math.floor((Math.random()*4+1));
		var b = Math.floor((Math.random()*4+1));
		var c = Math.floor((Math.random()*4+1));
		var d = Math.floor((Math.random()*4+1));
		if (a!=b) {
			enemyObject[a].splice(c, 1, 'x');
			enemyObject[b].splice(d, 1, 'x');
			break;
		}
		if (a==b) {
			while (true) {
				if (c==d) {
					c = Math.floor((Math.random()*4+1));
				} else {
					enemyObject[a].splice(c, 1, 'x');
					enemyObject[b].splice(d, 1, 'x');
					break;
				}
			}
		}
		break;
	};

	fs.writeFileSync('./data/enemies.json', JSON.stringify(enemyObject));
	
	var obj = {
		enemy: 2,
		rocket: 4
	}
	fs.writeFileSync('./data/counting.json', JSON.stringify(obj))
}

var tutorial = () => {
	console.log('Bay gio ban co the ban bang cach go lenh:');
	console.log('node app shot --x="toa do hang" --y="toa do cot"');
	console.log('Co 2 enemies nam ngoai tam rada can tieu diet');
	console.log('Ban co 4 rocket');
}

var shot = (x, y) => {

	if (x<1||y<1||y>4||x>4) {
		console.log('Khong ton tai toa do nay. Hay nhap toa do hop le');
		return;
	}
	console.log('Shot enemy at: ('+x,y+')');
	
	var countingString = fs.readFileSync('./data/counting.json');
	var countingObject = JSON.parse(countingString);
	var mapDataString = fs.readFileSync('./data/map.json');
	var mapDataObject = JSON.parse(mapDataString);
	var enemyString = fs.readFileSync('./data/enemies.json');
	var enemyObj = JSON.parse(enemyString);

	if (countingObject.rocket<=0) {
		console.log('Hay nhap "node app play" de choi lai');
		return;
	}
	countingObject.rocket--;

	function enemiesAround(ngang, doc) {
		var count = 0;
		if (enemyObj[doc][ngang-1] == 'x') {
			count++;
		}
		if (enemyObj[doc][ngang+1] == 'x') {
			count++;
		}
		if ((doc+1)<5&&(doc-1)>=0) {
			if (enemyObj[doc-1][ngang-1] == 'x') {
				count++;
			}
			if (enemyObj[doc-1][ngang] == 'x') {
				count++;
			}
			if (enemyObj[doc-1][ngang+1] == 'x') {
				count++;
			}
			if (enemyObj[doc+1][ngang-1] == 'x') {
				count++;
			}
			if (enemyObj[doc+1][ngang] == 'x') {
				count++;
			}
			if (enemyObj[doc+1][ngang+1] == 'x') {
				count++;
			}
		}
		if (doc==4) {
			if (enemyObj[doc-1][ngang-1] == 'x') {
				count++;
			}
			if (enemyObj[doc-1][ngang] == 'x') {
				count++;
			}
			if (enemyObj[doc-1][ngang+1] == 'x') {
				count++;
			}
		}	
		return count;
	}

	if (enemyObj[y][x]=='x') {
		console.log('Trung roi! Trung roi! :v');
		countingObject.enemy--;
		mapDataObject[y].splice(x, 1, 'o');
		enemyObj[y].splice(x, 1, '-');
		// cap nhat lai map
		fs.writeFileSync('./data/map.json', JSON.stringify(mapDataObject));
		fs.writeFileSync('./data/enemies.json', JSON.stringify(enemyObj));
		console.log('so may bay xung quanh la: '+enemiesAround(x, y));
	} else {
		mapDataObject[y].splice(x, 1, '*');
		console.log('Ban ban truot cmnr');
		//cap nhat lai map
		fs.writeFileSync('./data/map.json', JSON.stringify(mapDataObject));
		console.log('so may bay xung quanh la: '+enemiesAround(x, y));
	}

	if (countingObject.enemy==0) {
		console.log('Ban da thang!\nHay nhap "node app play" de choi lai');
		return;
	} 
	// in ra map hien tai!
	console.log(mapDataObject);
	console.log('Con lai '+countingObject.enemy+' so may bay dich!');
	console.log('Ban con lai '+countingObject.rocket+' so rocket');
	fs.writeFileSync('./data/counting.json', JSON.stringify(countingObject));

	if (countingObject.rocket==0) {
		console.log('Ban da thua!\nMay bay dich o day co ma:');
		console.log(enemyObj);
		console.log('Hay nhap "node app play" de choi lai');
		return;
	}
}

module.exports = {
	shot,
	creatMap,
	randomEnemies,
	tutorial
}