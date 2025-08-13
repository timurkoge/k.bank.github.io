function saveAllData() {
    localStorage.setItem('user_info', JSON.stringify(user_info));
    localStorage.setItem('last_save', new Date().toISOString());
}// Загрузка данных из localStorage или использование значений по умолчанию

function clearAllOperations() {
    for (const user in user_info) {
        if (user_info.hasOwnProperty(user)) {
            user_info[user].operations = []; // Очищаем массив операций
        }
    }
    saveAllData(); // Сохраняем изменения
    update();      // Обновляем интерфейс
    alert("Все операции очищены!");
}


let user_info = JSON.parse(localStorage.getItem('user_info')) || {
    "Тимур": {"ballance": 15000, "operations": []},
    "Карим": {"ballance": 18000, "operations": []},
    "Дамир": {"ballance": 12045, "operations": []},
    "Артур": {"ballance": 10882, "operations": []},
};

// Сохранение данных в localStorage
function saveUserData() {
    localStorage.setItem('user_info', JSON.stringify(user_info));
}

function update() {
    if (localStorage.getItem('authenticated') === 'true') {
        const phone = localStorage.getItem('currentUser');
        const userName = name[phone];
        
        if (userName && user_info[userName]) {
            document.getElementById('card_ballance').textContent = `${user_info[userName].ballance}$`;
            
            const operationsContainer = document.querySelector('.opperations_container');
            operationsContainer.innerHTML = '';
            
            if (user_info[userName].operations.length > 0) {
                user_info[userName].operations.forEach(operation => {
                    const [opName, opType, opAmount] = operation;
                    
                    const newOperation = document.createElement('li');
                    newOperation.className = 'opperation_block';
                    newOperation.innerHTML = `
                        <div class="opperation_icon">
                            <img class="opperation_image" src="${opType === "p" ? 'plus' : 'minus'}.png" alt="">
                        </div>
                        <div class="opperation_info">
                            <h2 class="opperation_user">${opName}</h2>
                            <p class="${opType === "p" ? 'plus' : 'minus'}">${opType === "p" ? '+' : '-'}${opAmount}$</p>
                        </div>
                    `;
                    operationsContainer.appendChild(newOperation);

                    saveAllData();
                });
            } else {
                const noOperations = document.createElement("h3");
                noOperations.style.cssText = 'color: #d2d2d2; text-align: center;';
                noOperations.innerText = "Нет операций";
                operationsContainer.appendChild(noOperations);
                    
                saveAllData();
            }
        } else {
            console.error('Пользователь не найден');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    clearAllOperations
    document.querySelector(".check").style.display = "none";
    update();
});

document.getElementById("opperation_form").addEventListener("submit", function(event) {
    event.preventDefault();
    const phone = localStorage.getItem('currentUser');
    const userName = name[phone];

    const transferPhone = this.transfer_phone.value.trim();
    const transferSum = Number(this.transfer_sum.value);

    if (!transferPhone || !transferSum) {
        alert("Заполните все поля");
        return;
    }

    if (!name[transferPhone]) {
        alert("Номер телефона не найден");
        return;
    }

    if (name[transferPhone] === userName) {
        alert("Нельзя переводить себе");
        return;
    }
    
    if (transferSum <= 0) {
        alert("Сумма должна быть больше 0");
        return;
    }

    if (transferSum > user_info[userName].ballance) {
        alert("Недостаточно средств");
        return;
    }

    user_info[userName].ballance -= transferSum;
    user_info[name[transferPhone]].ballance += transferSum;
    
    const operationTime = getFormattedTime();
    user_info[userName].operations.push([name[transferPhone], "m", transferSum]);
    user_info[name[transferPhone]].operations.push([userName, "p", transferSum]);
    
    saveUserData();
    update();
    openCheck(userName, name[transferPhone], transferSum, operationTime);
    this.reset();
    saveAllData();
});

function getFormattedTime() {
    const date = new Date();
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

function openCheck(sender, receiver, amount, time) {
    document.getElementById("t1").textContent = sender;
    document.getElementById("t2").textContent = receiver;
    document.getElementById("s").textContent = `${amount}$`;
    document.getElementById("t").textContent = time;
    document.querySelector(".check").style.display = "flex";
}

function closeCheck() {
    document.querySelector(".check").style.display = "none";
}

document.getElementById("exit_check_btn").addEventListener('click', closeCheck());






// Гамбургер-меню
const hamburgerMenu = document.querySelector('.hamburger-menu');
const hamburgerIcon = document.querySelector('.hamburger-icon');
const menuBackdrop = document.querySelector('.menu-backdrop');

// Открытие/закрытие меню
hamburgerIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    hamburgerMenu.classList.toggle('active');
});

// Закрытие при клике на фон
menuBackdrop.addEventListener('click', function() {
    hamburgerMenu.classList.remove('active');
});

// Закрытие при клике на пункт меню
document.querySelectorAll('.hamburger-nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
    });
});

// Закрытие при клике вне меню
document.addEventListener('click', function(e) {
    if (!e.target.closest('.hamburger-menu') && hamburgerMenu.classList.contains('active')) {
        hamburgerMenu.classList.remove('active');
    }
});

