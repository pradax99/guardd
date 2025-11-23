// Фотографии специалиста - ЗАМЕНИТЕ ЭТИ ПУТИ НА ВАШИ ФОТОГРАФИИ
const specialistPhotos = [
    'photos/specialist1.jpg',
    'photos/specialist2.jpg', 
    'photos/specialist3.jpg'
];

let currentPhotoIndex = 0;
let currentReviewIndex = 0;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializePhotoGallery();
    initializeReviews();
    setupFormSubmission();
    setupSmoothScrolling();
});

// Фотогалерея специалиста
function initializePhotoGallery() {
    const photoContainer = document.getElementById('photo-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const photoCounter = document.getElementById('photo-counter');
    
    // Очищаем инструкцию и добавляем первую фотографию
    photoContainer.innerHTML = '';
    loadCurrentPhoto();
    
    // Обработчики для кнопок
    prevBtn.addEventListener('click', showPreviousPhoto);
    nextBtn.addEventListener('click', showNextPhoto);
    
    // Обновляем счетчик
    updatePhotoCounter();
}

function loadCurrentPhoto() {
    const photoContainer = document.getElementById('photo-container');
    const img = document.createElement('img');
    img.src = specialistPhotos[currentPhotoIndex];
    img.alt = `Фахівець зі страхування - фото ${currentPhotoIndex + 1}`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '10px';
    
    photoContainer.innerHTML = '';
    photoContainer.appendChild(img);
}

function showPreviousPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + specialistPhotos.length) % specialistPhotos.length;
    loadCurrentPhoto();
    updatePhotoCounter();
}

function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % specialistPhotos.length;
    loadCurrentPhoto();
    updatePhotoCounter();
}

function updatePhotoCounter() {
    const photoCounter = document.getElementById('photo-counter');
    photoCounter.textContent = `${currentPhotoIndex + 1}/${specialistPhotos.length}`;
}

// Система отзывов
function initializeReviews() {
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    const prevReviewBtn = document.getElementById('prev-review');
    const nextReviewBtn = document.getElementById('next-review');
    
    // Показываем первый отзыв
    showReview(currentReviewIndex);
    
    // Обработчики для кнопок
    prevReviewBtn.addEventListener('click', showPreviousReview);
    nextReviewBtn.addEventListener('click', showNextReview);
    
    // Обработчики для точек
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentReviewIndex = parseInt(this.getAttribute('data-index'));
            showReview(currentReviewIndex);
        });
    });
}

function showReview(index) {
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    
    // Скрываем все отзывы
    reviewCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Показываем выбранный отзыв
    reviewCards[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentReviewIndex = index;
}

function showPreviousReview() {
    const totalReviews = document.querySelectorAll('.review-card').length;
    currentReviewIndex = (currentReviewIndex - 1 + totalReviews) % totalReviews;
    showReview(currentReviewIndex);
}

function showNextReview() {
    const totalReviews = document.querySelectorAll('.review-card').length;
    currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
    showReview(currentReviewIndex);
}

// Обработка формы
function setupFormSubmission() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь можно добавить отправку формы на сервер
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        
        alert(`Дякуємо, ${name}! Ваше повідомлення відправлено. Ми зв'яжемося з вами найближчим часом.`);
        this.reset();
    });
}

// Плавная прокрутка
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Учитываем высоту хедера
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Обработка кнопки CTA
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});