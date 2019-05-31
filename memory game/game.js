//variables
const noOfBoxGame;
const boxIndexes = [];
const noOfClick = 0;
const clickCounter = 0;
const correctGuess = 0;
const clickImages = [];
const timeOutRestore = 1000;
const pathToImage = ./images/;

$(function(){
	//render the game
	$("#btnStart").on("click", function(){
		game.renderGameLayout();
	});
});

game={
  image:{
    name:"pavadinimas",
    type:"png"
  }
  const a = document.getElementById("difficulity");
  alert(a.options[a.selectedIndex].value);
initData: function()
{
    if(a==3)
    {
      noOfBoxGame = 9;
    }
    else if (a==4)
    {
      noOfBoxGame=16;
    }
    else if(a==5)
    {
      noOfBoxGame=25;
    }
    else
    {
      noOfBoxGame=30;
    }
    for(var x=0;x<=1;x++){for(var i=0; i<= (noOfBoxGame/2)-1;i++){boxIndexes.push(i);}}
    		this.shuffleArray(boxIndexes);
},
}
