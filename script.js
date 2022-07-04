'use strict';
let ses = 0, arr = [];

let rTxt,rTot,rCor,rInc;
rTxt = document.getElementsByClassName('rTxt');
rTot = document.getElementById('rTot');
rCor = document.getElementById('rCor');
rInc = document.getElementById('rInc');

let max,Anum,Oper,Bnum,Answ;
max = document.getElementById('MaxNum');
Anum = document.getElementById('Anum');
Oper = document.getElementById('Oper');
Bnum = document.getElementById('Bnum');
Answ = document.getElementById('Answ');

let BStop,BStart,BCheck;
BStop = document.getElementById('BStop');
BStart = document.getElementById('BStart');
BCheck = document.getElementById('BCheck');

let TActivate = () => {
  if(arr.length && max.value > 9 && max.value < 10000 && ses === 0){
    BStart.classList.remove('off');
  }
  else if(!arr.length || max.value < 10 || max.value > 9999){
    BStart.classList.add('off');
  }
};

max.addEventListener('input',() =>{
  TActivate();
});

/* operators */
let operators = document.getElementsByClassName('operators');
for(let operator of operators){
  operator.addEventListener('click',() =>{
    if(!arr.includes(operator.dataset.value) && ses !== 1){
      arr.push(operator.dataset.value);
      operator.classList.add('on');
    }
    else if(arr.includes(operator.dataset.value) && ses !== 1){
      arr = arr.filter(function(e) {
        return e !== operator.dataset.value;
      });
      operator.classList.remove('on');
    };
    TActivate();
  });
};

/* timer */
let Tint,Time;
Time = document.getElementById('time');

let Timer = () => {
  let TNow,TUpd,TDif,TNew,hrs,min,sec;
  TNow = new Date().getTime();
  Tint = setInterval(function(){
    TUpd = new Date().getTime();
    TDif = TUpd - TNow;

    hrs = Math.floor((TDif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    min = Math.floor((TDif % (1000 * 60 * 60)) / (1000 * 60));
    sec = Math.floor((TDif % (1000 * 60)) / 1000);

    if(hrs.toString().length === 1){
      hrs = '0'+hrs;
    };
    if(min.toString().length === 1){
      min = '0'+min;
    };
    if(sec.toString().length === 1){
      sec = '0'+sec;
    };
    TNew = hrs+':'+min+':'+sec;
    Time.innerHTML = TNew;
  },1000);
};

/* task: stop */
let TStop = () => {
  clearInterval(Tint);
  ses = 0;
  BStart.classList.remove('off');
  BStop.classList.add('off');
  BCheck.classList.add('off');

  Anum.value = '';
  Bnum.value = '';
  Oper.value = '';
  max.readOnly = false;
};

/* task: start */
let TStart = () => {
  Answ.select();

  if(ses === 0){
    Time.innerHTML = '00:00:00';
    Answ.value = '';

    for(let el of rTxt){ 
      el.innerHTML = '0';
    }; 
  };

  if(arr.length && max.value > 9 && max.value < 10000){
    max.readOnly = true;
    let MOperator = arr[Math.floor(Math.random()*arr.length)];

    BStart.classList.add('off');
    BStop.classList.remove('off');
    BCheck.classList.remove('off');

    let MOperandA,MOperandB,Madd,Msub,Mmul,Mdiv;

    Madd = () => {
      do{
        MOperandA = Math.floor(Math.random()*(Number(max.value) + 1));
  	MOperandB = Math.floor(Math.random()*((Number(max.value) + 1) - MOperandA));
      }
      while (MOperandA === 0 || MOperandB === 0);
    };

    Msub = () => {
      do{
        MOperandA = Math.floor(Math.random()*(Number(max.value) + 1));
        MOperandB = Math.floor(Math.random()*(MOperandA + 1));
      }
      while (MOperandA === 0 || MOperandB === 0 || MOperandA === MOperandB) 
    };

    Mmul = () => {
      do{
        MOperandA = Math.floor(Math.random()*(Number(max.value) + 1));
        MOperandB = Math.floor(Math.random()*(Number(max.value) + 1));
      }
      while (MOperandA * MOperandB >= Number(max.value) + 1 || MOperandA === 1 || MOperandB === 1 || MOperandA === 0 || MOperandB === 0);
    };

    Mdiv = () => {
      do{
        MOperandA = Math.floor(Math.random()*(Number(max.value) + 1));
        MOperandB = Math.floor(Math.random()*(Number(max.value) + 1));
      }
      while (MOperandA % MOperandB !== 0 || MOperandA === MOperandB || MOperandA === 1 || MOperandB === 1 || MOperandA === 0 || MOperandB === 0);
    };
    
    switch (MOperator){
      case '+': Madd();break;
      case '-': Msub();break;
      case '*': Mmul();break;
      case '/': Mdiv();break;
    };

    Anum.value = MOperandA;
    Oper.value = MOperator;
    Bnum.value = MOperandB;
    Answ.value = '';

    if(ses !== 1){
      Timer();
      ses = 1;
    };
  };
};

/* task: check */
let TCheck = () => {
  if(arr.length && ses === 1){
    let Check;
    function Calc(o,a,b){
      switch (o){
        case '+': return a + b
        case '-': return a - b
        case '*': return a * b
        case '/': return a / b
      }
    };
    Check = Calc(Oper.value,Number(Anum.value),Number(Bnum.value));
 
    if(Answ.value == Check){
      rCor.textContent++}
    else{
      rInc.textContent++};
    rTot.textContent++;

    rTot.innerHTML = rTot.textContent;
    rCor.innerHTML = rCor.textContent;
    rInc.innerHTML = rInc.textContent;
  };
};

/* controls */
let controls = document.getElementById('controls').getElementsByClassName('item');

for(let control of controls){
  control.addEventListener('touchstart', () =>{
    control.classList.add('touch');
  });

  control.addEventListener('touchend', () =>{
    control.classList.remove('touch');
  });
};

BStop.addEventListener('click',() =>{
  if(ses === 1){
    TStop();
  };
});

BStart.addEventListener('click',() =>{
  if(ses === 0 && arr.length){
    TStart();
  };
});

BCheck.addEventListener('click',() =>{
  if(ses === 1){
    TCheck();
    TStart();
  };
});

Answ.addEventListener('keyup', function(e) {
  let KeyCode = e.code.toLowerCase();
  if(KeyCode === 'enter'){
    TCheck();
    TStart();
    e.preventDefault();
  }
});
