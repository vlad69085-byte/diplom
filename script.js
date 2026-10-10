             document.addEventListener('DOMContentLoaded', () => {
    // ===== Модальное окно =====
    const modal = document.getElementById('consultationModal');
    const form = document.getElementById('consultationForm');
    const successMessage = document.getElementById('successMessage');
    const closeBtn = document.getElementById('closeModalBtn');
    const openButtons = document.querySelectorAll('.js-open-modal');

    // Проверяем, есть ли модалка на странице
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

    // ===== Фильтры каталога =====
    const typesButtons = document.querySelectorAll('.types-btn');
    const motoItems = document.querySelectorAll('.moto-item');
    const motoShowcase = document.querySelector('.moto-showcase');
    const sortSelect = document.getElementById('sortSelect');

    // Проверяем, есть ли фильтры на странице
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

            visibleItems.sort((a, b) => {
                if (sortType === 'price-asc') {
                    return parseInt(a.dataset.price) - parseInt(b.dataset.price);
                } else if (sortType === 'price-desc') {
                    return parseInt(b.dataset.price) - parseInt(a.dataset.price);
                } else if (sortType === 'power-asc') {
                    return parseInt(a.dataset.power) - parseInt(b.dataset.power);
                } else if (sortType === 'power-desc') {
                    return parseInt(b.dataset.power) - parseInt(a.dataset.power);
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
});