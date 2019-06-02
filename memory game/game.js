//variables
var noOfBoxGame;
var boxIndexes = [];
var noOfClick = 0;
var clicksLeft=0;
var clickCounter = 0;
var correctGuess = 0;
var clickImages = [];
var timeOutRestore = 1000;
const pathToImage = `./images/`;
const images=[
  {
  name:"2",
  type:"png"
  },
  {
    name:"3",
    type:"png"
  },
  { name:"4",
  type:"png"
  },
  {
  name:"5",
  type:"png"
  },
  {
    name:"6",
    type:"png"
  },
  {
    name:"7",
    type:"png"
  },
  {
    name:"8",
    type:"png"
  },
  {
    name:"9",
    type:"png"
  },
  {
    name:"10",
    type:"png"
  },
  {
    name:"11",
    type:"png"
  },
  {
    name:"12",
    type:"jfif"
  },
  {
    name:"13",
    type:"png"
  },
  {
    name:"14",
    type:"png"
  },
  {
    name:"15",
    type:"png"
  },
  {
    name:"16",
    type:"png"
  },
  {
    name:"back",
    type:"png"
  }
];
//load
$(function(){
	//render the game
	$("#btnStart").on("click", function(){
		game.renderGameLayout();
	});
  //clear the board
  $("#btnRestart").on("click", function(){
    $("#game-content").html("");
    $("#game-message").hide();
    $("#canvas-game, #game-statistic").show();
  });
  //same thing
  $("#tryAgain").on("click", function(){
    $("#game-content").html("");
    $("#game-message1").hide();
    $("#canvas-game, #game-statistic").show();
  });
});

game={


initData: function()
{
  //Getting requirements to build up the game
  var a = document.getElementById("size");
  var size = a.options[a.selectedIndex].value;
   a  = document.getElementById("difficulity");
  var difficulity = a.options[a.selectedIndex].value;
  if(size==3)
  {
    switch(difficulity)
    {
    case '1':
    {
      clicksLeft = 50;
      break;
    }
    case '2':
    {
      clicksLeft = 35;
      break;
    }
    case '3':
    {
      clicksLeft = 20;
      break;
    }
  }
  $("#canvas-game").css({"width":"222px","height":"512px"});
  noOfBoxGame = 10;
}
  else if (size==4)
  {
    switch(difficulity)
    {
    case '1':
    {
      clicksLeft = 50;
      break;
    }
    case '2':
    {
      clicksLeft = 40;
      break;
    }
    case '3':
    {
      clicksLeft = 30;
      break;
    }
  }
  $("#canvas-game").css({"width":"297px","height":"512px"});
  noOfBoxGame=16;
}

  else if(size==5)
  {
    switch(difficulity)
    {
    case '1':
    {
      clicksLeft = 100;
      break;
    }
    case '2':
    {
      clicksLeft = 70;
      break;
    }
    case '3':
    {
      clicksLeft = 60;
      break;
    }
}
$("#canvas-game").css({"width":"372px","height":"762px"});
noOfBoxGame=26;
}

  $("#no-of-clicksLeft").html(clicksLeft);
  // two loops one loop is to fill in x numbers (starting from 0) and a copy of the duplicated x numbers.
    for(var x=0;x<=1;x++){for(var i=0; i<= (noOfBoxGame/2)-1;i++){boxIndexes.push(i);}}
    		this.shuffleArray(boxIndexes);
},
//function to shuffle array
	shuffleArray: function(array){
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	},
  buildGameBox: function(){
		var boxes = "";
		var boxCover = "";

		//load the images and image cover
		for(var i = 1; i <=noOfBoxGame; i++){
			boxes += `<div id='box-${i}' class='box-picture'><img src='${pathToImage}${images[boxIndexes[i-1]+1].name}.${images[boxIndexes[i-1]+1].type}'/></div>`;
			boxCover += `<div id='box-cover-${i}' class='box-cover' data-id='${pathToImage}${images[boxIndexes[i-1] + 1].name}.${images[boxIndexes[i-1] + 1].type}'></div>`;
		}
		boxCover = `<div class='box-cover-wrapper'>${boxCover}</div>`;
		$("#game-content").html(boxes + boxCover);
		$(".box-picture").show();
		//add event to click the box cover image
		$(".box-cover").off("click");
		$(".box-cover").on("click", function(){
			if(noOfClick <= 1){
        $("#no-of-clicksLeft").html(clicksLeft--);
        noOfClick++;
				$(this).addClass('animated flipOutY');
				var clickCover = {
					ImageID: $(this).attr("data-id"),
					CoverID: $(this).attr("id").replace("box-cover-","")
				}
				clickImages.push(clickCover);
        if(noOfClick >= 2){
      					//check if the revealed images are correct
      					if(clickImages[0].ImageID == clickImages[1].ImageID && clickImages[0].CoverID !== clickImages[1].CoverID){
      						correctGuess++;
      						$("#correct-guess").html(correctGuess);

      						//reset the variables
      						noOfClick = 0;
      						clickImages = [];


                  if(clicksLeft <= 0)
                  {
                    $("#canvas-game, #game-statistic").fadeOut(1000);
                    $("#game-message1").addClass('animated fadeIn').css('animation-delay', '1s').show();
                    correctGuess = 0;
                    $("#correct-guess").html(correctGuess);
                    clickCounter = 0;
                    $("#no-of-clicks").html(clickCounter);
                    boxIndexes=[];
                  }
                  //if the game is completed then perform a reset
      						if(correctGuess >= (noOfBoxGame/2)){
      							$("#canvas-game, #game-statistic").fadeOut(1000);
      							$("#game-message").addClass('animated fadeIn').css('animation-delay', '1s').show();
      							correctGuess = 0;
      							$("#correct-guess").html(correctGuess);
      							clickCounter = 0;
      							$("#no-of-clicks").html(clickCounter);
                    boxIndexes=[];
      						}
      					}else{
      						//if not the same then close the image cover again.
      						setTimeout(function(){
      							clickImages.forEach(function(item, index){
      								$("#box-cover-" + item.CoverID).removeClass("flipOutY").addClass('animated flipInY');
      							});
      							//reset
      							noOfClick = 0;
      							clickImages = [];
      						}, timeOutRestore);
      					}


      				}
      			}
      		});
      	},

      	//function to call main functions to render the game
      	renderGameLayout: function(){
      		$("#game-message").hide();
      		$("#canvas-game, #game-statistic").show();
      		this.initData();
      		this.buildGameBox();
      	}
      }
