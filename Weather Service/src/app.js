let navService = {
    navItems: document.getElementsByClassName("nav-item"),
    navSearch: document.getElementById("citySearchInput"),
    searchBtn: document.getElementById("citySearchBtn"),
    statisticsResult: document.getElementById("statisticsResult"),
    pages: document.getElementById("pages").children,

    activateItem: function(item){
        for (let navItem of this.navItems) {
            navItem.classList.remove("active");
        }
        item.classList.add("active");
    },

    showPage: function(page){
        for (let pageElement of this.pages) {
            pageElement.style.display = "none";
        }
        page.style.display = "block";
    },

    registerNavListeners: function(){
        for(let i = 0; i < this.navItems.length; i++){
            this.navItems[i].addEventListener("click", function(){
                // this in addEventListener points to the item that has the event listener
                navService.activateItem(this);
                navService.showPage(navService.pages[i]);
            })
        }
        this.searchBtn.addEventListener("click", function(e){
            e.preventDefault();
            weatherService.city = navService.navSearch.value;
            weatherService.getData();
        })
        
    }
}

let weatherService = {
    apiKey: "d0f979823643041e2d2713cc60ac1c9c",
    city: "skopje",
    apiUrl: "https://api.openweathermap.org/data/2.5/forecast",
    getData: function(){
        return new Promise((resolve, reject) => {
        $.ajax({
            url: `${this.apiUrl}?q=${this.city}&units=metric&APPID=${this.apiKey}`,
            success: (response) => {
                resolve(response);
                console.log('The request succeeded!');
                console.log(response);
                let warmestReading = response.list.reduce((result, mes) => mes.main.temp > result.main.temp ? result = mes : result, {main: {temp: -Infinity}});
                // [0, 2, 3, 1, 2, 5, 2, 3]
                // 1. result = {main: {temp: -Infinity}} mes = {main: {temp: 0}}
                // => mes.main.temp > result.main.temp => 0 > -Infinity => result = mes => result = {main: {temp: 0}}
                // 2. result = {main: {temp: 0}} mes = {main: {temp: 2}}
                // => mes.main.temp > result.main.temp => 2 > 0 => result = mes => result = {main: {temp: 2}}
                // 3. result = {main: {temp: 2}} mes = {main: {temp: 3}}
                // => mes.main.temp > result.main.temp => 3 > 2 => result = mes => result = {main: {temp: 3}}
                // 4. result = {main: {temp: 3}} mes = {main: {temp: 1}}
                // => mes.main.temp > result.main.temp => 1 > 3 => result => result = {main: {temp: 3}}

                function maxTemp(response){
                    let highestTemp = response.list[0];
                    for (let item of response.list) {
                        if(item.main.temp > highestTemp.main.temp){
                            highestTemp = item;
                        }
                    }
                    return highestTemp;
                }
                console.log("WARMEST");
                console.log(warmestReading);
                console.log("WARMEST BUT WITH FUNCTION");
                console.log(maxTemp(response));

            }, 
            error: (error) =>{
                reject(error);
                console.log('The request failed!');
                console.log(response.responseText);
            }
        });
    })}
}

navService.registerNavListeners();

console.log(weatherService.getData().then((data) =>{
    navService.statisticsResult.innerHTML = `<p>The temperature for ${weatherService.city} is ${data.list[0].main.temp}</p> `;

}));

function avarageTemp(response){
    let sum =0;
    let res = 0;
    
    for(let i = 0; response.list.length > i; i++){
        sum += response.list[i].main.temp;
    }
     return res = Math.floor(sum / response.list.length+1) +' C';
}

function highestTemp(response){
    let sum =0;
    let res = 0;
    let arry =[];
    
    for(let i = 0; response.list.length > i; i++){
        arry.push(response.list[i].main.temp);
        sum = Math.max(...arry);
        res = Math.round(sum);
    }
     return res + ` C`;
}
function lowestTemp(response){
    let sum =0;
    let res = 0;
    let arry =[];
    
    for(let i = 0; response.list.length > i; i++){
        arry.push(response.list[i].main.temp);
        res = Math.min(...arry);
        sum = Math.round(res);
    }
     return sum + ` C`;
};
////////////////////////////////
function avarageHum(response){
    let sum =0;
    let res = 0;
    
    for(let i = 0; response.list.length > i; i++){
        sum += response.list[i].main.humidity;
    }
     return res = Math.floor(sum / response.list.length+1) +' %';
}


function highestHum(response){
    let sum =0;
    let res = 0;
    let arry =[];
    
    for(let i = 0; response.list.length > i; i++){
        arry.push(response.list[i].main.humidity);
        sum = Math.max(...arry);
        res = Math.round(sum);
    }
     return res + ` %`;
}
function lowestHum(response){
    let sum =0;
    let res = 0;
    let arry =[];
    
    for(let i = 0; response.list.length > i; i++){
        arry.push(response.list[i].main.humidity);
        res = Math.min(...arry);
        sum = Math.round(res);
    }
     return sum + ` %`;
};

function warmest(response){
    for(let i = 0; response.list.length > i; i++){
        response.list[i];
    }
}
function findDate(response){
    let warmestReading = response.list.reduce((result, mes) => mes > result ? result = mes : result, -Infinity);
    for(let i = 0; response.list.length > i; i++){

    response.list
    }
}


navService.searchBtn.addEventListener("click", function(){
    weatherService.getData().then((data) =>{
        navService.statisticsResult.innerHTML = `<p>The temperature for ${weatherService.city} is ${data.list[0].main.temp}</p> `;
        console.log(avarageTemp(data));
        console.log(highestTemp(data));
        console.log(lowestTemp(data));
        console.log(avarageHum(data));
        console.log(highestHum(data));
        console.log(lowestHum(data));
    })
    });
