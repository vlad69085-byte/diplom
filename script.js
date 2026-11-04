document.addEventListener('DOMContentLoaded', () => {
    // ===== Модальное окно консультации =====
    const modal = document.getElementById('consultationModal');
    const form = document.getElementById('consultationForm');
    const successMessage = document.getElementById('successMessage');
    const closeBtn = document.getElementById('closeModalBtn');
    const openButtons = document.querySelectorAll('.js-open-modal');

    if (modal && form && closeBtn) {
        function openModal() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                successMessage.classList.remove('show');
            }, 300);
        }

        openButtons.forEach(button => {
            button.addEventListener('click', openModal);
        });

        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                question: document.getElementById('question').value
            };
            console.log('Данные формы:', formData);
            form.style.display = 'none';
            successMessage.classList.add('show');
            setTimeout(() => {
                closeModal();
            }, 3000);
        });
    }

    // ===== Модальное окно авторизации/регистрации =====
    const authModal = document.getElementById('authModal');
    const closeAuthBtn = document.getElementById('closeAuthBtn');
    const authOpenButtons = document.querySelectorAll('.js-open-auth');
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginFormElement = document.getElementById('loginFormElement');
    const registerFormElement = document.getElementById('registerFormElement');
    const authSuccessMessage = document.getElementById('authSuccessMessage');
    const authSuccessTitle = document.getElementById('authSuccessTitle');
    const authSuccessText = document.getElementById('authSuccessText');
    const regPassword = document.getElementById('regPassword');
    const regPasswordConfirm = document.getElementById('regPasswordConfirm');
    const passwordStrength = document.getElementById('passwordStrength');

    if (authModal) {
        function openAuthModal() {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            resetAuthForms();
        }

        function closeAuthModal() {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                resetAuthForms();
            }, 300);
        }

        function resetAuthForms() {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            authSuccessMessage.classList.remove('show');
            loginFormElement.reset();
            registerFormElement.reset();
            authTabs.forEach(tab => tab.classList.remove('active'));
            authTabs[0].classList.add('active');
            if (passwordStrength) passwordStrength.className = 'password-strength';
        }

        authOpenButtons.forEach(button => {
            button.addEventListener('click', openAuthModal);
        });

        closeAuthBtn.addEventListener('click', closeAuthModal);

        authModal.addEventListener('click', function (e) {
            if (e.target === authModal) {
                closeAuthModal();
            }
        });

        // Переключение вкладок
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                authTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const tabName = tab.dataset.tab;
                authSuccessMessage.classList.remove('show');
                
                if (tabName === 'login') {
                    loginForm.style.display = 'block';
                    registerForm.style.display = 'none';
                } else {
                    loginForm.style.display = 'none';
                    registerForm.style.display = 'block';
                }
            });
        });

        // Обработка формы входа
        if (loginFormElement) {
            loginFormElement.addEventListener('submit', function (e) {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                const rememberMe = document.getElementById('rememberMe').checked;

                console.log('Вход:', { email, password, rememberMe });

                // Имитация успешного входа
                loginForm.style.display = 'none';
                authSuccessTitle.textContent = 'Добро пожаловать!';
                authSuccessText.textContent = 'Вы успешно вошли в аккаунт';
                authSuccessMessage.classList.add('show');

                setTimeout(() => {
                    closeAuthModal();
                }, 2000);
            });
        }

        // Обработка формы регистрации
        if (registerFormElement) {
            registerFormElement.addEventListener('submit', function (e) {
                e.preventDefault();
                const name = document.getElementById('regName').value;
                const email = document.getElementById('regEmail').value;
                const phone = document.getElementById('regPhone').value;
                const password = document.getElementById('regPassword').value;
                const passwordConfirm = document.getElementById('regPasswordConfirm').value;
                const agreeTerms = document.getElementById('agreeTerms').checked;

                // Проверка совпадения паролей
                if (password !== passwordConfirm) {
                    alert('Пароли не совпадают!');
                    return;
                }

                // Проверка длины пароля
                if (password.length < 6) {
                    alert('Пароль должен содержать минимум 6 символов!');
                    return;
                }

                console.log('Регистрация:', { name, email, phone, password, agreeTerms });

                // Имитация успешной регистрации
                registerForm.style.display = 'none';
                authSuccessTitle.textContent = 'Регистрация успешна!';
                authSuccessText.textContent = `Добро пожаловать, ${name}!`;
                authSuccessMessage.classList.add('show');

                setTimeout(() => {
                    closeAuthModal();
                }, 2000);
            });
        }

        // Индикатор сложности пароля
        if (regPassword && passwordStrength) {
            regPassword.addEventListener('input', function () {
                const password = this.value;
                let strength = 0;

                if (password.length >= 6) strength++;
                if (password.length >= 10) strength++;
                if (/[A-Z]/.test(password)) strength++;
                if (/[0-9]/.test(password)) strength++;
                if (/[^A-Za-z0-9]/.test(password)) strength++;

                passwordStrength.className = 'password-strength';
                
                if (password.length === 0) {
                    passwordStrength.classList.add('strength-none');
                } else if (strength <= 2) {
                    passwordStrength.classList.add('strength-weak');
                    passwordStrength.textContent = 'Слабый пароль';
                } else if (strength <= 4) {
                    passwordStrength.classList.add('strength-medium');
                    passwordStrength.textContent = 'Средний пароль';
                } else {
                    passwordStrength.classList.add('strength-strong');
                    passwordStrength.textContent = 'Надёжный пароль';
                }
            });
        }
    }

    // ===== Плавная прокрутка по якорям =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== Бургер-меню =====
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileNav = document.getElementById('mobileNav');

    if (burgerMenu && mobileNav) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Закрытие меню при клике на ссылку
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }

    // ===== Фильтры каталога =====
    const typesButtons = document.querySelectorAll('.types-btn');
    const motoItems = document.querySelectorAll('.moto-item');
    const motoShowcase = document.querySelector('.moto-showcase');
    const sortSelect = document.getElementById('sortSelect');

    if (typesButtons.length > 0 && motoShowcase) {
        typesButtons.forEach(button => {
            button.addEventListener('click', () => {
                typesButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.dataset.category;
                motoItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                applySorting();
            });
        });

        function applySorting() {
            const sortType = sortSelect.value;
            if (!sortType) return;

            const visibleItems = Array.from(motoItems).filter(
                item => item.style.display !== 'none'
            );

            const getName = (item) => {
                const titleEL = item.querySelector('.moto-name');
                return titleEL ? titleEL.textContent.trim() : '';
            };

            visibleItems.sort((a, b) => {
                if (sortType === 'price-asc') {
                    return parseInt(a.dataset.price) - parseInt(b.dataset.price);
                } else if (sortType === 'price-desc') {
                    return parseInt(b.dataset.price) - parseInt(a.dataset.price);
                } else if (sortType === 'power-asc') {
                    return parseInt(a.dataset.power) - parseInt(b.dataset.power);
                } else if (sortType === 'power-desc') {
                    return parseInt(b.dataset.power) - parseInt(a.dataset.power);
                } else if (sortType === 'name-asc') {
                    return getName(a).localeCompare(getName(b), 'ru');
                } else if (sortType === 'name-desc') {
                    return getName(b).localeCompare(getName(a), 'ru');
                }
                return 0;
            });

            visibleItems.forEach(item => motoShowcase.appendChild(item));
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                applySorting();
            });
        }
    }

    // ===== Маска для телефона =====
    const phoneInput = document.getElementById('regPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                let formattedValue = '+7';
                if (value.length > 0) {
                    formattedValue += ' (' + value.substring(0, 3);
                }
                if (value.length >= 3) {
                    formattedValue += ') ' + value.substring(3, 6);
                }
                if (value.length >= 6) {
                    formattedValue += '-' + value.substring(6, 8);
                }
                if (value.length >= 8) {
                    formattedValue += '-' + value.substring(8, 10);
                }
                e.target.value = formattedValue;
            }
        });
    }
});