document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('consultationModal');
    const form = document.getElementById('consultationForm');
    const successMessage = document.getElementById('successMessage');
    const closeBtn = document.getElementById('closeModalBtn');
    

    const openButtons = document.querySelectorAll('.js-open-modal');

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


    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });


    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

   
    form.addEventListener('submit', function(e) {
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
});