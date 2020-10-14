const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const dubMoney = document.getElementById('double');
const millionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calcWealth = document.getElementById('calc-wealth');


let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser(){
    const dataResponse = await fetch('https://randomuser.me/api');
    const data = await dataResponse.json(); 
    console.log(data);
    const user = data.results[0]
    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

function addData(obj){
    data.push(obj);
    updateDOM();
}
// Update DOM
function updateDOM(providedData = data){
   // Clear main div
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    providedData.forEach(person => {
       const element = document.createElement('div');
       element.classList.add('person');
       element.innerHTML = `
       <strong>${person.name}</strong> Rs. ${formatMoney(person.money)}`;

        main.appendChild(element);
    })
}
// Format number as money
function formatMoney(amount){
   return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

}
// Event Listener
addUser.addEventListener('click', getRandomUser);
dubMoney.addEventListener('click', () => {
    doubleMoney();

});
millionaires.addEventListener('click', () =>{
    showMillionaires();
});

sort.addEventListener('click', ()=> {
    sortByRichest();
})

calcWealth.addEventListener('click', ()=> {
    calcTotal();
})


function doubleMoney(){
    data = data.map(user => {
        return {
            ...user,
            money : user.money * 2
        }
    })
    updateDOM();
}

function sortByRichest(){
    data = data.sort((a,b)=> b.money - a.money);
    updateDOM();
}

function showMillionaires(){
    data = data.filter(user =>{
      return user.money >= 1000000;
    });
    updateDOM();
}

function calcTotal(providedData = data){
    const money = providedData.map(user => user.money);
    
    const totalAmt = money.reduce((total,value)=> {
        return total + value;
    }, 0);

    const total = document.createElement('div');
    total.innerHTML = `
    <h3>Total Wealth <strong class="tot">Rs. ${formatMoney(totalAmt)}<strong></h3> 
    `;
    main.appendChild(total);
}


