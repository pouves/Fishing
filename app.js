//Place the game structure here
//format is <LABEL> : [QUESTION, HP, A, B, C]
//where HP, B, and C are all optional
//For the A/B/C, list is [<the text of the choice>, <goto location>]
var json_data = '{' +
  '"START": {' +
  '  "QUESTION": "Where would you like to go fishing?",' +
  '  "A": ["Up: Ocean", "OCEAN"],' +
  '  "B": ["Select: River", "RIVER"],' +
  '  "C": ["Down: Lake", "LAKE"]' +
  '},' +
    
  '"OCEAN": {' +
  '  "QUESTION": "You are on a boat out on the ocean. Just drop your line to cast it in the water!",' +
  '  "X": ["", "TIME_OCEAN"],' +
  '  "Y": ["", "TIME_OCEAN"],' +
  '  "Z": ["", "TIME_OCEAN"]' +
  '},' +
  ' "RIVER": {' +
  '  "QUESTION": "You are wading out in a mountain stream. Use a fly fishing motion to cast your line!",' +
  '  "X": ["", "TIME_RIVER"]' +
  '},' +
  ' "LAKE": {' +
  '  "QUESTION": "You are standing on the dock of a secluded lake. Cast your line far out into the water!",' +
  '  "X": ["", "TIME_LAKE"],' +
  '  "Z": ["", "TIME_LAKE"]' +
  '},' +    
    
  '"TIME_OCEAN": {' +
  '  "QUESTION": "Your line is in the water. Hang out and enjoy the salty breeze!",' +
  '  "A": ["Pull up quick when you feel the vibration of a fish at your hook", "START"]' +
  '},' +
  '"TIME_RIVER": {' +
  '  "QUESTION": "Your line is in the water. Hang out and enjoy the gentle stream!",' +
  '  "A": ["Pull up quick when you feel the vibration of a fish at your hook", "START"]' +
  '},' +
  '"TIME_LAKE": {' +
  '  "QUESTION": "Your line is in the water. Hang out and enjoy a cold drink!",' +
  '  "A": ["Pull up quick when you feel the vibration of a fish at your hook", "START"]' +
  '},' +  
    
  '"PULL_OCEAN": {' +
  '  "QUESTION": "",' +
  '  "Y": ["", "CONFIRM_OCEAN"]' +
  '},' +
  '"PULL_RIVER": {' +
  '  "QUESTION": "",' +
  '  "Y": ["", "CONFIRM_RIVER"]' +
  '},' +
  '"PULL_LAKE": {' +
  '  "QUESTION": "",' +
  '  "Y": ["", "CONFIRM_LAKE"]' +
  '},' +  
  
  '"PULL_OCEAN_LATE": {' +
  '  "QUESTION": "",' +
  '  "Y": ["", "OCEAN_LATE"],' +
  '  "B": ["", "REEL_OCEAN"]' +
  '},' +
  '"PULL_RIVER_LATE": {' +
  '  "QUESTION": "",' +
  '  "Y": ["", "RIVER_LATE"],' +
  '  "B": ["", "REEL_RIVER"]' +
  '},' +
  '"PULL_LAKE_LATE": {' +
  '  "QUESTION": "",' +
  '  "Y": ["", "LAKE_LATE"],' +
  '  "B": ["", "REEL_LAKE"]' +
  '},' +
  
  '"OCEAN_LATE": {' +
  '  "QUESTION": "Too slow. The fish swam away.",' +
  '  "B": ["Select: Cast again.", "OCEAN"]' +
  '},' +
  '"RIVER_LATE": {' +
  '  "QUESTION": "Too slow. The fish swam away.",' +
  '  "B": ["Select: Cast again.", "RIVER"]' +
  '},' +
  '"LAKE_LATE": {' +
  '  "QUESTION": "Too slow. The fish swam away.",' +
  '  "B": ["Select: Cast again.", "LAKE"]' +
  '},' +
    
  '"CONFIRM_OCEAN": {' +
  '  "QUESTION": "Awesome! You caught the fish!",' +
  '  "B": ["Select: OK!", "REEL_OCEAN"]' +
  '},' +
  '"CONFIRM_RIVER": {' +
  '  "QUESTION": "Awesome! You caught the fish!",' +
  '  "B": ["Select: OK!", "REEL_RIVER"]' +
  '},' +
  '"CONFIRM_LAKE": {' +
  '  "QUESTION": "Awesome! You caught the fish!",' +
  '  "B": ["Select: OK!", "REEL_LAKE"]' +
  '},' +  
    
  '"REEL_OCEAN": {' +
  '  "QUESTION": "Now reel it in!",' +
  '  "X": ["", "FISH_OCEAN"]' +
  '},' +
  '"REEL_RIVER": {' +
  '  "QUESTION": "Now reel it in!",' +
  '  "X": ["", "FISH_RIVER"]' +
  '},' +
  '"REEL_LAKE": {' +
  '  "QUESTION": "Now reel it in!",' +
  '  "X": ["", "FISH_LAKE"]' +
  '},' + 
    
  '"FISH_OCEAN": {' +
  '  "QUESTION": "Congratulations! You caught a tuna!",' +
  '  "A": ["Up: Choose a new venue", "START"],' +
  '  "C": ["Down: Stay at the ocean", "OCEAN"]' +
  '},' +
  '"FISH_RIVER": {' +
  '  "QUESTION": "Congratulations! You caught a trout!",' +
  '  "A": ["Up: Choose a new venue", "START"],' +
  '  "C": ["Down: Stay at the river", "RIVER"]' +
  '},' +
  '"FISH_LAKE": {' +
  '  "QUESTION": "Congratulations! You caught a bass!",' +
  '  "A": ["Up: Choose a new venue", "START"],' +
  '  "C": ["Down: Stay at the lake", "LAKE"]' +
  '}' +
  '}';

//Load the data as a json object
var json = JSON.parse(json_data);

var hp = 100;
var position = null;//json.START;

//Pebble app configuration
simply.fullscreen(true);
simply.style('small'); //use smallest text

//Setup pebble button callbacks
simply.on('singleClick', function(e) {
  var button_map = {
    "up": "A", 
    "select": "B",
    "down": "C"
  };
  question(button_map[e.button]);   
});

//Setup accel data
simply.on('accelTap', function(e) {
	var accel_map = {
    "x": "X",
    "y": "Y",
    "z": "Z"
	};
	question(accel_map[e.axis]);
});

//Setup timer data (in miliseconds)
function timer1(){
  position = json.PULL_OCEAN;
  simply.vibe('double');
  simply.title('PULL UP!');
}
function timer2(){
  position = json.PULL_RIVER;
  simply.vibe('double'); 
  simply.title('PULL UP!');
}
function timer3(){
  position = json.PULL_LAKE;
  simply.vibe('double');
  simply.title('PULL UP!');
}

var randomNumber = Math.random() * 10000;


function randomTimer(){
  if (position === json.TIME_OCEAN) {
   setTimeout(timer1, randomNumber + 1000);
  }
  else if (position === json.TIME_RIVER) {
    setTimeout(timer2, randomNumber + 1000);
  }
  else if (position === json.TIME_LAKE) {
    setTimeout(timer3, randomNumber + 1000);
    }
  }

function timer4() {
  position = json.PULL_OCEAN_LATE;
}
function timer5() {
  position = json.PULL_RIVER_LATE;
}
function timer6() {
  position = json.PULL_LAKE_LATE;
}

function setTimer(){
  if (position === json.TIME_OCEAN) {
   setTimeout(timer4, randomNumber + 3000);
  }
  else if (position === json.TIME_RIVER) {
    setTimeout(timer5, randomNumber + 3000);
  }
  else if (position === json.TIME_LAKE) {
    setTimeout(timer6, randomNumber + 3000);
    }
  }

//Set the initial display for the game (Game Instructions)
simply.title("GONE FISHING\n\n");
simply.subtitle("Let's go fishing!\n" + 
  "Gestures control actions.\n" +
  "Press any button to start.");
simply.body('');
console.log('Fishing demo!'); //displayed on `pebble logs` for debugging

//Display the Correct or Wrong messages depending on the choice
//And display the new score
function question(choice) {
  //if position isn't set, goto START
  if(position === null) {
    position = json.START;
  } else {
    //catch unsupported option for the current screen
    if (position[choice] === undefined) {
      return;
    }
    
    //Handle the special cases
    //If character health is <=0 goto death screen
    if (hp <= 0) { //Note: bug? comparison with 0 showed up as error on cloud pebble
      position = json.DEAD;
      hp = 100;//reset for next game
    } else {
      //need to reset hp for WIN also, but still obey transition to next position
      if (position === json.WIN) {
        hp = 100;//reset for next game
      }
      position = json[position[choice][1]];
    }
  }
  
  if (position === json.TIME_OCEAN || position === json.TIME_RIVER || position === json.TIME_LAKE || position === json.FISH_OCEAN || position === json.FISH_RIVER || position === json.FISH_LAKE) {
   simply.vibe('long');
  }
  
  //If the location effected hp, modify characters hp here
  if (position.HP !== undefined) {
    hp += position.HP;
  }
  
  simply.title('');
  simply.subtitle(position.QUESTION + "\n\n" + 
    ((position.A !== undefined) ? ("" + position.A[0]): '') + "\n" +
    ((position.B !== undefined) ? ("" + position.B[0]): '') + "\n" +
    ((position.C !== undefined) ? ("" + position.C[0]): '') + "\n" +
    ((position.X !== undefined) ? ("" + position.X[0]): '') + "\n" +
    ((position.Y !== undefined) ? ("" + position.Y[0]): '') + "\n" +
    ((position.Z !== undefined) ? ("" + position.Z[0]): '')
  );
  simply.body('');
  
  console.log("answer:" + choice);  //displayed on `pebble logs` for debugging
  
  randomTimer();
  setTimer();
}
