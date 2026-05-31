/* ==========================
   RESTAURANT CARD MODAL
============================= */

function showRestaurantModal(card) {
  var restaurantModal = document.getElementById("restaurantModal");
  var scrnOverlay = document.getElementById("scrnOverlay");
  if (!restaurantModal || !scrnOverlay) return;

  var dishes = [];
  try {
    dishes = JSON.parse(card.getAttribute("data-dishes") || "[]");
  } catch (e) {}

  var dishesHtml = "";
  for (var i = 0; i < dishes.length; i++) {
    dishesHtml +=
      "<li><span>" +
      dishes[i].name +
      '</span><span class="dish-price">' +
      dishes[i].price +
      "</span></li>";
  }

  var editorBadge =
    card.getAttribute("data-editor-pick") === "true"
      ? '<span class="editor-pick-badge"><i class="fa-solid fa-star"></i> Editor\'s Choice</span>'
      : "";

  document.querySelector("#restaurantModal .modal-body").innerHTML =
    '<div class="landscape-img-wrap">' +
    '<img src="' +
    card.getAttribute("data-img-src") +
    '" alt="' +
    card.getAttribute("data-img-alt") +
    '" />' +
    '<span class="cuisine-tag">' +
    card.getAttribute("data-cuisine") +
    "</span>" +
    editorBadge +
    "</div>" +
    '<div class="restaurant-info">' +
    '<div class="restaurant-meta">' +
    '<span class="rating"><i class="fa-solid fa-star"></i> ' +
    card.getAttribute("data-rating") +
    "</span>" +
    '<span class="price-range">' +
    card.getAttribute("data-price-range") +
    "</span>" +
    "</div>" +
    "<h2>" +
    card.getAttribute("data-name") +
    "</h2>" +
    '<address><i class="fa-solid fa-location-dot"></i>' +
    card.getAttribute("data-address") +
    "</address>" +
    "<p>" +
    card.getAttribute("data-description") +
    "</p>" +
    '<p class="dishes-label"><i class="fa-solid fa-utensils"></i> Signature Dishes</p>' +
    "<ul>" +
    dishesHtml +
    "</ul>" +
    '<div class="restaurant-card-actions">' +
    '<span class="deposit-badge"><i class="fa-solid fa-coins"></i> Deposit: ' +
    card.getAttribute("data-deposit") +
    "</span>" +
    '<div style="display:flex;align-items:center;gap:12px;">' +
    '<p class="avg-price">Avg. <strong>' +
    card.getAttribute("data-avg-price") +
    "</strong> / person</p>" +
    '<a href="' +
    card.getAttribute("data-reservation-url") +
    '" class="btn btn-primary btn-sm">Reserve a Table</a>' +
    "</div>" +
    "</div>" +
    "</div>";

  restaurantModal.style.display = "block";
  scrnOverlay.style.visibility = "visible";
  document.body.style.overflow = "hidden";
}

function hideRestaurantModal() {
  var restaurantModal = document.getElementById("restaurantModal");
  var scrnOverlay = document.getElementById("scrnOverlay");
  if (!restaurantModal || !scrnOverlay) return;

  restaurantModal.style.display = "none";
  scrnOverlay.style.visibility = "hidden";
  document.body.style.overflow = "";
}

/* =========================
   RECOMMENDATION ENGINE 
============================ */

var restaurantData = [
  {
    id: "attica",
    name: "Attica",
    cuisine: "Contemporary Australian",
    suburb: "Ripponlea",
    rating: "4.9",
    priceRange: "$$$$",
    editorPick: true,
    imgSrc: "images/attica.jpg",
    imgAlt: "A beautifully plated native ingredient dish at Attica, Ripponlea",
    address: "74 Glen Eira Rd, Ripponlea VIC 3185",
    description:
      "Consistently ranked among the world's 50 best restaurants, Attica is Ben Shewry's extraordinary tribute to Australia's native landscape. Each dish draws on foraged ingredients, indigenous botanicals, and seasonal produce to craft a tasting menu that is as much cultural experience as it is a meal.",
    dishes: [
      { name: "Full tasting menu", price: "$335 pp" },
      { name: "Matching wine pairing", price: "$235 pp" },
      { name: "Non-alcoholic pairing", price: "$145 pp" },
    ],
    deposit: "$50 per person",
    avgPrice: "$300-$400",
    dietary: ["none"],
    budgets: ["luxury"],
    purposes: ["date", "business", "special"],
    reservationUrl: "reservation.html?restaurant=attica",
  },
  {
    id: "flower-drum",
    name: "Flower Drum",
    cuisine: "Cantonese",
    suburb: "Melbourne CBD",
    rating: "4.8",
    priceRange: "$$$$",
    editorPick: false,
    imgSrc: "images/flower-drum.jpg",
    imgAlt: "Tableside Peking duck carving at Flower Drum, Melbourne CBD",
    address: "17 Market Lane, Melbourne VIC 3000",
    description:
      "Melbourne's most beloved Cantonese institution, Flower Drum has graced Market Lane since 1975. Behind its discreet entrance lies an elegant dining room where immaculate service and time-honoured technique reign supreme. The legendary Peking duck is carved tableside, and steamed dumplings arrive translucent and silken.",
    dishes: [
      { name: "Peking duck (half)", price: "$95" },
      { name: "Har gow - steamed prawn dumplings", price: "$26" },
      { name: "Char siu - barbecued pork", price: "$34" },
    ],
    deposit: "$30 per person",
    avgPrice: "$80-$150",
    dietary: ["none", "halal"],
    budgets: ["premium", "luxury"],
    purposes: ["family", "business", "date", "special"],
    reservationUrl: "reservation.html?restaurant=flower-drum",
  },
  {
    id: "tipo-00",
    name: "Tipo 00",
    cuisine: "Italian",
    suburb: "Melbourne CBD",
    rating: "4.7",
    priceRange: "$$$",
    editorPick: false,
    imgSrc: "images/tipo-00.jpg",
    imgAlt: "Handmade pasta dish at Tipo 00 in Melbourne's CBD",
    address: "361 Little Bourke St, Melbourne VIC 3000",
    description:
      "Named after the finely milled flour at the heart of great pasta, Tipo 00 has redefined Italian dining in Melbourne. Chef Andreas Papadakis crafts housemade pasta with quiet precision, from the signature paccheri braised in rich oxtail to butter-bathed tortellini that melt on the tongue.",
    dishes: [
      { name: "Paccheri amatriciana", price: "$38" },
      { name: "Tortellini burro e salvia", price: "$34" },
      { name: "Tagliatelle al ragu", price: "$36" },
    ],
    deposit: "$25 per person",
    avgPrice: "$60-$90",
    dietary: ["none", "vegetarian", "vegan"],
    budgets: ["mid", "premium"],
    purposes: ["date", "family", "casual"],
    reservationUrl: "reservation.html?restaurant=tipo-00",
  },
  {
    id: "chin-chin",
    name: "Chin Chin",
    cuisine: "Southeast Asian",
    suburb: "Melbourne CBD",
    rating: "4.6",
    priceRange: "$$",
    editorPick: false,
    imgSrc: "images/chin-chin.jpg",
    imgAlt:
      "A bold jungle curry and betel leaf dishes at Chin Chin, Flinders Lane",
    address: "125 Flinders Lane, Melbourne VIC 3000",
    description:
      "Chin Chin turned Flinders Lane into a destination with its fearless Southeast Asian cooking and impossibly energetic atmosphere. Bold flavours, fierce jungle curries, fragrant betel leaves, and crispy pork belly arrive quickly and hit hard. Go hungry, go loud, and don't skip the cocktails.",
    dishes: [
      { name: "Jungle curry with beef cheek", price: "$38" },
      { name: "Whole baked snapper", price: "$46" },
      { name: "Crunchy pork hock", price: "$44" },
    ],
    deposit: "$20 per person",
    avgPrice: "$40-$70",
    dietary: ["none", "vegan", "vegetarian"],
    budgets: ["budget", "mid"],
    purposes: ["family", "date", "casual"],
    reservationUrl: "reservation.html?restaurant=chin-chin",
  },
  {
    id: "supernormal",
    name: "Supernormal",
    cuisine: "Pan-Asian",
    suburb: "Melbourne CBD",
    rating: "4.7",
    priceRange: "$$$",
    editorPick: false,
    imgSrc: "images/supernormal.jpg",
    imgAlt: "The iconic New England lobster roll at Supernormal, Flinders Lane",
    address: "180 Flinders Lane, Melbourne VIC 3000",
    description:
      "Andrew McConnell's Supernormal draws effortlessly from the flavours of Japan, China, and Korea, weaving them into a menu that feels both adventurous and satisfying. The New England lobster roll is one of Melbourne's most iconic dishes, while the confit duck fried rice is a perennial crowd favourite.",
    dishes: [
      { name: "New England lobster roll", price: "$44" },
      { name: "Confit duck fried rice", price: "$38" },
      { name: "Japanese milk bread with prawn", price: "$24" },
    ],
    deposit: "$25 per person",
    avgPrice: "$50-$80",
    dietary: ["none"],
    budgets: ["mid", "premium"],
    purposes: ["date", "family", "business", "casual"],
    reservationUrl: "reservation.html?restaurant=supernormal",
  },
  {
    id: "vue-de-monde",
    name: "Vue de Monde",
    cuisine: "Modern Australian",
    suburb: "Melbourne CBD",
    rating: "4.8",
    priceRange: "$$$$",
    editorPick: true,
    imgSrc: "images/vue-de-monde.jpg",
    imgAlt:
      "Panoramic views of Melbourne skyline from Vue de Monde on Level 55",
    address: "Level 55, Rialto Towers, 525 Collins St, Melbourne VIC 3000",
    description:
      "Perched on the 55th floor of the Rialto Towers, Vue de Monde delivers one of the most theatrical fine dining experiences in Australia. The kitchen champions the finest Australian produce, transforming native ingredients into dishes of striking beauty. Whether it's wallaby tartare or Murray cod with native herbs, every course astonishes.",
    dishes: [
      { name: "Signature tasting menu", price: "$295 pp" },
      { name: "Wallaby tartare", price: "Included" },
      { name: "Murray cod, native herbs", price: "Included" },
    ],
    deposit: "$50 per person",
    avgPrice: "$250-$350",
    dietary: ["none"],
    budgets: ["luxury"],
    purposes: ["business", "date", "special"],
    reservationUrl: "reservation.html?restaurant=vue-de-monde",
  },
  {
    id: "stokehouse",
    name: "Stokehouse",
    cuisine: "Modern Australian",
    suburb: "St Kilda",
    rating: "4.7",
    priceRange: "$$$",
    editorPick: false,
    imgSrc: "images/stokehouse.jpg",
    imgAlt: "Panoramic views of Port Phillip Bay from Stokehouse, St Kilda",
    address: "30 Jacka Blvd, St Kilda VIC 3182",
    description:
      "Perched on the St Kilda foreshore with sweeping views of Port Phillip Bay, Stokehouse is one of Melbourne's most iconic dining destinations. The kitchen champions fresh Australian seafood and seasonal produce, delivered with the kind of relaxed confidence that makes every visit feel like a special occasion — whether it's a long Sunday lunch or a sunset dinner.",
    dishes: [
      { name: "Whole roasted snapper", price: "$52" },
      { name: "Bluefin tuna crudo", price: "$28" },
      { name: "King prawn linguine", price: "$42" },
    ],
    deposit: "$30 per person",
    avgPrice: "$80-$120",
    dietary: ["none"],
    budgets: ["premium"],
    purposes: ["date", "family", "special", "casual"],
    reservationUrl: "reservation.html?restaurant=stokehouse",
  },
  {
    id: "minamishima",
    name: "Minamishima",
    cuisine: "Japanese Omakase",
    suburb: "Richmond",
    rating: "4.9",
    priceRange: "$$$$",
    editorPick: true,
    imgSrc: "images/minamishima.jpg",
    imgAlt:
      "Pristine nigiri prepared at the omakase counter at Minamishima, Richmond",
    address: "4 Lord St, Richmond VIC 3121",
    description:
      "Koichi Minamishima's eponymous Richmond counter is widely regarded as Melbourne's finest Japanese dining experience. The intimate omakase journey proceeds through the finest seasonal seafood, including fish flown from Japan's Toyosu Market. Every piece of nigiri reflects obsessive precision with temperature, seasoning, and purity of flavour.",
    dishes: [
      { name: "Omakase dinner menu", price: "$280 pp" },
      { name: "Sake pairing", price: "$120 pp" },
      { name: "Premium sake pairing", price: "$200 pp" },
    ],
    deposit: "$50 per person",
    avgPrice: "$280-$350",
    dietary: ["none"],
    budgets: ["luxury"],
    purposes: ["date", "special", "business"],
    reservationUrl: "reservation.html?restaurant=minamishima",
  },
];

function runRecommendation() {
  var dietary = document.querySelector('input[name="dietary"]:checked').value;
  var budget = document.querySelector('input[name="budget"]:checked').value;
  var purpose = document.querySelector('input[name="purpose"]:checked').value;

  var matches = [];

  for (var i = 0; i < restaurantData.length; i++) {
    var r = restaurantData[i];
    var dietaryOk = false;
    var budgetOk = false;
    var purposeOk = false;

    // Filter based on dietary preferences
    if (dietary === "none") {
      dietaryOk = true;
    } else {
      for (var d = 0; d < r.dietary.length; d++) {
        if (r.dietary[d] === dietary) {
          dietaryOk = true;
          break;
        }
      }
    }

    // Filter based on budget
    for (var b = 0; b < r.budgets.length; b++) {
      if (r.budgets[b] === budget) {
        budgetOk = true;
        break;
      }
    }

    // Filter based on purpose
    for (var p = 0; p < r.purposes.length; p++) {
      if (r.purposes[p] === purpose) {
        purposeOk = true;
        break;
      }
    }

    // If doesn't pass either filter, restaurant not qualified -> not displayed in results
    if (!dietaryOk || !budgetOk || !purposeOk) continue;

    matches.push({ r: r, score: parseFloat(r.rating) });
  }

  matches.sort(function (a, b) {
    return b.score - a.score;
  });
  displayResults(matches);
}

function displayResults(matches) {
  var resultsSection = document.getElementById("recommendResults");
  var resultCards = document.getElementById("resultCards");
  var noResultsMsg = document.getElementById("noResultsMsg");
  var bookingActions = document.getElementById("bookingActions");
  var resultCount = document.getElementById("resultCount");

  resultCards.innerHTML = "";

  if (matches.length === 0) {
    resultCount.innerHTML = "";
    noResultsMsg.style.display = "block";
    bookingActions.style.display = "none";
  } else {
    noResultsMsg.style.display = "none";

    resultCount.innerHTML =
      "Found <strong>" +
      matches.length +
      "</strong> restaurant" +
      (matches.length > 1 ? "s" : "") +
      " matching your preferences.";

    for (var i = 0; i < matches.length; i++) {
      var r = matches[i].r;
      var score = matches[i].score;

      var label = document.createElement("label");
      label.className = "result-card-wrap";

      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "selectedRestaurant";
      radio.value = r.id;
      radio.setAttribute("data-url", r.reservationUrl);
      if (i === 0) radio.checked = true;

      /* Set data attributes via the restaurants dataset */
      var article = document.createElement("article");
      article.className = "restaurant-card";
      article.dataset.name = r.name;
      article.dataset.cuisine = r.cuisine;
      article.dataset.rating = r.rating;
      article.dataset.priceRange = r.priceRange;
      article.dataset.address = r.address;
      article.dataset.description = r.description;
      article.dataset.imgSrc = r.imgSrc;
      article.dataset.imgAlt = r.imgAlt;
      article.dataset.deposit = r.deposit;
      article.dataset.avgPrice = r.avgPrice;
      article.dataset.reservationUrl = r.reservationUrl;
      article.dataset.editorPick = r.editorPick ? "true" : "false";
      article.dataset.dishes = JSON.stringify(r.dishes);

      var bestBadge =
        i === 0 && score >= 4
          ? '<span class="editor-pick-badge">&#10003; Best Match</span>'
          : "";

      article.innerHTML =
        '<div class="landscape-img-wrap">' +
        '<img src="' +
        r.imgSrc +
        '" alt="' +
        r.imgAlt +
        '" />' +
        '<span class="cuisine-tag">' +
        r.cuisine +
        "</span>" +
        bestBadge +
        "</div>" +
        '<div class="restaurant-info">' +
        '<div class="restaurant-meta">' +
        '<span class="rating"><i class="fa-solid fa-star"></i> ' +
        r.rating +
        "</span>" +
        '<span class="price-range">' +
        r.priceRange +
        "</span>" +
        "</div>" +
        "<h3>" +
        r.name +
        "</h3>" +
        '<p class="restaurant-suburb"><i class="fa-solid fa-location-dot" ></i> ' +
        r.suburb +
        "</p>" +
        '<button class="view-details">View full details &rarr;</button>' +
        "</div>";

      /* Attach modal to the view-details button */
      var viewBtn = article.querySelector(".view-details");
      if (viewBtn) {
        viewBtn.onclick = (function (card) {
          return function (e) {
            e.stopPropagation();
            showRestaurantModal(card);
          };
        })(article);
      }

      label.appendChild(radio);
      label.appendChild(article);
      resultCards.appendChild(label);
    }

    document.getElementById("bookingBtn").href = matches[0].r.reservationUrl;
    bookingActions.style.display = "block";
  }

  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth" });
}

/* ===================
   FORM VALIDATION 
====================== */

function showFieldError(id, message) {
  var el = document.getElementById(id);
  if (!el) return;

  el.classList.add("invalid");

  var errSpan = document.createElement("span");
  errSpan.className = "error-msg";
  errSpan.textContent = message;
  el.parentNode.appendChild(errSpan);
}

function clearErrors(formId) {
  var form = document.getElementById(formId);
  if (!form) return;

  var invalids = form.querySelectorAll(".invalid");
  for (var i = 0; i < invalids.length; i++) {
    invalids[i].classList.remove("invalid");
  }

  var errMsgs = form.querySelectorAll(".error-msg");
  for (var i = 0; i < errMsgs.length; i++) {
    errMsgs[i].parentNode.removeChild(errMsgs[i]);
  }
}

/* Registration form validation */
function validateRegister() {
  clearErrors("regForm");

  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var password = document.getElementById("password").value;
  var confirmPwd = document.getElementById("confirmPassword").value;
  var genderMale = document.getElementById("genderMale").checked;
  var genderFemale = document.getElementById("genderFemale").checked;
  var genderOther = document.getElementById("genderOther").checked;
  var genderPrefNot = document.getElementById("genderPreferNot").checked;

  var result = true;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var usernamePattern = /^[a-zA-Z0-9_]+$/;
  var pwdPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+\[\]{}|;':",.<>?]).+$/;
  var phoneDigits = phone.replace(/\D/g, "");

  if (username === "") {
    showFieldError("username", "Username cannot be empty.");
    result = false;
  } else if (username.length < 5) {
    showFieldError("username", "Username must be at least 5 characters.");
    result = false;
  } else if (!username.match(usernamePattern)) {
    showFieldError(
      "username",
      "Username may only contain letters, numbers, and underscores.",
    );
    result = false;
  }

  if (email === "") {
    showFieldError("email", "Email address cannot be empty.");
    result = false;
  } else if (!email.match(emailPattern)) {
    showFieldError("email", "Please enter a valid email address.");
    result = false;
  }

  if (phone === "") {
    showFieldError("phone", "Phone number cannot be empty.");
    result = false;
  } else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    showFieldError("phone", "Phone number must be between 8 and 15 digits.");
    result = false;
  }

  if (password === "") {
    showFieldError("password", "Password cannot be empty.");
    result = false;
  } else if (password.length < 10) {
    showFieldError("password", "Password must be at least 10 characters.");
    result = false;
  } else if (!password.match(pwdPattern)) {
    showFieldError(
      "password",
      "Password must include uppercase, lowercase, a number, and a special character.",
    );
    result = false;
  }

  if (confirmPwd === "") {
    showFieldError("confirmPassword", "Please confirm your password.");
    result = false;
  } else if (password !== "" && confirmPwd !== password) {
    showFieldError("confirmPassword", "Passwords do not match.");
    result = false;
  }

  if (!genderMale && !genderFemale && !genderOther && !genderPrefNot) {
    showFieldError("genderGroup", "Please select a gender.");
    result = false;
  }

  return result;
}

/* Reservation form validation */
function validateReservation() {
  clearErrors("reservationForm");

  var fullName = document.getElementById("fullName").value;
  var resEmail = document.getElementById("resEmail").value;
  var resPhone = document.getElementById("resPhone").value;
  var restaurant = document.getElementById("restaurant").value;
  var resDate = document.getElementById("resDate").value;
  var resTime = document.getElementById("resTime").value;
  var numPeople = document.getElementById("numPeople").value;
  var billingEmail = document.getElementById("billingEmail").value;
  var methodVoucher = document.getElementById("methodVoucher").checked;
  var methodOnline = document.getElementById("methodOnline").checked;

  var result = true;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneDigits = resPhone.replace(/\D/g, "");

  /* Rule 1 — required fields */
  if (fullName === "") {
    showFieldError("fullName", "Full name cannot be empty.");
    result = false;
  }

  if (resEmail === "") {
    showFieldError("resEmail", "Email address cannot be empty.");
    result = false;
  } else if (!resEmail.match(emailPattern)) {
    showFieldError("resEmail", "Please enter a valid email address.");
    result = false;
  }

  if (resPhone === "") {
    showFieldError("resPhone", "Phone number cannot be empty.");
    result = false;
  } else if (phoneDigits.length < 10) {
    showFieldError("resPhone", "Phone number must contain at least 10 digits.");
    result = false;
  }

  if (restaurant === "") {
    showFieldError("restaurant", "Please select a restaurant.");
    result = false;
  }

  /* Rule 2 — date not in past */
  if (resDate === "") {
    showFieldError("resDate", "Please select a reservation date.");
    result = false;
  } else {
    var today = new Date();
    var selected = new Date(resDate);
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      showFieldError("resDate", "Reservation date cannot be in the past.");
      result = false;
    }
  }

  if (resTime === "") {
    showFieldError("resTime", "Please select a reservation time.");
    result = false;
  }

  /* Rule 3 — guests > 0 */
  if (numPeople === "") {
    showFieldError("numPeople", "Number of guests cannot be empty.");
    result = false;
  } else if (parseInt(numPeople) < 1) {
    showFieldError("numPeople", "Number of guests must be at least 1.");
    result = false;
  }

  /* Rule 4 — deposit method must be selected */
  if (!methodVoucher && !methodOnline) {
    showFieldError("paymentGroup", "Please select a deposit payment method.");
    result = false;
  }

  /* Rule 5 — credit card validation */
  if (methodOnline) {
    var cardType = document.getElementById("cardType").value;
    var cardNumber = document
      .getElementById("cardNumber")
      .value.replace(/\D/g, "");

    if (cardType === "") {
      showFieldError("cardType", "Please select a card type.");
      result = false;
    }
    if (cardNumber === "") {
      showFieldError("cardNumber", "Card number cannot be empty.");
      result = false;
    } else if (cardType === "amex" && cardNumber.length !== 15) {
      showFieldError(
        "cardNumber",
        "American Express card number must be 15 digits.",
      );
      result = false;
    } else if (
      (cardType === "visa" || cardType === "mastercard") &&
      cardNumber.length !== 16
    ) {
      showFieldError("cardNumber", "Visa/Mastercard number must be 16 digits.");
      result = false;
    }
  }

  /* Rule 6 — billing email */
  if (billingEmail === "") {
    showFieldError("billingEmail", "Billing email cannot be empty.");
    result = false;
  } else if (!billingEmail.match(emailPattern)) {
    showFieldError(
      "billingEmail",
      "Please enter a valid billing email address.",
    );
    result = false;
  }

  return result;
}

/* Get query string parameter for restaurant selection prefill */
function getUrlParam(name) {
  var search = window.location.search.substring(1);
  var parts = search.split("&");
  for (var i = 0; i < parts.length; i++) {
    var pair = parts[i].split("=");
    if (pair[0] === name) return decodeURIComponent(pair[1] || "");
  }
  return "";
}

/* Update deposit field when restaurant selection changes */
function updateDepositAmount() {
  var restaurantSelect = document.getElementById("restaurant");
  var depositInput = document.getElementById("depositAmount");
  if (!restaurantSelect || !depositInput) return;

  var selectedId = restaurantSelect.value;
  depositInput.value = "";

  for (var i = 0; i < restaurantData.length; i++) {
    if (restaurantData[i].id === selectedId) {
      depositInput.value = restaurantData[i].deposit;
      return;
    }
  }
}

/* Show voucher or card fields based on deposit method */
function togglePaymentMethod() {
  var methodVoucher = document.getElementById("methodVoucher");
  var methodOnline = document.getElementById("methodOnline");
  var voucherGroup = document.getElementById("voucherGroup");
  var cardGroup = document.getElementById("cardGroup");
  if (!methodVoucher || !methodOnline || !voucherGroup || !cardGroup) return;

  voucherGroup.style.display = methodVoucher.checked ? "block" : "none";
  cardGroup.style.display = methodOnline.checked ? "block" : "none";
}

function init() {
  /* Open restaurant modal */
  var cards = document.querySelectorAll(".restaurants-grid .restaurant-card");
  for (var i = 0; i < cards.length; i++) {
    (function (card) {
      var viewBtn = card.querySelector(".view-details");
      if (viewBtn) {
        viewBtn.onclick = function (e) {
          e.stopPropagation();
          showRestaurantModal(card);
        };
      }
    })(cards[i]);
  }

  /* Close modal */
  var modalClose = document.getElementById("modalClose");
  var scrnOverlay = document.getElementById("scrnOverlay");

  if (modalClose) modalClose.onclick = hideRestaurantModal;
  if (scrnOverlay) scrnOverlay.onclick = hideRestaurantModal;

  /* Recommendation form */
  var form = document.getElementById("recommendForm");
  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();
      runRecommendation();
    };
  }
  var resultsSection = document.getElementById("recommendResults");
  if (resultsSection) {
    resultsSection.onchange = function (e) {
      if (e.target && e.target.name === "selectedRestaurant") {
        document.getElementById("bookingBtn").href =
          e.target.getAttribute("data-url");
      }
    };
  }

  /* Registration form */
  var regForm = document.getElementById("regForm");
  if (regForm) regForm.onsubmit = validateRegister;

  /* Reservation form */
  var reservationForm = document.getElementById("reservationForm");
  if (reservationForm) {
    reservationForm.onsubmit = validateReservation;
    reservationForm.onreset = function () {
      document.getElementById("voucherGroup").style.display = "none";
      document.getElementById("cardGroup").style.display = "none";
    };
  }

  /* Set date input minimum to today */
  var resDate = document.getElementById("resDate");
  if (resDate) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1);
    var dd = (today.getDate() < 10 ? "0" : "") + today.getDate();
    resDate.min = yyyy + "-" + mm + "-" + dd;
  }

  /* Pre-fill restaurant from URL parameter and update deposit */
  var restaurantSelect = document.getElementById("restaurant");
  if (restaurantSelect) {
    restaurantSelect.onchange = updateDepositAmount;

    var preselect = getUrlParam("restaurant");
    if (preselect) restaurantSelect.value = preselect;

    updateDepositAmount();
  }

  /* Payment method toggle */
  var methodVoucher = document.getElementById("methodVoucher");
  var methodOnline = document.getElementById("methodOnline");
  if (methodVoucher && methodOnline) {
    methodVoucher.onchange = togglePaymentMethod;
    methodOnline.onchange = togglePaymentMethod;
  }

  /* "Same as email" checkbox for billing email */
  var sameAsEmail = document.getElementById("sameAsEmail");
  if (sameAsEmail) {
    sameAsEmail.onchange = function () {
      var billingEmail = document.getElementById("billingEmail");
      var resEmail = document.getElementById("resEmail");
      billingEmail.value = this.checked ? resEmail.value : "";
      billingEmail.readOnly = this.checked;
    };
  }
}

window.onload = init;
