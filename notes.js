const fs = require('fs');

var creatMap = () => {
	console.log('Map is created!\n')
	try {
		var readDt = fs.readFileSync('data.json');
		dataObject = JSON.parse(readDt);
	} catch (err) {

	}
	var mapDefault = fs.readFileSync('datadefault.json');
	var mapDefaultObject = JSON.parse(mapDefault);
	fs.writeFileSync('datatmp.json', JSON.stringify(mapDefaultObject));
	console.log(dataObject);
}


var randomEnemies = () => {
	var dataTmp = fs.readFileSync('data.json');
	var tmpObject = JSON.parse(dataTmp);
	while (true) {
		var a = Math.floor((Math.random()*4+1));
		var b = Math.floor((Math.random()*4+1));
		var c = Math.floor((Math.random()*4+1));
		var d = Math.floor((Math.random()*4+1));
		if (a!=b) {
			tmpObject[a].splice(c, 1, 'x');
			tmpObject[b].splice(d, 1, 'x');
			break;
		}
		if (a==b) {
			while (true) {
				if (c==d) {
					c = Math.floor((Math.random()*4+1));
				} else {
					tmpObject[a].splice(c, 1, 'x');
					tmpObject[b].splice(d, 1, 'x');
					break;
				}
			}
		}
		break;
	};
	fs.writeFileSync('tmp.json', JSON.stringify(tmpObject));

	// Luu so enemies con lai va so lan ban con lai
	var obj = {
		enemy: 2,
		rocket: 4
	}
	fs.writeFileSync('counting.json', JSON.stringify(obj))
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
	
	var counting = fs.readFileSync('counting.json');
	var countingObject = JSON.parse(counting);
	if (countingObject.rocket<=0) {
		console.log('Hay nhap "node app play" de choi lai');
		return;
	}
	countingObject.rocket--;

	//Lay thong tin cua file data luu toa do enemies
	var infoData = fs.readFileSync('datatmp.json');
	var infoDataTmp = JSON.parse(infoData);
	var mapDataTmp = fs.readFileSync('tmp.json');
	var dataObj = JSON.parse(mapDataTmp);
	console.log(dataObj);

	function enemiesAround(ngang, doc) {
		var count = 0;
		if (dataObj[doc][ngang-1] == 'x') {
			count++;
		}
		if (dataObj[doc][ngang+1] == 'x') {
			count++;
		}
		if ((doc+1)<5&&(doc-1)>=0) {
			if (dataObj[doc-1][ngang-1] == 'x') {
				count++;
			}
			if (dataObj[doc-1][ngang] == 'x') {
				count++;
			}
			if (dataObj[doc-1][ngang+1] == 'x') {
				count++;
			}
			if (dataObj[doc+1][ngang-1] == 'x') {
				count++;
			}
			if (dataObj[doc+1][ngang] == 'x') {
				count++;
			}
			if (dataObj[doc+1][ngang+1] == 'x') {
				count++;
			}
		}
		if (doc==4) {
			if (dataObj[doc-1][ngang-1] == 'x') {
				count++;
			}
			if (dataObj[doc-1][ngang] == 'x') {
				count++;
			}
			if (dataObj[doc-1][ngang+1] == 'x') {
				count++;
			}
		}	
		return count;
	}

	if (dataObj[y][x]=='x') {
		console.log('Trung roi! Trung roi! :O');
		countingObject.enemy--;
		infoDataTmp[y].splice(x, 1, 'o');
		dataObj[y].splice(x, 1, '-');
		// cap nhat lai map vao file datatmp.json
		fs.writeFileSync('datatmp.json', JSON.stringify(infoDataTmp));
		fs.writeFileSync('tmp.json', JSON.stringify(dataObj));
		console.log('so may bay xung quanh la: '+enemiesAround(x, y));
		// console.log(dataObj);
		// console.log(infoDataTmp);
	} else {

		infoDataTmp[y].splice(x, 1, '*');
		// console.log(infoDataTmp);
		console.log('Ban ban truot cmnr');
		//cap nhat lai map vao file datatmp.json
		fs.writeFileSync('datatmp.json', JSON.stringify(infoDataTmp));
		console.log('so may bay xung quanh la: '+enemiesAround(x, y));
		// console.log(infoDataTmp);
	}
	if (countingObject.enemy==0) {
		console.log('Ban da thang!\nHay nhap "node app play" de choi lai');
		return;
	} 
	// console.log(dataObj);	
	console.log(infoDataTmp);
	console.log('Con lai '+countingObject.enemy+' so may bay dich!');
	console.log('Ban con lai '+countingObject.rocket+' so rocket');
	fs.writeFileSync('counting.json', JSON.stringify(countingObject));
	if (countingObject.rocket==0) {
		console.log('Ban da thua!\nMay bay dich o day co ma:');
		console.log(dataObj);
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