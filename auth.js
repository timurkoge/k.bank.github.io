const pass = {
    '+24 (48) 068-87': "237560",
    '+24 (34) 488-52': "135635", 
    '+24 (34) 755-90': "154525",
    '+24 (48) 341-53': "125364",
};

const name = {
    '+24 (48) 068-87': "Тимур",
    '+24 (34) 488-52': "Карим", 
    '+24 (34) 755-90': "Дамир",
    '+24 (48) 341-53': "Артур",
}

const menu = {
    "+24 (48) 068-87": `<div class="user-menu">
        <div id="user--icon" style="background: #00bfff;">Т</div>
        <div class="username">Тимур</div>
        <button class="exit_btn">Выход</button>
    </div>`,
    "+24 (34) 488-52": `<div class="user-menu">
        <div id="user--icon" style="background: #ff0000;">К</div>
        <div class="username">Карим</div>
        <button class="exit_btn">Выход</button>
    </div>`,
    "+24 (34) 755-90": `<div class="user-menu">
        <div id="user--icon" style="background: #fff700;">Д</div>
        <div class="username">Дамир</div>
        <button class="exit_btn">Выход</button>
    </div>`,
    "+24 (48) 341-53": `<div class="user-menu">
        <div id="user--icon" style="background: #00ff33;">А</div>
        <div class="username">Артур</div>
        <button class="exit_btn">Выход</button>
    </div>`
};

document.getElementById('login_form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const phone = this.phone.value.trim();
    const password = this.password.value;
    
    if (!phone || !password) {
        alert("Заполните все поля");
        return;
    }
    
    if (pass[phone] === password) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('main').style.display = 'block';
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('currentUser', phone);
        
        const authMenu = document.querySelector('.header--user_autentification_menu');
        authMenu.innerHTML = '';
        authMenu.insertAdjacentHTML('beforeend', menu[phone]);
        
        document.querySelector('.exit_btn').addEventListener('click', function() {
            localStorage.removeItem('authenticated');
            localStorage.removeItem('currentUser');
            location.reload();
        });
    } else {
        alert("Неверный номер телефона или пароль");
        this.password.value = '';
        this.password.focus();
    }
    
    update();
});

window.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('authenticated') === 'true') {
        const phone = localStorage.getItem('currentUser');
        if (phone && menu[phone]) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('main').style.display = 'block';
            
            const authMenu = document.querySelector('.header--user_autentification_menu');
            authMenu.innerHTML = '';
            authMenu.insertAdjacentHTML('beforeend', menu[phone]);
            
            document.querySelector('.exit_btn').addEventListener('click', function() {
                localStorage.removeItem('authenticated');
                localStorage.removeItem('currentUser');
                location.reload();
            });
        } else {
            localStorage.removeItem('authenticated');
            localStorage.removeItem('currentUser');
        }
        update();
    }
});
