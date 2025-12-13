const garbleText = (text) => {
    let inputNumber = text.length
    let output = ''; // Empty target output, dont change
    let gagSoundList = [
	"I love serving my Owners!",
	"I exist to serve!",
	"I exist to please!",
	"Tease me!",
	"Mmmghhh~ more please~",
	"Mmmmmhmmm~ <3",
	"Please, dont stop~",
	"I love Meowstress Enraa!",
	"I love being bound!",
	"I need to live in a kinky dungeon cell!",
	"Please, tie me up!",
	"Spank me!",
	"Tie me!",
	"Gag me more!",
	"Use me as you wish!",
	"Make me kneel!",
	"Bend me over!",
	"Let me serve!",
	"More orders please~",
	"Make me submit~",
	"I am a good sub!",
	"Your pleasure is my passion", 
	"Service is bliss",
	"Service, is it's own reward~",
	"Thank you for taking care of me",
	"Owner is my everything",
	"Please, snuggle me tight~",
	"Your wish, is my command!",
	"I have no thoughts, I wish only to serve",
	"My Owner is my passion",
	"Please, punish me~",
	"Seal me away",
	"Doll me up",
	"My place is crawling at the heel of others",
	"Restrain me in my place~",
	"Wipe my mind with pleasure and pain!",
	"Change me to your liking",
	"Thank you for showing this Sub its place",
	"Chain me down"] //Replacement lines
	
	while (inputNumber > 0){
		inputNumber -= Math.floor(Math.random*10 + 21) 
		// replacer function to output, removing $[input[i]} removes the original word
		output = `${output}${gagSoundList[Math.floor(Math.random() * gagSoundList.length)]} \n` 
    }
    output = `${output}I serve.` //Final addition to output at the end, any text 
    return output //Return
}

exports.garbleText = garbleText;
exports.choicename = "Good Sub Gag"