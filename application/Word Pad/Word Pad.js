///////////////////////////////
// wordpad.js
///////////////////////////////
//
// Functions of wordpad.
//	
//////////////////////////




/////////////////////
// Global Variables
/////////////////////



var currentNote;
var notes = {};
var wpOpened = false;



/////////////////////
// DOM Events
/////////////////////



$("#openWordpad").click(function(){toggleWordpad();});
$("#closeWordpad").click(function(){toggleWordpad();});

$("#wordpad").draggable({ handle: ".headbar" });

$("#addNote").click(function(){addNote();});
$("#deleteNote").click(function(){deleteNote();});
$("#renameNote").click(function(){renameNote();});
$("#save").click(function(){saveNote();});

$("#content").keyup(function(){
	$("#save").text('未儲存').css('color', '#990000');
	$("#note"+currentNote+" .noteSaveState").css("background-color","#CC6666");
	notes[currentNote].saved = false;
});



/////////////////////
// Functions
/////////////////////



function toggleWordpad() {
	
	if ( !wpOpened ) { // if wordpad hasn't been opened, open it
		wpOpened = true;
		$("#wordpad").slideDown();
		
		activeRender = false;
		activeControl = false;
		activeLook = false;
		
		currentNote = "welcome";
		
		$.post("php/Word Pad/loadNote.php", // todo: preload welcome to content
		{
			filename: 'welcome'
		},
		function(content){
			$("#content").val(content);
		});
		
		reloadFiles();
		setTimeout(function(){switchNote("welcome");},1000); //todo: delay it
	} else { // close it
		wpOpened = false;
		$("#wordpad").slideUp();
		
		activeRender = true;
		activeControl = true;
		activeLook = false;
		//todo: alert some warning if note hasn't been saved
	}
	
}



function saveNote() {
	
	notes[currentNote].content = $("#content").val();
	$.post("php/Word Pad/saveNote.php", 
	{
		content: $("#content").val(),
		filename: currentNote
	},
	function(){
		$("#save").text('已儲存').css('color', '#66FF00');
		$("[id=note"+currentNote+"] .noteSaveState").css("background-color","#99CC66"); //todotodotodos
		notes[currentNote].saved = true;
		$("[id=note"+currentNote+"] .noteContent").text($("#content").val().slice(0,50));
	});

}



function loadNote(noteName) {
	
	// append noteDiv first due to the sorting problem    todo todo todo
	var noteDiv = $("<div></div>")
	.attr("id","note"+noteName)
	.val(noteName)
	.addClass("noteDiv")
	.click(function(){ switchNote($(this).val()); });

	$("#fileSwitch").append(noteDiv);
	
	
	$.post("php/Word Pad/loadNote.php",
	{
		filename: noteName
	},
	function(content){
		
		// append Notes
		var note = {
			content: content,
			saved: true,
		};
		
		notes[noteName] = note;
			
			
		// append Note Div
		var divSaveState = $("<div></div>").addClass("noteSaveState");
		var divTitle = $("<div></div>").text(noteName).addClass("noteTitle");
		var divContent = $("<div></div>").text(content.slice(0,50)).addClass("noteContent");
		
		noteDiv.append(divSaveState);
		noteDiv.append(divTitle);
		noteDiv.append(divContent);
		
	});

}



function switchNote( noteName ) {
	
	$("#note"+currentNote).removeClass("noteDivSelected").addClass("noteDiv");
	$("#note"+noteName).removeClass("noteDiv").addClass("noteDivSelected");
	
	if ( notes[noteName].saved ) {
		$("#save").text('已儲存').css('color', '#66FF00');
	} else {
		$("#save").text('未儲存').css('color', '#990000');
	}
	
	notes[currentNote].content = $("#content").val(); //todo: not good
	currentNote = noteName;
	$("#content").val(notes[currentNote].content);
	
}



function reloadFiles() {
		
	$.post("php/Word Pad/reloadFiles.php",
	null,
	function(fileNames){
		
		$("#fileSwitch").empty();
		notes = {};
		
		var fileNameList = fileNames.split(",");
		fileNameList.sort();
		var len = fileNameList.length;
		
		for ( var i = 0; i != len; ++i ) {
			
			if ( fileNameList[i].search(".txt") == -1 ) {
				continue;
			}
			loadNote(fileNameList[i].slice(0,-4)); // cut ".txt"

		}
	});
	
}



function addNote() {

	var newNoteName;
	if ( newNoteName = prompt("輸入個你愛的名字") ) { // false when user press cancel
	
		var pattern = new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5]+$");
		if ( pattern.test(newNoteName) ) {
			$.post("php/Word Pad/addNote.php",
			{
				filename: newNoteName
			},
			function(result){
				if ( !result ) {
					alert("檔案已經有了！");
				} else {
					loadNote(newNoteName);	
					setTimeout(function(){switchNote(newNoteName);},1000); //todo: delay
				}
			});
		} else { // unvailed character
			alert("有不被允許的符號！");
		}
		
	}
	
}



function deleteNote() {
	
	if ( confirm("真的要刪除？") ) { 
		$.post("php/Word Pad/deleteNote.php",
		{
			filename: currentNote
		},
		function(deleteNoteName){
			switchNote("welcome");
			delete notes[deleteNoteName];
			$("#note"+deleteNoteName).remove();
		});
	}
	
}



function renameNote() {
	
	var newName = prompt("你想要什麼名字呢？");
	
	if ( newName.trim().length != 0 ) { 
	
		var pattern = new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5]+$");
		if ( pattern.test(newName) ) {
			
			$.post("php/Word Pad/renameNote.php",
			{
				oldFilename: currentNote,
				newFilename: newName
			},
			function(result){
				if ( !result ) {
					alert("名字重複惹，再想個吧");
				} else {
					$("#note"+currentNote+" .noteTitle").text(newName);
					$("#note"+currentNote).val(newName).attr("id","note"+newName);
					
					notes[newName] = notes[currentNote];
					delete notes[currentNote];
					currentNote = newName;
				}
			});
			
		} else { // unvailed character
			alert("有不被允許的符號！");
		}

	}
	
}