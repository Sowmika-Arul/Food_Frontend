
const pizzaData = [
  { image: "pizza1.jpeg", price: 190, hasDiscount: true, discountImage: "Discount.png" },
  { image: "pizza2.jpeg", price: 123, hasDiscount: false },
  { image: "pizza3.jpeg", price: 190, hasDiscount: true, discountImage: "discount1.png" },
  { image: "pizza8.png", price: 190, hasDiscount: false },
  { image: "pizza4.jpeg", price: 190, hasDiscount: true, discountImage: "Discount.png" },
  { image: "pizza5.jpeg", price: 190, hasDiscount: false },
  { image: "pizza6.jpeg", price: 190, hasDiscount: true, discountImage: "discount1.png" },
  { image: "pizza7.jpeg", price: 190, hasDiscount: true, discountImage: "Discount.png" },
  { image: "pizza1.jpeg", price: 190, hasDiscount: true, discountImage: "Discount.png" },
  { image: "pizza2.jpeg", price: 190, hasDiscount: false },
  { image: "pizza3.jpeg", price: 190, hasDiscount: true, discountImage: "discount1.png" },
  { image: "pizza8.png", price: 190, hasDiscount: false },
];

  const cardContainer = document.getElementById('pizzaCardsContainer');

  pizzaData.forEach(pizza => {
    const card = document.createElement('div');
    card.className = 'pizza-card';
    
     const discountBadgeHTML = pizza.hasDiscount && pizza.discountImage
    ? `<img src="../Assets/${pizza.discountImage}" class="discount-badge"/>`
    : '';

    card.innerHTML = `
     ${discountBadgeHTML}
      <img src="../Assets/${pizza.image}" alt="Home made pizza" class="pizza-image" />
      <div class="card-content">
        <div class="card-header">
          <span class="pizza-title">Home made pizza</span>
          <span class="pizza-price">₹${pizza.price}</span>
        </div>
        <div class="card-footer">
          <div class="badge-container">
              <span class="badge flat">
    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 24 24" fill="black">
      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
    4.7
  </span>
            <div class="badge time">
              <span>50-79 min</span>
            </div>
          </div>

<button class="initial-plus" onclick="showQuantity(this)">+</button>

<div class="quantity full-quantity" style="display: none;">
 <button class="qty-btn-minus" onclick="changeQty(this, -1)">-</button>
  <input type="text" class="qty-display" value="1" readonly />
  <button class="qty-btn" onclick="changeQty(this, 1)">+</button>
</div>

        </div>
      </div>
    `;

    cardContainer.appendChild(card);
  });

const dishes = [
  {
    name: "Home made pizza",
    price: 190,
    image: "../Assets/pizza1.jpeg",
    discount: false,
    rating: "4.7",
    time: "50-79 min"
  },
  {
    name: "Tandoori Chicken",
    price: 184,
    image: "../Assets/chicken.jpeg",
    discount: "../Assets/discount1.png",
    rating: "4.7",
    time: "15-29 min"
  },
  {
    name: "Chilli Chicken",
    price: 116,
    image: "../Assets/chicken1.jpeg",
    discount: "../Assets/Discount.png",
    rating: "4.7",
    time: "30-40 min"
  },
  {
    name: "Home made pizza",
    price: 190,
    image: "../Assets/pizza6.jpeg",
    discount: false,
    rating: "4.7",
    time: "50-79 min"
  }
];

const track = document.querySelector('.carousel-track');


dishes.forEach(dish => {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    ${dish.discount ? `<img src="${dish.discount}" alt="discount" class="discount-badge" />` : ''}
    <img src="${dish.image}" alt="${dish.name}" class="pizza-image" />
    
    <div class="card-content">
      <div class="card-header">
        <span class="pizza-title">${dish.name}</span>
        <span class="pizza-price">₹${dish.price}</span>
      </div>
      
      <div class="card-footer">
        <div class="badge-container">
          <span class="badge flat">
            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 24 24" fill="black">
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            ${dish.rating}
          </span>
          <div class="badge time">
            <span>${dish.time}</span>
          </div>
        </div>
<button class="initial-plus" onclick="showQuantity(this)">+</button>

<div class="quantity full-quantity" style="display: none;">
 <button class="qty-btn-minus" onclick="changeQty(this, -1)">-</button>
  <input type="text" class="qty-display" value="1" readonly />
  <button class="qty-btn" onclick="changeQty(this, 1)">+</button>
</div>
      </div>
    </div>
  `;

  track.appendChild(card);
});


const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const cardWidth = 300;
const gap = 30;
const visibleCards = 3;
let position = 0;

const totalCards = document.querySelectorAll(".card").length;
const maxTranslate = -((totalCards - visibleCards) * (cardWidth + gap));

nextBtn.addEventListener("click", () => {
  if (position > maxTranslate) {
    position -= (cardWidth + gap);
    track.style.transform = `translateX(${position}px)`;
  }
});

prevBtn.addEventListener("click", () => {
  if (position < 0) {
    position += (cardWidth + gap);
    track.style.transform = `translateX(${position}px)`;
  }
});


let selectedCard = null;
let selectedName = "";
let selectedPrice = 0;
let selectedImage = "";
let quantity = 1;


document.addEventListener('click', (e) => {
  const card = e.target.closest('.pizza-card, .card');
  if (!card) return;

  if (selectedCard) selectedCard.classList.remove('selected');
  card.classList.add('selected');
  selectedCard = card;

  selectedName = card.querySelector('.pizza-title').innerText;
  selectedPrice = parseInt(card.querySelector('.pizza-price').innerText.replace("₹", ""));
  selectedImage = card.querySelector('img.pizza-image').src;

  const qtyInput = card.querySelector('.qty-display');
  quantity = qtyInput ? parseInt(qtyInput.value) : 1;

  console.log("Selected:", selectedName, selectedPrice, selectedImage, quantity);
});


document.getElementById('requestBtn').addEventListener('click', () => {
  if (!selectedCard) {
    alert("Please select a dish before requesting.");
    return;
  }

  document.getElementById("modalDishName").innerText = selectedName;
  document.getElementById("modalImage").src = selectedImage;
  document.getElementById("modalPrice").innerText = selectedPrice;
  document.getElementById("quantity").innerText = quantity;
  document.getElementById("totalPrice").innerText = selectedPrice * quantity;

  openModal();
});


function submitOrder() {
  alert(`Your order for "${selectedName}" (x${quantity}) has been placed!`);
  closeModal();
}

function openModal() {
  document.getElementById("requestModal").style.display = "flex";
  document.body.classList.add("modal-open"); 
}

function closeModal() {
  document.getElementById("requestModal").style.display = "none";
  document.body.classList.remove("modal-open");
}


const video = document.getElementById('youtubeVideo');
const button = document.getElementById('toggleButton');


video.addEventListener('click', () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

video.addEventListener('play', () => {
  button.style.display = 'none';
});

video.addEventListener('pause', () => {
  button.style.display = 'block';
});

function toggleVideo() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function showQuantity(button) {
  const card = button.closest('.pizza-card, .card');
  const quantityControls = card.querySelector('.full-quantity');

  button.style.display = 'none'; 
  quantityControls.style.display = 'flex'; 
}


function changeQty(button, amount) {
  const cardFooter = button.closest('.card-footer');
  const qtyInput = cardFooter.querySelector('.qty-display');
  let current = parseInt(qtyInput.value);

  current += amount;

  const card = button.closest('.pizza-card, .card');
  const priceSpan = card.querySelector('.pizza-price');


  if (!priceSpan.dataset.basePrice) {
    const originalPrice = parseInt(priceSpan.innerText.replace("₹", ""));
    priceSpan.dataset.basePrice = originalPrice;
  }

  const basePrice = parseInt(priceSpan.dataset.basePrice);

  if (current < 1) {
    qtyInput.value = 1;
    cardFooter.querySelector('.full-quantity').style.display = 'none';
    cardFooter.querySelector('.initial-plus').style.display = 'inline-block';
    priceSpan.innerText = `₹${basePrice}`; 
    return;
  }

  qtyInput.value = current;


  const updatedPrice = basePrice * current;
  priceSpan.innerText = `₹${updatedPrice}`;

  if (card.classList.contains('selected')) {
    quantity = current;
    document.getElementById("quantity").innerText = quantity;
    document.getElementById("totalPrice").innerText = quantity * basePrice;
  }
}

let autoScroll;

function startAutoScroll() {
  autoScroll = setInterval(() => {
    if (position > maxTranslate) {
      position -= (cardWidth + gap);
    } else {
      position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
  }, 5000);
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

startAutoScroll();

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', stopAutoScroll);
  card.addEventListener('mouseleave', startAutoScroll);
});
