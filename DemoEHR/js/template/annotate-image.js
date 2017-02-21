 $(document).ready(function(){
	/*var lc = LC.init(document.getElementById("lc"), {
        imageURLPrefix: 'assets/lc-images',
        toolbarPosition: 'bottom',
        defaultStrokeWidth: 2,
        strokeWidths: [1, 2, 3, 5, 30]
      });
	  
	 
	  var div = "<div class='lc-pick-tool toolbar-button thin-button' style='background-image:url(assets/lc-images/upload.png);' title='Pencil' >"
	  			+"<input type='file' id='fileSelect' class='customfile' accept='image/*'></div>";
		$('.lc-picker-contents').append(div);
		var div = "<div class='lc-pick-tool toolbar-button thin-button' style='background-image:url(assets/lc-images/download.png);' onclick='downloadCanvas()' title='Pencil' ></div>";
		$('.lc-picker-contents').append(div);	*/
	 //drawCanvas();
	});

function drawCanvas(){
	var lc = LC.init(document.getElementById("lc"), {
        imageURLPrefix: 'images/lc-images',
        toolbarPosition: 'bottom',
        defaultStrokeWidth: 2,
        strokeWidths: [1, 2, 3, 5, 30]
      });
	setCanvasProperties();
	  var div = "<div class='lc-pick-tool toolbar-button thin-button' style='background-image:url(images/lc-images/upload.png);' title='Pencil' >"
	  			+"<input type='file' id='fileSelect' class='customfile' accept='image/*'></div>";
		$('.lc-picker-contents').append(div);
		/*var div = "<div class='lc-pick-tool toolbar-button thin-button' style='background-image:url(assets/lc-images/download.png);' onclick='downloadCanvas()' title='Pencil' ></div>";
		$('.lc-picker-contents').append(div);*/
}
	  
$(document).on('change','#fileSelect',function(event){
	$('.lc-clear').trigger('click');
	  var canvas = document.getElementById('imageCanvas');
	  var ctx = canvas.getContext('2d');
		var myFile = $('#fileSelect').prop('files');
		var reader = new FileReader();
        reader.onload = function(e){
        var img = new Image();
        img.onload = function(){
        	setCanvasProperties();
        	//canvas.width = 579;
            //canvas.height = 369;
         	ctx.drawImage(img,0,0,579,369);
         	//$(canvas).css({"height":369,"width":579});
         	
				}
        	img.src = e.target.result;
		}
	 reader.readAsDataURL(event.target.files[0]);     
});
	  
	  //====================================================
	  function downloadCanvas() {
	  var bottleCanvas = document.getElementById('imageCanvas');
	  var designCanvas = document.getElementById('drawingCanvas');

	  var bottleContext = bottleCanvas.getContext('2d');
	  bottleContext.drawImage(designCanvas, 0, 0, 579, 369);

	  var dataURL = bottleCanvas.toDataURL("image/png");
	 
	  //document.getElementById('imageCanvas').getContext('2d')
	  var canvas = document.createElement('canvas');
	  if (!canvas) {
	    alert('Error: I cannot create a new canvas element!');
	    return;
	  }

	  canvas.id     = 'imageAnnotate';
	  canvas.width  = 579;
	  canvas.height = 369;
	  //container.appendChild(canvas);

	  canvas.getContext('2d').drawImage(bottleCanvas, 0, 0, 579, 369);
	  
	  document.getElementById('finalContainer').appendChild(canvas);
	  //$("#annotation-modal").dismiss();
	  
	// clear canvas
	  $('.lc-clear').trigger('click');
	  var canvas = document.getElementById('imageCanvas');
	  context = canvas.getContext('2d');
	  context.clearRect(0, 0, canvas.width, canvas.height);
	}
	  
	  //==========================================
	  
	  function setCanvasProperties(){
		  var canvas = document.getElementById('imageCanvas');
		  $(canvas).css({"height":369,"width":579});
		  $(canvas).attr({"height":369,"width":579});
		    $('#drawingCanvas').css({"height":369,"width":579});
		 	$('#drawingCanvas').attr("height","369");
		 	$('#drawingCanvas').attr("width","579");
	  }