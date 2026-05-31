# TasteFind — Restaurant Discovery & Reservation Platform
## COS10005 Web Development, Assignment 2, Semester 1 2026 by Kelly Sutopo (104475686)
---

## WEBSITE STRUCTURE

assignment2/
├── index.html
├── restaurants.html
├── recommend.html
├── register.html
├── reservation.html
│
├── css/
│ └── style.css
│
├── js/
│ └── script.js
│
├── images/
│ ├── logo.png
│ ├── logo-white.png
│ ├── favicon.png
│ ├── hero-food.jpeg
│ ├── cta-dining.jpeg
│ ├── attica.jpg
│ ├── flower-drum.jpg
│ ├── tipo-00.jpg
│ ├── chin-chin.jpg
│ ├── supernormal.jpg
│ ├── vue-de-monde.jpg
│ ├── stokehouse.jpg
│ └── minamishima.jpg
│
└── README.md

---

## GITHUB REPOSITORY LINK

https://github.com/kelly-eugenia/assignment2

---

## JAVASCRIPT VALIDATION LOGIC

### REGISTRATION FORM (register.html)

---

The form is validated when the user clicks "Create Account". Before
checking anything, all previous error messages and red borders are
cleared so the form starts fresh on every attempt.

The following rules are checked/validated against:

- Username: Must not be empty. - Must be at least 5 characters long. - May only contain letters, numbers, and underscores (no spaces or special characters) (matched using regex).
- Email Address: Must not be empty. - Must follow a valid email format (contains "@" and a domain) (matched using regex).
- Phone Number: Must not be empty. - After stripping any spaces or dashes, must contain between 8 and 15 digits.
- Password: Must not be empty. - Must be at least 10 characters long. - Must contain at least one uppercase letter, one lowercase letter, one number, and one special character (matched using regex).
- Confirm Password: Must not be empty. - Must exactly match the Password field.
- Gender: At least one gender option must be selected.

If any rule fails, an error message appears directly below the invalid input field in red, and the input is highlighted with a red border. The form will not be submitted until all errors are resolved.

---

### RESERVATION FORM (reservation.html)

---

The form is validated when the user clicks "Confirm Reservation". Same as registration form, all previous errors are cleared before re-checking.

The following rules are checked/validated against:

- Full Name: Must not be empty.
- Email Address: Must not be empty. - Must follow a valid email format (matched using regex).
- Phone Number: Must not be empty. - Must contain at least 10 digits.
- Restaurant: A restaurant must be selected from the dropdown.
- Date: Must not be empty. - Must not be a date in the past. As extra protection, today's date is set as the minimum selectable date when the page loads (in init).
- Time: Must not be empty.
- Number of Guests: Must not be empty. - Must be at least 1.
- Deposit Payment Method: Either Voucher or Online Payment must be selected.
- If Online Payment is selected: - A card type must be chosen. - The card number must not be empty. - Visa and Mastercard numbers must be exactly 16 digits. - American Express numbers must be exactly 15 digits. - Only digits are counted (spaces and dashes are ignored).
- Billing Email: Must not be empty. - Must follow a valid email format (matched using regex). - If the "Same as email address above" checkbox is ticked, this field is automatically filled in and locked.

Errors appear inline below each field. The form will not submit until all errors are resolved.

---

### RECOMMENDATION ENGINE (recommend.html)

---

When the user clicks "Find My Restaurant", the engine reads the three selected filters and checks each restaurant against all three.

1. Dietary Preference - If "No Preference" is selected, all restaurants pass. Otherwise, only restaurants that explicitly support the chosen dietary option (Vegan, Vegetarian, or Halal) are included.

2. Budget Per Person - Only restaurants whose price tier matches the selected budget range (Under $50 / $50–$100 / $100–$200 / $200 and above) pass.

3. Dining Purpose - Only restaurants listed as suitable for the chosen occasion (Family Dinner, Romantic Date, Business Meal, Casual Dining, or Special Occasion) pass.

All three filters must be satisfied. A restaurant that fails any one of them is excluded.
Restaurants that pass all three are then sorted by their rating (highest first) so the best-rated match appears at the top.

Matching restaurants are displayed as selectable cards, with the first card being pre-selected. Clicking a different card updates the "Book Selected Restaurant" button to link to that restaurant's reservation page. Clicking "View full details" on any card opens the restaurant modal.

If no restaurants satisfy all three filters simultaneously, a "no results" message is shown.

---

### DYNAMIC BEHAVIOURS (reservation.html)

---

- Deposit Amount: updates automatically when a restaurant is selected from the dropdown, pulling the deposit value from the restaurant data defined in script.js.

- Payment Fields: when "Voucher" is selected, the voucher code field appears and the card fields are hidden. When "Online Payment" is selected, the card type and number fields appear and the voucher field is hidden. When the form is reset, both sections return to hidden.

- Billing Email: ticking "Same as email address above" copies the email address entered in the Contact Details section into the Billing Email field and makes it read-only. Unticking it clears the field and makes it editable again.

- URL Pre-fill: if the page is reached by clicking a Reserve button on another page (e.g. from the home, restaurants or recommendation page), the restaurant is automatically pre-selected in the dropdown and the deposit amount is updated accordingly.

---

### RESTAURANT MODAL (restaurants.html, recommend.html)

---

A modal is a pop-up window that appears on top of the page. The same modal is reused for every restaurant card.

The modal consists of two elements in the HTML: #restaurantModal (the modal card itself) and #scrnOverlay (a dark semi-transparent layer that covers the rest of the page behind the modal to prevent other interactions)

Both start hidden: the modal has display: none and the overlay has visibility: hidden in the CSS.

---
_Opening the modal_

On the restaurants page, each restaurant card has a "View full details" button. When clicked, the showRestaurantModal() function runs and is given the card element as its input.

The function reads all the restaurant information stored in the card's data attributes (name, cuisine, rating, address, description, dishes, deposit, etc.) and uses them to build the HTML content of the modal.

Once the content is built, the function:

1. Sets the modal's display to "block" so it becomes visible
2. Sets the overlay's visibility to "visible" so the dark background appears
3. Locks the page scroll (document.body.style.overflow = "hidden") so the user cannot scroll the background while the modal is open

On the recommendation page, result cards are created dynamically by JavaScript after the form is submitted. Each card's "View full details" button is wired up in the same way with the modal invocation at the time the card is created.

---
_Closing the modal_

The hideRestaurantModal() function reverses everything:

1. Sets the modal's display back to "none"
2. Sets the overlay's visibility back to "hidden"
3. Restores page scrolling

The function is attached to onclick events of clicking the Modal Close (x) button and clicking anywhere on the screen overlay behind the modal.

---

## KNOWN ISSUES / LIMITATIONS

None identified.

---

## REFERENCES

Fonts

- Cormorant Garamond and DM Sans via Google Fonts
  https://fonts.google.com

Icons

- Font Awesome (Free tier)
  https://fontawesome.com

Images

- Hero image (hero-food.jpeg):
  Adobe Stock — Roasted pumpkin dish with greens on restaurant table
  https://stock.adobe.com/images/roasted-pumpkin-dish-with-greens-on-beautifully-set-restaurant-table-with-flowers-candles-and-wine-glass-in-warm-evening-light/2009888421

- CTA banner image (cta-dining.jpeg):
  Adobe Stock — Cheerful friends enjoying Mexican food in restaurant
  https://stock.adobe.com/images/cheerful-friends-enjoying-in-mexican-food-in-restaurant/733466101

- Attica (attica.jpg):
  Instagram @attica_restaurant
  https://www.instagram.com/p/CFyAyJUgYL8/

- Flower Drum (flower-drum.jpg):
  Time Out Melbourne, photograph by Graham Denholm
  https://www.timeout.com/melbourne/restaurants/flower-drum

- Tipo 00 (tipo-00.jpg):
  Concrete Playground Melbourne
  https://concreteplayground.com/melbourne/restaurants/tipo-00

- Chin Chin (chin-chin.jpg):
  What's On Melbourne
  https://whatson.melbourne.vic.gov.au/eat-and-drink/chin-chin

- Supernormal (supernormal.jpg):
  Broadsheet — New England Lobster Roll, photograph by Mark Roper
  https://www.broadsheet.com.au/national/food-and-drink/article/broadsheet-cookbook-supernormals-new-england-lobster-roll

- Vue de Monde (vue-de-monde.jpg):
  Concrete Playground Melbourne
  https://concreteplayground.com/melbourne/restaurants/vue-de-monde

- Stokehouse (stokehouse.jpg):
  Stokehouse official website
  https://stokehouse.com.au/melbourne/

- Minamishima (minamishima.jpg):
  TripAdvisor
  https://www.tripadvisor.com.au/Restaurant_Review-g635736-d7314896-Reviews-Minamishima-Richmond_Yarra_Greater_Melbourne_Victoria.html
