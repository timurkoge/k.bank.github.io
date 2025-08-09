var user_info = {
    "Тимур": {"ballance": 15000, "operations": []},
    "Карим": {"ballance": 18000, "operations": []},
    "Дамир": {"ballance": 12045, "operations": []},
    "Артур": {"ballance": 10882, "operations": []},
}


function update() {
    if (localStorage.getItem('authenticated') === 'true') {
        const phone = localStorage.getItem('currentUser');
        const userName = name[phone];
        
        if (userName && user_info[userName]) {
            // Обновляем баланс
            document.getElementById('card_ballance').textContent = 
                `${user_info[userName].ballance}$`;
            
            // Получаем контейнер
            const operationsContainer = document.querySelector('.opperations_container');
            operationsContainer.innerHTML = '';
            
            // Отображаем операции
            if (user_info[userName].operations && user_info[userName].operations.length > 0) {
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
                });
            } else {
                const noOpperatins = document.createElement("h3");
                noOpperatins.style = 'color: #d2d2d2;'
                noOpperatins.innerText = "Нет операций"
                operationsContainer.appendChild(noOpperatins);

            }
        } else {
            console.error('Пользователь не найден');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
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
        alert("Введёный номер телефона не найден, введите корректный номер в формате +24 (00) 000-00.");
        return;
    }

    if (name[transferPhone] === userName) {
        alert("Нельзя переводить деньги самому себе");
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

    // Выполняем перевод
    user_info[userName].ballance -= transferSum;
    user_info[name[transferPhone]].ballance += transferSum;
    
    // Добавляем операции
    const operationTime = getFormattedTime();
    user_info[userName].operations.push([name[transferPhone], "m", transferSum]);
    user_info[name[transferPhone]].operations.push([userName, "p", transferSum]);
    
    update();
    openCheck(userName, name[transferPhone], transferSum, operationTime);
    this.reset(); // Очищаем форму
});

function getFormattedTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
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


document.getElementById("exit_check_btn").addEventListener('click', closeCheck);
