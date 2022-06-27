var MSes = 0;
var TCalc;
var MaxNum;
var MOArr = [];
var operators = document.getElementsByClassName('operators');

document.getElementById('BStop').classList.add('off');
document.getElementById('BCheck').classList.add('off');

let BStartActivation = () => {
  MaxNum = document.getElementById('MaxNum').value;
  if(MOArr.length && MaxNum > 9 && MSes === 0){
    document.getElementById('BStart').classList.remove('off');
  }
  else if(!MOArr.length || MaxNum < 10){
    document.getElementById('BStart').classList.add('off');
  }
};
BStartActivation();


var MaxNumChange = document.getElementById('MaxNum');
MaxNumChange.addEventListener('keyup',() =>{
  BStartActivation();
});
MaxNumChange.addEventListener('blur',() =>{
  if(MaxNum < 10){
    MaxNum = 10;
    document.getElementById('MaxNum').value = MaxNum;
  }
  else if(MaxNum > 9999){
    MaxNum = 9999;
    document.getElementById('MaxNum').value = MaxNum;    
  };
  BStartActivation();
});


for(let operator of operators){
  operator.addEventListener('click',() =>{
    if(!MOArr.includes(operator.dataset.value) && MSes !== 1){
      MOArr.push(operator.dataset.value);
      operator.classList.add('on');
    }
    else if(MOArr.includes(operator.dataset.value) && MSes !== 1){
      MOArr = MOArr.filter(function(e) {
        return e !== operator.dataset.value;
      });
      operator.classList.remove('on');
    };
    BStartActivation();
  });
};

let Timer = () => {
  let TNow = new Date().getTime();
  TCalc = setInterval(function(){
    let TUpd = new Date().getTime();
    let TDif = TUpd - TNow;

    let hrs = Math.floor((TDif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let min = Math.floor((TDif % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.floor((TDif % (1000 * 60)) / 1000);

    if(hrs.toString().length === 1){
      hrs = '0'+hrs;
    };
    if(min.toString().length === 1){
      min = '0'+min;
    };
    if(sec.toString().length === 1){
      sec = '0'+sec;
    };
    var TNew = hrs+':'+min+':'+sec;
    document.getElementById('time').innerHTML = TNew;
  },1000);
};

let TStop = () => {
  clearInterval(TCalc);
  MSes = 0;
  document.getElementById('BStart').classList.remove('off');
  document.getElementById('BStop').classList.add('off');
  document.getElementById('BCheck').classList.add('off');
  document.getElementById('operandA').value = '';
  document.getElementById('operandB').value = '';
  document.getElementById('operator').value = '';
  document.getElementById('MaxNum').readOnly = false;
};

let TStart = () => {
  document.getElementById('answer').select();
  //Math.floor(Math.random()*(MAX_NUMBER-MIN_NUMBER+1))+MIN_NUMBER
  MaxNum = Number(document.getElementById('MaxNum').value);

  if(MSes === 0){
    document.getElementById('time').innerHTML = '00:00:00';
    document.getElementById('RETot').innerHTML = '0';
    document.getElementById('RECor').innerHTML = '0';
    document.getElementById('REInc').innerHTML = '0';
    document.getElementById('answer').value = '';
  };

  if(MOArr.length && MaxNum > 9){
    document.getElementById('MaxNum').readOnly = true;
    let MOperator = MOArr[Math.floor(Math.random()*MOArr.length)];

    document.getElementById('BStart').classList.add('off');
    document.getElementById('BStop').classList.remove('off');
    document.getElementById('BCheck').classList.remove('off');

    let MOperandA;
    let MOperandB;

    MOpA = () => {
      do{
        MOperandA = Math.floor(Math.random()*(MaxNum + 1));
      }
      while (MOperandA === 0);
    };

    MOpB = () => {
      do{
        MOperandB = Math.floor(Math.random()*(MaxNum + 1));
      }
      while (MOperandB === 0);
    };

    Madd = () => {
			do{
        MOpA();
  		  MOperandB = Math.floor(Math.random()*((MaxNum + 1) - MOperandA));
      }
      while (MOperandB == 0);
    };

    Msub = () => {
      do{
        MOpA();
        MOperandB = Math.floor(Math.random()*(MOperandA + 1));
      }
      while (MOperandB == 0 || MOperandA == MOperandB) 
    };

    Mmul = () => {
      do{
        MOpA();
        MOpB();
      }
      while (MOperandA * MOperandB >= MaxNum + 1 || MOperandA == 1 || MOperandB == 1);
    };

    Mdiv = () => {
      do{
        MOpA();
        MOpB();
      }
      while (MOperandA % MOperandB != 0 || MOperandA == MOperandB || MOperandA == 1 || MOperandB == 1);
    };

    if     (MOperator === '+') {Madd()}
    else if(MOperator === '-') {Msub()}
    else if(MOperator === '*') {Mmul()}
    else if(MOperator === '/') {Mdiv()};

    document.getElementById('operandA').value = MOperandA;
    document.getElementById('operator').value = MOperator;
    document.getElementById('operandB').value = MOperandB;
    document.getElementById('answer').value = '';

    if(MSes !== 1){
      Timer();
      MSes = 1;
    };
  };
};

/* task: check */
let TCheck = () => {
  if(MOArr.length && MSes === 1){
    let MOperandA = document.getElementById('operandA').value;
    let MOperator = document.getElementById('operator').value;
    let MOperandB = document.getElementById('operandB').value;
    let MAnswer   = document.getElementById('answer').value;
    let tmpMAnswer;

    Madd = () => {
      tmpMAnswer = Number(MOperandA) + Number(MOperandB);
    };
    Msub = () => {
      tmpMAnswer = Number(MOperandA) - Number(MOperandB);
    };
    Mmul = () => {
      tmpMAnswer = Number(MOperandA) * Number(MOperandB);
    };
    Mdiv = () => {
      tmpMAnswer = Number(MOperandA) / Number(MOperandB);
    };

    if     (MOperator === '+') {Madd()}
    else if(MOperator === '-') {Msub()}
    else if(MOperator === '*') {Mmul()}
    else if(MOperator === '/') {Mdiv()};

    let RETot = document.getElementById('RETot').textContent;
    let RECor = document.getElementById('RECor').textContent;
    let REInc = document.getElementById('REInc').textContent;
  
    if(tmpMAnswer == MAnswer){
		  RECor++;
	  }else{
      REInc++;
	  };
    RETot++;

    document.getElementById('RETot').innerHTML = RETot;
    document.getElementById('RECor').innerHTML = RECor;
    document.getElementById('REInc').innerHTML = REInc;
  };
};

/* controls */
var BStop = document.getElementById('BStop');
var BStart = document.getElementById('BStart');
var BCheck = document.getElementById('BCheck');

var controls = document.getElementById('controls').getElementsByClassName('item');

for(let control of controls){
  control.addEventListener('touchstart', () =>{
    control.classList.add('touch');
  });

  control.addEventListener('touchend', () =>{
    control.classList.remove('touch');
  });
};

BStop.addEventListener('click',() =>{
  if(MSes === 1){
    TStop();
  };
});

BStart.addEventListener('click',() =>{
  if(MSes === 0 && MOArr.length){
    TStart();
  };
});

BCheck.addEventListener('click',() =>{
  if(MSes === 1){
    TCheck();
    TStart();
  };
});

document.getElementById('answer').addEventListener('keyup', function(e) {
  let KeyCode = e.code.toLowerCase();
  if(KeyCode === 'enter'){
    TCheck();
    TStart();
    e.preventDefault();
  }
});

/* menu */
var buttons = document.getElementById('buttons').getElementsByClassName('item');
var blocks = document.getElementById('app').getElementsByClassName('block');

for(let button of buttons){
  button.addEventListener('click',() =>{

    if(!button.classList.contains('on')){
      Array.from(buttons).forEach((btn) => btn.classList.remove('on'));
      button.classList.add('on');

      Array.from(blocks).forEach((blk) => blk.classList.remove('on'));
      document.getElementById(button.dataset.block).classList.add('on');
    };

  });
};