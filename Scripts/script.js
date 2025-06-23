
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
 <!-- Initial "+" button only -->
<button class="initial-plus" onclick="showQuantity(this)">+</button>

<!-- Hidden quantity controls -->
<div class="quantity full-quantity" style="display: none;">
 <button class="qty-btn" onclick="changeQty(this, -1)" style="text-align: center;">-</button>
  <input type="text" class="qty-display" value="1" readonly />
  <button class="qty-btn" onclick="changeQty(this, 1)">+</button>
</div>

        </div>
      </div>
    `;

    cardContainer.appendChild(card);
  });

const track = document.querySelector(".carousel-track");
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

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    if (selectedCard) selectedCard.classList.remove('selected');
    card.classList.add('selected');
    selectedCard = card;

    selectedName = card.querySelector('.pizza-title').innerText;
    selectedPrice = parseInt(card.querySelector('.pizza-price').innerText.replace("₹", ""));
    selectedImage = card.querySelector('img.pizza-image').src;
  });
});

document.getElementById('requestBtn').addEventListener('click', () => {
  if (!selectedCard) {
    alert("Please select a dish before requesting.");
    return;
  }

  quantity = 1;
  document.getElementById("modalDishName").innerText = selectedName;
  document.getElementById("modalImage").src = selectedImage;
  document.getElementById("modalPrice").innerText = selectedPrice;
  document.getElementById("quantity").innerText = quantity;
  document.getElementById("totalPrice").innerText = selectedPrice;

  openModal();

});

function changeQuantity(change) {
  quantity = Math.max(1, quantity + change);
  document.getElementById("quantity").innerText = quantity;
  document.getElementById("totalPrice").innerText = quantity * selectedPrice;
}

function submitOrder() {
  alert(`Your order for "${selectedName}" (x${quantity}) has been placed!`);
  closeModal();
}

function openModal() {
  document.getElementById("requestModal").style.display = "flex";
  document.body.classList.add("modal-open"); // Lock scroll
}

function closeModal() {
  document.getElementById("requestModal").style.display = "none";
  document.body.classList.remove("modal-open"); // Unlock scroll
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
  const card = button.closest('.card-footer');
  card.querySelector('.initial-plus').style.display = 'none';
  card.querySelector('.full-quantity').style.display = 'inline-flex';
}

function changeQty(button, amount) {
  const card = button.closest('.card-footer');
  const qtyInput = card.querySelector('.qty-display');
  let current = parseInt(qtyInput.value);
  current += amount;

  if (current < 1) {
    qtyInput.value = 1;
    card.querySelector('.full-quantity').style.display = 'none';
    card.querySelector('.initial-plus').style.display = 'inline-block';
    return;
  }

  qtyInput.value = current;
}