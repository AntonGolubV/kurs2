let url = 'http://api.weatherapi.com/v1/forecast.json?key=95f9d0b273ad4ed2be0163144230803&q=Minsk&days=5&aqi=no&alerts=no';
let header = document.querySelector('.header'); 
let buttonLog = document.querySelector('.btn-warning');
let buttonUser = document.createElement('button');

let selectCity  = document.querySelector('[name=City]');
let inputNumber = document.querySelector('.inputNumber');
let centerMain = document.querySelector('.centerMain');
let showButton = document.querySelector('.btn-primary');
let showWeather = document.querySelector('.showWeather');
let nameCity;

function createBlock(value, classL, inBlock, innerText = ''){
    value.classList.add(`${classL}`);
    value.innerText = `${innerText}`;  
    inBlock.append(value);
}
function createArrBlock(value, classL, inBlock, innerText = ''){
let el = document.createElement(`${value}`);
el.classList.add(`${classL}`);
el.innerText = `${innerText}`;  
inBlock.append(el);
}
function createImg(classImg, link, inblock){
let img = document.createElement('img');
img.classList.add(`${classImg}`);
img.src = 'https:' + link;  
inblock.append(img);
}
function createH2(val, innerText, inBlock){
    let el = document.createElement(`${val}`);
    el.innerText = `${innerText}`;
    inBlock.append(el);
}
function createOption(val, innerText, inBlock){
    let el = document.createElement(`${val}`);
    el.value = `${innerText}`;
    el.innerText = `${el.value}`;
    inBlock.append(el);
}
function createInput(value, typeI, inblock, classI = '', placeholderI = ''){
    value.type = `${typeI}`;
    value.placeholder = `${placeholderI}`;
    value.classList.add(`${classI}`);
    inblock.append(value);
}

function deleteEl(){
    for(let item  in arguments){
    arguments[item].remove();
    }
}

let inputName = document.createElement('input');
let inputPassword = document.createElement('input');
let buttonReg = document.createElement('button');
let board = document.createElement('div');
let boardUser = document.createElement('div');

buttonLog.addEventListener('click', function(){
    createBlock(board, 'board', document.body);
    board.style.left = `${document.documentElement.clientWidth/2-250}px`;
    board.style.top = `${document.documentElement.clientHeight/2-150}px`;
    createH2('h2', 'Имя пользователя', board);
    createInput(inputName, 'text', board, 'input', 'person');
    createH2('h2', 'Пароль', board);
    createInput(inputPassword, 'password', board, 'input');

    let footerBoard = document.createElement('div');
    createBlock(footerBoard, 'footerBoard', board);
    createBlock(buttonReg, 'buttonReg', footerBoard, 'Дальше');
});

buttonReg.addEventListener('click', function(){
    if((inputName.value.length <= 3) && (inputPassword.value.length >= 8)){
        alert('ошибка: неправильное имя');
    }
    if((inputName.value.length > 3) && (inputPassword.value.length < 8)){
        alert('ошибка: слишком короткий пароль');
    }
    if((inputName.value.length > 3) && (inputPassword.value.length >= 8)){
        localStorage.setItem('name', inputName.value);
        localStorage.setItem('password', inputPassword.value);
            deleteEl(board, buttonReg, inputName, buttonLog); 
            createBlock(buttonUser, 'btn', document.body, 'Пользователь')
            buttonUser.classList.add('btn-warning');
            buttonUser.classList.add('log');
    }
});

let headerUser = document.createElement('div') ;
let mainUser = document.createElement('div');
let headerCard = document.createElement('div');
let selectArr;
let userSelect;
let buttonDel = document.createElement('button');
let footerUser = document.createElement('div');
let inputChangeName = document.createElement('input');
let inputChangePassword = document.createElement('input');

 buttonUser.addEventListener('click', function(){
    createBlock(boardUser, 'boardUser', document.body);
    boardUser.style.left = `${document.documentElement.clientWidth/2-400}px`;
    boardUser.style.top = `${document.documentElement.clientHeight/2-300}px`;
    createBlock(headerUser, 'headerUser', boardUser, 'Параметры');
    createBlock(mainUser,'mainUser', boardUser);

    for(let i = 0; i <= 3; i++){
        createArrBlock('div', 'mainUserDiv' , mainUser);
    }
    let mainUserDivArr = document.querySelectorAll('.mainUserDiv');
    for(let c = 0; c <= mainUserDivArr.length; c++){
        userSelect = document.createElement('select');
            if(c == 0){
                createArrBlock('div', 'divText', mainUserDivArr[0], 'Фон');
                createBlock(userSelect, 'select', mainUserDivArr[0]);
            }
            if(c == 1){
                createArrBlock('div', 'divText', mainUserDivArr[1], 'Шрифт');
                createBlock(userSelect, 'select', mainUserDivArr[1]);
            }
            if(c == 2){
                createArrBlock('div', 'divText', mainUserDivArr[2], 'Изменить имя:');
                createInput(inputChangeName, 'text', mainUserDivArr[2], 'inputChangeName', `${localStorage.getItem('name')}`);
            }
            if(c == 3){
                createArrBlock('div', 'divText', mainUserDivArr[3], 'Изменить пароль:');
                createInput(inputChangePassword, 'password', mainUserDivArr[3], 'inputChangeName', `${localStorage.getItem('password')}`);
            }
    }
        selectArr = document.querySelectorAll('.select');
        for(let c = 0; c <= selectArr.length; c++){  
            if(c == 0){
                createOption('option', 'День',  selectArr[0]);
                createOption('option', 'Ночь',  selectArr[0]);
            } 
            if(c == 1){
                createOption('option', 'Русский',  selectArr[1]);
                createOption('option', 'English',  selectArr[1]);
            } 
           
        }
        createBlock(footerUser,'footerUser', boardUser);
        createBlock(buttonDel,'buttonDel', footerUser, 'Применить'); 
    });
 
function select(a, b){
    for(let item of a.children){
        if(item.selected){
            localStorage.setItem(`${b}`, `${a.value}`);
            console.log(a.value);
        }    
}
}
 buttonDel.addEventListener('click', function(){
   for(let i = 0; i < 3; i++){
    
    if(i == 0){
        select(selectArr[0], 'background');
    }
    if(i == 1){
        select(selectArr[1], 'lang');
    }
    if(i == 2){
        localStorage.removeItem('name');
        localStorage.removeItem('password');
        localStorage.setItem('name', inputChangeName.value);
        localStorage.setItem('password', inputChangePassword.value);
    }
   }
    deleteEl(headerUser, mainUser, footerUser, boardUser);
      
});
showButton.addEventListener('click', function(){
    for(let item of selectCity.children){
        if(item.selected){
            console.log(inputNumber.value);
            nameCity = item.value;
            url = `http://api.weatherapi.com/v1/forecast.json?key=7263066957634ac7a15142941232102&q=${nameCity}&days=${inputNumber.value}&aqi=no&alerts=no`;
        }
    }
    fetchWeather();
})
function fetchWeather(){  
     fetch(url)
                .then(res => res.json())
                .then((res) => {
                    console.log(res);
                    for(let i = 0; i < parseInt(inputNumber.value); i++){
                        let weatherCard = document.createElement('div');
                        createBlock(weatherCard, 'weatherCard', centerMain);
                    }
                    return res;
                })
                .then(res => {
                    let weatherArr = document.getElementsByClassName('weatherCard');
                     for(let k = 0; k < weatherArr.length; k++){
                        createArrBlock('div', 'headerCard', weatherArr[k], res.forecast.forecastday[k].day.condition.text);
                        createImg('imgCard', res.forecast.forecastday[k].day.condition.icon, weatherArr[k]);
                        
                        let downCardblock = document.createElement('div'); 
                        createBlock(downCardblock, 'downCardblock', weatherArr[k]);
                        
                        createArrBlock('div', 'temp', downCardblock, res.forecast.forecastday[k].day.avgtemp_c);
                        createArrBlock('div', 'data', downCardblock, res.forecast.forecastday[k].date);
                    } 
                    
                })
                showButton.remove();
        }

        let tomorrowArr = document.querySelectorAll('.infoPrecent');
        console.log(tomorrowArr);
        
            function tomorrow(){
                fetch(url)
                .then(res => res.json())
                .then(res => {
                    let baseWayData = res.forecast.forecastday[1].day;
                    let base2 = res.forecast.forecastday[2].day;
                    for(let i = 0; i < tomorrowArr.length; i++){
                        if(i == 0){
                            tomorrowArr[i].innerText = `${baseWayData.avghumidity}%`;
                        }
                        if(i == 1){
                            tomorrowArr[i].innerText = `${baseWayData.maxwind_kph}`;
                        }
                        if(i == 2){
                            tomorrowArr[i].innerText = `${baseWayData.maxwind_mph}`;
                        }
                        if(i == 3){
                            tomorrowArr[i].innerText = `${baseWayData.daily_chance_of_snow}%`;
                        }
                        if(i == 4){
                            tomorrowArr[i].innerText = `${baseWayData.daily_chance_of_rain}%`;
                        }
                        if(i == 5){
                            tomorrowArr[i].innerText = `${baseWayData.maxtemp_c}`;
                        }
                        if(i == 6){
                            tomorrowArr[i].innerText = `${baseWayData.mintemp_c}`;
                        }
                        if(i == 7){
                            tomorrowArr[i].innerText = `${baseWayData.maxtemp_f}`;
                        }
                        if(i == 8){
                            tomorrowArr[i].innerText = `${baseWayData.mintemp_f}`;
                        }
                        if(i == 9){
                            tomorrowArr[i].innerText = `${base2.avghumidity}%`;
                        }
                        if(i == 10){
                            tomorrowArr[i].innerText = `${base2.maxwind_kph}`;
                        }
                        if(i == 11){
                            tomorrowArr[i].innerText = `${base2.maxwind_mph}`;
                        }
                        if(i == 12){
                            tomorrowArr[i].innerText = `${base2.daily_chance_of_snow}%`;
                        }
                        if(i == 13){
                            tomorrowArr[i].innerText = `${base2.daily_chance_of_rain}%`;
                        }
                        if(i == 14){
                            tomorrowArr[i].innerText = `${base2.maxtemp_c}`;
                        }
                        if(i == 15){
                            tomorrowArr[i].innerText = `${base2.mintemp_c}`;
                        }
                        if(i == 16){
                            tomorrowArr[i].innerText = `${base2.maxtemp_f}`;
                        }
                        if(i == 17){
                            tomorrowArr[i].innerText = `${base2.mintemp_f}`;
                        }
                    }
                })
            }
            tomorrow()
            
            let gridMain = document.querySelector('.gridMain');

             function gridToday(){ 
                fetch(url)
                .then(res => res.json())
                .then((res) => {
                    let imgLink =  res.forecast.forecastday[0];
                    for(let i = 0; i < 8; i++){
                        createArrBlock('div', 'inMain', gridMain); 
                    }
                    let inMainArr = document.querySelectorAll('.inMain');
                    
                    createArrBlock('div', 'hour', inMainArr[0])
                     for(let k = 0; k <= 9; k++){
                        if(k == 1){
                             createArrBlock('div', 'hour', inMainArr[0], '0:00');
                        }if(k == 2){
                             createArrBlock('div', 'hour', inMainArr[0], '3:00');
                        }if(k == 3){
                             createArrBlock('div', 'hour', inMainArr[0], '6:00');
                        }if(k == 4){
                             createArrBlock('div', 'hour', inMainArr[0], '9:00');
                        }if(k == 5){
                             createArrBlock('div', 'hour', inMainArr[0], '12:00');
                        }if(k == 7){
                             createArrBlock('div', 'hour', inMainArr[0], '15:00');
                        }if(k == 8){
                             createArrBlock('div', 'hour', inMainArr[0], '18:00');
                        }
                        if(k == 9){
                             createArrBlock('div', 'hour', inMainArr[0], '21:00');
                        }
                    }
                     for(let c = 0; c <= 9; c++){
                        console.log(imgLink.hour[0].condition.icon);
                       
                        if(c == 0){
                            createArrBlock('div', 'hour', inMainArr[1], 'Icon');
                        }
                       if(c == 1){
                        createImg('icon', imgLink.hour[0].condition.icon, inMainArr[1]);
                       }
                       if(c == 3){
                        createImg('icon', imgLink.hour[3].condition.icon, inMainArr[1]);
                       }
                       if(c == 4){
                        createImg('icon', imgLink.hour[9].condition.icon, inMainArr[1]);
                       }
                       if(c == 5){
                        createImg('icon', imgLink.hour[12].condition.icon, inMainArr[1]);
                       }
                       if(c == 6){
                        createImg('icon', imgLink.hour[15].condition.icon, inMainArr[1]);
                       }
                       if(c == 7){
                        createImg('icon', imgLink.hour[18].condition.icon, inMainArr[1]);
                       }
                       if(c == 8){
                        createImg('icon', imgLink.hour[21].condition.icon, inMainArr[1]);
                       }
                       if(c == 9){
                        createImg('icon', imgLink.hour[23].condition.icon, inMainArr[1]);
                       }
                     } 
                      let count = 0;
                    /*  function num(_inBlockNum, _criterion, _name, _criterionText){
                        for(let k = 0; k <= 9; k++){
                           
                                if(k == 0){
                                    createArrBlock('div', 'hour', _inBlockNum, `${_name}`);
                                }
                                if(k == 1){
                                    createArrBlock('div', 'hour', _inBlockNum, `${_criterion},${_criterionText}`);
                                    count += 3;
                                    
                                    
                               }if(k == 2){
                                    createArrBlock('div', 'hour', _inBlockNum, `${_criterion}, ${_criterionText}`);
                                    count += 3;
                               }if(k == 3){
                                    createArrBlock('div', 'hour', _inBlockNum, `${_criterion}, ${_criterionText}`);
                                    count += 3;
                               }if(k == 4){
                                    createArrBlock('div', 'hour', _inBlockNum, `${_criterion}, ${_criterionText}`);
                                    count += 3;
                               }if(k == 5){
                                    createArrBlock('div', 'hour', _inBlockNum, `${_criterion}, ${_criterionText}`);
                                    count += 3;
                               }if(k == 7){
                                    createArrBlock('div', 'hour', _inBlockNum, `${_criterion}, ${_criterionText}`);
                                    count += 3;
                               }if(k == 8){
                                    createArrBlock('div', 'hour', _inBlockNum, `${_criterion}, ${_criterionText}`);
                                    count += 3;
                               }
                               if(k == 9){
                                    createArrBlock('div', 'hour', _inBlockNum, `${_criterion}, ${_criterionText}`);
                                    count = 0;
                               }
                             } 
                     }   */
                     /* num(inMainArr[2], imgLink.hour[count].temp_c, 'Temp', 'C'); */
                      for(let k = 0; k <= 9; k++){
                        if(k == 0){
                            createArrBlock('div', 'hour', inMainArr[2], 'Temp');
                        }
                        if(k == 1){
                            createArrBlock('div', 'hour', inMainArr[2], `${imgLink.hour[0].temp_c}C`);
                       }if(k == 2){
                            createArrBlock('div', 'hour', inMainArr[2], `${imgLink.hour[3].temp_c}C`);
                       }if(k == 3){
                            createArrBlock('div', 'hour', inMainArr[2], `${imgLink.hour[6].temp_c}C`);
                       }if(k == 4){
                            createArrBlock('div', 'hour', inMainArr[2], `${imgLink.hour[9].temp_c}C`);
                       }if(k == 5){
                            createArrBlock('div', 'hour', inMainArr[2], `${imgLink.hour[12].temp_c}C`);
                       }if(k == 7){
                            createArrBlock('div', 'hour', inMainArr[2], `${imgLink.hour[15].temp_c}C`);
                       }if(k == 8){
                            createArrBlock('div', 'hour', inMainArr[2], `${imgLink.hour[18].temp_c}C`);
                       }
                       if(k == 9){
                            createArrBlock('div', 'hour', inMainArr[2], `${imgLink.hour[21].temp_c}C`);
                       }
                     } 
                     for(let k = 0; k <= 9; k++){
                        if(k == 0){
                            createArrBlock('div', 'hour', inMainArr[3], 'wind');
                        }
                        if(k == 1){
                            createArrBlock('div', 'hour', inMainArr[3], `${imgLink.hour[0].wind_kph}km/h`);
                       }if(k == 2){
                            createArrBlock('div', 'hour', inMainArr[3], `${imgLink.hour[3].wind_kph}km/h`);
                       }if(k == 3){
                            createArrBlock('div', 'hour', inMainArr[3], `${imgLink.hour[6].wind_kph}km/h`);
                       }if(k == 4){
                            createArrBlock('div', 'hour', inMainArr[3], `${imgLink.hour[9].wind_kph}km/h`);
                       }if(k == 5){
                            createArrBlock('div', 'hour', inMainArr[3], `${imgLink.hour[12].wind_kph}km/h`);
                       }if(k == 7){
                            createArrBlock('div', 'hour', inMainArr[3], `${imgLink.hour[15].wind_kph}km/h`);
                       }if(k == 8){
                            createArrBlock('div', 'hour', inMainArr[3], `${imgLink.hour[18].wind_kph}km/h`);
                       }
                       if(k == 9){
                            createArrBlock('div', 'hour', inMainArr[3], `${imgLink.hour[21].wind_kph}km/h`);
                       }
                     } 
                     for(let k = 0; k <= 9; k++){
                        if(k == 0){
                            createArrBlock('div', 'hour', inMainArr[4], 'Precip');
                        }
                        if(k == 1){
                            createArrBlock('div', 'hour', inMainArr[4], `${imgLink.hour[0].precip_mm}mm`);
                       }if(k == 2){
                            createArrBlock('div', 'hour', inMainArr[4], `${imgLink.hour[3].precip_mm}mm`);
                       }if(k == 3){
                            createArrBlock('div', 'hour', inMainArr[4], `${imgLink.hour[6].precip_mm}mm`);
                       }if(k == 4){
                            createArrBlock('div', 'hour', inMainArr[4], `${imgLink.hour[9].precip_mm}mm`);
                       }if(k == 5){
                            createArrBlock('div', 'hour', inMainArr[4], `${imgLink.hour[12].precip_mm}mm`);
                       }if(k == 7){
                            createArrBlock('div', 'hour', inMainArr[4], `${imgLink.hour[15].precip_mm}mm`);
                       }if(k == 8){
                            createArrBlock('div', 'hour', inMainArr[4], `${imgLink.hour[18].precip_mm}mm`);
                       }
                       if(k == 9){
                            createArrBlock('div', 'hour', inMainArr[4], `${imgLink.hour[21].precip_mm}mm`);
                       }
                     } 
                     for(let k = 0; k <= 9; k++){
                        if(k == 0){
                            createArrBlock('div', 'hour', inMainArr[5], 'Cloud');
                        }
                        if(k == 1){
                            createArrBlock('div', 'hour', inMainArr[5], `${imgLink.hour[0].cloud}%`);
                       }if(k == 2){
                            createArrBlock('div', 'hour', inMainArr[5], `${imgLink.hour[3].cloud}%`);
                       }if(k == 3){
                            createArrBlock('div', 'hour', inMainArr[5], `${imgLink.hour[6].cloud}%`);
                       }if(k == 4){
                            createArrBlock('div', 'hour', inMainArr[5], `${imgLink.hour[9].cloud}%`);
                       }if(k == 5){
                            createArrBlock('div', 'hour', inMainArr[5], `${imgLink.hour[12].cloud}%`);
                       }if(k == 7){
                            createArrBlock('div', 'hour', inMainArr[5], `${imgLink.hour[15].cloud}%`);
                       }if(k == 8){
                            createArrBlock('div', 'hour', inMainArr[5], `${imgLink.hour[18].cloud}%`);
                       }
                       if(k == 9){
                            createArrBlock('div', 'hour', inMainArr[5], `${imgLink.hour[21].cloud}%`);
                       }
                     } 
                     for(let k = 0; k <= 9; k++){
                        if(k == 0){
                            createArrBlock('div', 'hour', inMainArr[6], 'Humidity');
                        }
                        if(k == 1){
                            createArrBlock('div', 'hour', inMainArr[6], `${imgLink.hour[0].humidity}%`);
                       }if(k == 2){
                            createArrBlock('div', 'hour', inMainArr[6], `${imgLink.hour[3].humidity}%`);
                       }if(k == 3){
                            createArrBlock('div', 'hour', inMainArr[6], `${imgLink.hour[6].humidity}%`);
                       }if(k == 4){
                            createArrBlock('div', 'hour', inMainArr[6], `${imgLink.hour[9].humidity}%`);
                       }if(k == 5){
                            createArrBlock('div', 'hour', inMainArr[6], `${imgLink.hour[12].humidity}%`);
                       }if(k == 7){
                            createArrBlock('div', 'hour', inMainArr[6], `${imgLink.hour[15].humidity}%`);
                       }if(k == 8){
                            createArrBlock('div', 'hour', inMainArr[6], `${imgLink.hour[18].humidity}%`);
                       }
                       if(k == 9){
                            createArrBlock('div', 'hour', inMainArr[6], `${imgLink.hour[21].humidity}%`);
                       }
                     } 
                     for(let k = 0; k <= 9; k++){
                        if(k == 0){
                            createArrBlock('div', 'hour', inMainArr[7], 'Pressure');
                        }
                        if(k == 1){
                            createArrBlock('div', 'hour', inMainArr[7], `${imgLink.hour[0].pressure_in}in`);
                       }if(k == 2){
                            createArrBlock('div', 'hour', inMainArr[7], `${imgLink.hour[3].pressure_in}in`);
                       }if(k == 3){
                            createArrBlock('div', 'hour', inMainArr[7], `${imgLink.hour[6].pressure_in}in`);
                       }if(k == 4){
                            createArrBlock('div', 'hour', inMainArr[7], `${imgLink.hour[9].pressure_in}in`);
                       }if(k == 5){
                            createArrBlock('div', 'hour', inMainArr[7], `${imgLink.hour[12].pressure_in}in`);
                       }if(k == 7){
                            createArrBlock('div', 'hour', inMainArr[7], `${imgLink.hour[15].pressure_in}in`);
                       }if(k == 8){
                            createArrBlock('div', 'hour', inMainArr[7], `${imgLink.hour[18].pressure_in}in`);
                       }
                       if(k == 9){
                            createArrBlock('div', 'hour', inMainArr[7], `${imgLink.hour[21].pressure_in}in`);
                       }
                     }        
                })
             }
            gridToday();