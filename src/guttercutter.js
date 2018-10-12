var sketch = require('sketch/dom')
var async = require('sketch/async')
var DataSupplier = require('sketch/data-supplier')
var UI = require('sketch/ui')
var Settings = require('sketch/settings')
var Document = require('sketch/dom').Document
var Page = require('sketch/dom').Page
var api = require('sketch')
var Rectangle = require('sketch/dom').Rectangle

export function createVerticalGuides(context) {
	superMainFunc(context, "vertical");
}

export function createHorizontalGuides(context) {
	superMainFunc(context, "horizontal");
}

export function removeAllGuides(context) {
	superMainFunc(context, "remove");
}


var innerGutter = 0;
var outerGutter = 0;
var numberOfColumns = 0;
var numberOfRows = 0;

var document = undefined;
var selection = undefined;
var layer = undefined;


function superMainFunc (context, whatWeDo) {


	document = Document.getSelectedDocument();

	if(document === undefined){
		UI.message("Document is undefined");
		return;
	}

	selection = document.selectedLayers;
	if(selection === undefined || selection.isEmpty){
		UI.message("You must select a layer");
		return;
	}

	if(selection.length > 1){
		UI.message("You must select one layer only");
		return;
	}

	layer = selection.layers[0];


	/* Using the Context */
	var doc = context.document;
	var current_wrapper = doc.currentPage().currentArtboard() || doc.currentPage();
	var vertical_guides = current_wrapper.horizontalRulerData();
	var horizontal_guides = current_wrapper.verticalRulerData();
	/*  */


	if (whatWeDo == "vertical") {
		createVerticalGuides();
	} else if (whatWeDo == "horizontal") {
		createHorizontalGuides();
	} else if (whatWeDo == "remove"){
		removeAllGuides();
	}


	function getGutterValues(n) {
		if(n > 1){
			var _innerGutter = Number(UI.getStringFromUser("Enter the desired inner gutter", 0));
			if(Number.isNaN(_innerGutter)){
				UI.message("This is not a valid value!");
				return;
			}
			innerGutter = parseInt(_innerGutter);
		}


		var _outerGutter = Number(UI.getStringFromUser("Enter the desired outer gutter", 0));
		if(Number.isNaN(_outerGutter)){
			UI.message("This is not a valid value!");
			return;
		}
		outerGutter = parseInt(_outerGutter);
	}

	function createVerticalGuides () {

		// Get the number of columns
		var _numberOfColumns = Number(UI.getStringFromUser("Enter the number of columns", 1));
		if(Number.isNaN(_numberOfColumns) || parseInt(_numberOfColumns) === 0){
			UI.message("This is not a valid value!");
			return;
		}
		numberOfColumns = parseInt(_numberOfColumns);

		// get the gutter values
		getGutterValues(numberOfColumns);

		// create the rect to split
		var rect = new Rectangle(layer.frame);
		var innerRect = new Rectangle((rect.x + outerGutter), rect.y, (rect.width - outerGutter * 2 ), rect.height);

		// add guides at the beginning and at the end of the object
		vertical_guides.addGuideWithValue(rect.x);
		vertical_guides.addGuideWithValue(rect.x + rect.width);

		// add outer gutter
		if(outerGutter > 0){
			vertical_guides.addGuideWithValue(innerRect.x);
			vertical_guides.addGuideWithValue(innerRect.x + innerRect.width);
		}

		// add internal guides
		if(numberOfColumns > 1){

			var gutterSum = innerGutter * (numberOfColumns-1);
			var columnSize = (innerRect.width - gutterSum) / numberOfColumns;
			var sliceSize = columnSize + innerGutter;

			for(var i=1;i<numberOfColumns;i++){
				vertical_guides.addGuideWithValue(innerRect.x + (sliceSize*(i-1)) + columnSize);
				if(innerGutter > 0){
					vertical_guides.addGuideWithValue(innerRect.x + (sliceSize*(i-1)) + sliceSize);
				}
			}

		}

	}

	function createHorizontalGuides () {

		// Get the number of rows
		var _numberOfRows = Number(UI.getStringFromUser("Enter the number of rows", 1));
		if(Number.isNaN(_numberOfRows) || parseInt(_numberOfRows) === 0){
			UI.message("This is not a valid value!");
			return;
		}
		numberOfRows = parseInt(_numberOfRows);

		// get the gutter values
		getGutterValues(numberOfRows);

		// create the rect to split
		var rect = new Rectangle(layer.frame);
		var innerRect = new Rectangle(rect.x, (rect.y + outerGutter), rect.width, (rect.height - outerGutter * 2 ));

		// add guides at the beginning and at the end of the object
		horizontal_guides.addGuideWithValue(rect.y);
		horizontal_guides.addGuideWithValue(rect.y + rect.height);

		// add outer gutter
		if(outerGutter > 0){
			horizontal_guides.addGuideWithValue(innerRect.y);
			horizontal_guides.addGuideWithValue(innerRect.y + innerRect.height);
		}

		// add internal guides
		if(numberOfRows > 1){

			var gutterSum = innerGutter * (numberOfRows-1);
			var rowSize = (innerRect.height - gutterSum) / numberOfRows;
			var sliceSize = rowSize + innerGutter;

			for(var i=1;i<numberOfRows;i++){
				horizontal_guides.addGuideWithValue(innerRect.y + (sliceSize*(i-1)) + rowSize);
				if(innerGutter > 0){
					horizontal_guides.addGuideWithValue(innerRect.y + (sliceSize*(i-1)) + sliceSize);
				}
			}

		}

	}

	function removeAllGuides () {

		// @todo Remove only the guides are inside the selected layer

		var countVertical = vertical_guides.numberOfGuides();
		var countHorizontal = horizontal_guides.numberOfGuides();

		var guidesTotal = countVertical + countHorizontal;

		var verticalGuidesToAdd = Array();
		var horizontalGuidesToAdd = Array();


		for(var i = 0; i < countVertical;i++){
			var guideX = vertical_guides.guideAtIndex(i);
			if((guideX < layer.frame.x) || (guideX > (layer.frame.x + layer.frame.width))){
				// the guide is outside my box I will add it later
				verticalGuidesToAdd.push(guideX);
			}
		}

		for(var i = 0; i < countHorizontal;i++){
			var guideY = horizontal_guides.guideAtIndex(i);
			if((guideY < layer.frame.y) || (guideY > (layer.frame.y + layer.frame.height))){
				// the guide is outside my box I will add it later
				horizontalGuidesToAdd.push(guideY);
			}
		}

		// remove all the guides

		while(countVertical > 0){
		 	vertical_guides.removeGuideAtIndex(0);
		 	countVertical = vertical_guides.numberOfGuides();
		}

		while(countHorizontal > 0){
			horizontal_guides.removeGuideAtIndex(0);
			countHorizontal = horizontal_guides.numberOfGuides();
		}

		// re-add the outer guides

		for(var i = 0; i < verticalGuidesToAdd.length;i++){
			vertical_guides.addGuideWithValue(verticalGuidesToAdd[i]);
		}

		for(var i = 0; i < horizontalGuidesToAdd.length;i++){
			horizontal_guides.addGuideWithValue(horizontalGuidesToAdd[i]);
		}

	}

}