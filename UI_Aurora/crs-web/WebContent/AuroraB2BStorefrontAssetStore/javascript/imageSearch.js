/*
 *-----------------------------------------------------------------
	=================================================================
	Copyright [2021] [HCL America, Inc.]
	=================================================================
 *-----------------------------------------------------------------
 */
var width = 320; // We will scale the photo width to this
var height = 0; // This will be computed based on the input stream

var streaming = false;

var video = null;
var canvas = null;
var photo = null;
var startbutton = null;

function getImageSearchDialog() {
	var str = `<div id="myModal" class="modal">
		<!-- Modal content -->
		<div class="modal-content">
		<span class="close" onclick="document.getElementById('myModal').style.display='none';">&times;</span>
		<div class="dialod-cls" role="dialog" aria-labelledby="simple-dialog-title">
		<div class="dialogTitle-root" id="simple-dialog-title"><h2 class="h6">Select Photo</h2></div>
		<div class="dialogContent-root">
		<div class="options" id="myBtn1" onclick="openLiveImage()"><span class="icon">
		<svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="24px" height="24px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" style="transform: rotate(360deg);">
		<path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m8 3a5 5 0 0 0-5 5a5 5 0 0 0 5 5a5 5 0 0 0 5-5a5 5 0 0 0-5-5m0 2a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3z" fill="currentColor"></path>
		</svg>Take a beautiful Picture</span>
		</div>
		<div class="options" id="myBtn2" onclick="openExistingImage()"><span class="icon">
		<svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="24px" height="24px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" style="transform: rotate(360deg);">
		<path d="M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m8 18v-1c0-1.33-2.67-2-4-2s-4 .67-4 2v1h8m-4-8a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2z" fill="currentColor"></path>
		</svg>Choose an existing photo</span>
		</div>
		</div>
		</div>
		</div>
		</div>
		`;
	return str;
}
function getLivePictureDialog() {
	var str = `<div id="myModal1" class="modal">
		<!-- Modal content -->
		<div class="modal-content">
		<span class="close1" onclick="document.getElementById('myModal1').style.display='none';">&times;</span>
		<div class="contentarea">
		<div class="camera">
		<video id="video">Video stream not available.</video>
		</div>
		<div><button id="startbutton">Take photo</button></div>
		<canvas id="canvas"></canvas>
		<div class="output">
		<img id="photo" alt="The screen capture will appear in this box.">
		</div>
		</div>
		</div>
		</div>
		`;
	return str;
}

function getExistingImageDialog() {
	var str = `<div id="myModal2" class="modal">
		<div class="modal-content">
		<span class="close2" onclick="document.getElementById('myModal2').style.display='none';">&times;</span>
		<div class="dialog-cls" role="dialog" aria-labelledby="simple-dialog-title">
		<div class="dialogTitle-root" id="simple-dialog-title">
		<h2 class="h6">Select Photo from Gallery</h2>
		</div>
		<div class="dialogContent-root"><div style="padding:20px"><input type="file" accept="image/x-png,image/gif,image/jpeg" onchange="readData(this)" /></div></div></div>

		</div>
		</div>
		`;
	return str;
}
function openDialog(cls, fn) {
	if (document.getElementById(cls)) {
		document.getElementById(cls).remove();
	}
	var myDiv = document.createElement("div");
	myDiv.id = cls;
	myDiv.innerHTML = fn();
	document.body.appendChild(myDiv);
}
function openImageDialog() {
	openDialog('dialog', getImageSearchDialog);

}

function openLiveImage() {
	openDialog('live-dialog', getLivePictureDialog);
	startup();
}

function openExistingImage() {
	openDialog('existing-dialog', getExistingImageDialog);

}

function startup() {
	video = document.getElementById('video');
	canvas = document.getElementById('canvas');
	photo = document.getElementById('photo');
	startbutton = document.getElementById('startbutton');

	navigator.mediaDevices.getUserMedia({
		video: true,
		audio: false
	})
		.then(function (stream) {
			video.srcObject = stream;
			video.play();
		})
		.catch(function (err) {
			console.log("An error occurred: " + err);
		});

	video.addEventListener('canplay', function (ev) {
		if (!streaming) {
			height = video.videoHeight / (video.videoWidth / width);

			if (isNaN(height)) {
				height = width / (4 / 3);
			}

			video.setAttribute('width', width);
			video.setAttribute('height', height);
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			streaming = true;
		}
	}, false);

	startbutton.addEventListener('click', function (ev) {
		takepicture();
		ev.preventDefault();
	}, false);

	clearphoto();
}


function clearphoto() {
	var context = canvas.getContext('2d');
	context.fillStyle = "#AAA";
	context.fillRect(0, 0, canvas.width, canvas.height);
	var data = canvas.toDataURL('image/png');
}

function takepicture() {
	var context = canvas.getContext('2d');
	if (width && height) {
		canvas.width = width;
		canvas.height = height;
		context.drawImage(video, 0, 0, width, height);
		var data = canvas.toDataURL('image/png');
		const base64bytes = new String(data).split(",")[1];
		getGoogleResult(base64bytes);

	} else {
		clearphoto();
	}
}

async function getGoogleResult(imageBytes) {

	const rawResponse = await fetch('https://us-central1-commerce-product.cloudfunctions.net/app1/image-search-aurorab2c', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ imageBytes: imageBytes })
	});
	const content = await rawResponse.json();
	console.log(content);
	refineImageSearchResult(content);

}
function refineImageSearchResult(res) {
	let products = res.responses[0].productSearchResults.results;

	let productArr = products.map((productobj) => {
		let labelArr = productobj.product.productLabels;
		let result = labelArr.find(obj => {
			return obj.key === 'PARTNUMBER'
		})
		let obj = {
			score: Math.round(productobj.score * 100),
			partnumber: result.value,
			name: productobj.product.displayName
		};
		return obj;
	})
	console.log("product Array---", productArr);
	checkForExactMatch(productArr);
}

function checkForExactMatch(products) {
	let { score, partnumber } = products[0];
	const EXACTMATCH_SCORE = 95;
	const RELEVANTMATCH_SCORE = 25;

	/*if (score >= EXACTMATCH_SCORE) {
		 redirectToPDPPage(partnumber);
		//window.location=window.location.origin+window.location.pathname+"/345-3222-bucket-gp-2";
	} else*/ if (score >= RELEVANTMATCH_SCORE) {
		let partnumbers = ((products.filter(product => product.score >= RELEVANTMATCH_SCORE)).map(obj => obj.partnumber)).join(",");

		document.getElementById("SimpleSearchForm_SearchTerm").value = "IMAGESEARCH";
		var form = document.forms['searchBox'];
		var el = document.createElement("input");
		el.type = "hidden";
		el.name = "partNumbers";
		el.value = partnumbers;
		form.appendChild(el);
		form.submit();

	} else {
		document.getElementById("SimpleSearchForm_SearchTerm").value = "IMAGESEARCH";
		var form = document.forms['searchBox'];
		form.submit();
	}
}

/*async function redirectToPDPPage(partnumber) {

	const rawResponse = await fetch('https://10.0.0.4:30921/search/resources/store/1/productview/' + partnumber, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});
	const content = await rawResponse.json();
}*/

function readData(fileToRead) {
	console.log(fileToRead.files[0]);
	//input is from file and not from web cam
	var reader = new FileReader();
	reader.readAsDataURL(fileToRead.files[0]);
	reader.onloadend = () => {
		const imageSrc = new String(reader.result);
		const base64bytes = new String(imageSrc).split(",")[1];
		getGoogleResult(base64bytes);
	};
}

window.onclick = function (event) {
	if (event.target == document.getElementById('myModal')) {
		document.getElementById('myModal').style.display = "none";
	}
}

$(document).ready(function () { /* code here */


});


