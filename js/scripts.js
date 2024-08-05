document.addEventListener('DOMContentLoaded', function() {
    const userType = sessionStorage.getItem('userType');

    if (window.location.pathname.includes('available_cars.html')) {
        loadAvailableCars();
    } else if (window.location.pathname.includes('view_booked_cars.html')) {
        loadBookedCars();
    }

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    if (userType === 'agency') {
        document.querySelector('#add-car-form').addEventListener('submit', addCar);
    }
});

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;

    if (form.id === 'customer-register-form') {
        registerUser('register_customer.php', form);
    } else if (form.id === 'agency-register-form') {
        registerUser('register_agency.php', form);
    } else if (form.id === 'login-form') {
        loginUser('login.php', form);
    } else if (form.id === 'rent-car-form') {
        rentCar(form);
    }
}

function registerUser(url, form) {
    const formData = new FormData(form);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        if (data.includes('successful')) {
            window.location.href = 'login.html';
        }
    })
    .catch(error => console.error('Error:', error));
}

function loginUser(url, form) {
    const formData = new FormData(form);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.includes('Invalid') || data.includes('No user found')) {
            alert(data);
        } else {
            const userType = formData.get('user_type');
            sessionStorage.setItem('userType', userType);
            window.location.href = userType === 'customer' ? 'available_cars.html' : 'add_car.html';
        }
    })
    .catch(error => console.error('Error:', error));
}

function addCar(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch('add_car.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        form.reset();
    })
    .catch(error => console.error('Error:', error));
}

function loadAvailableCars() {
    fetch('available_cars.php')
    .then(response => response.json())
    .then(data => {
        const carList = document.querySelector('#car-list');
        carList.innerHTML = '';

        data.forEach(car => {
            const carDiv = document.createElement('div');
            carDiv.classList.add('car');
            carDiv.innerHTML = `
                <h3>${car.model}</h3>
                <p>Vehicle Number: ${car.number}</p>
                <p>Seating Capacity: ${car.capacity}</p>
                <p>Rent Per Day: ${car.rent}</p>
            `;

            if (sessionStorage.getItem('userType') === 'customer') {
                const rentForm = document.createElement('form');
                rentForm.id = 'rent-car-form';
                rentForm.innerHTML = `
                    <input type="hidden" name="car_id" value="${car.id}">
                    <label for="start_date">Start Date:</label>
                    <input type="date" name="start_date" required>
                    <label for="days">Number of Days:</label>
                    <input type="number" name="days" required>
                    <button type="submit">Rent Car</button>
                `;
                carDiv.appendChild(rentForm);
            }
            carList.appendChild(carDiv);
        });
    })
    .catch(error => console.error('Error:', error));
}

function rentCar(form) {
    const formData = new FormData(form);

    fetch('rent_car.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        if (data.includes('successful')) {
            window.location.reload();
        }
    })
    .catch(error => console.error('Error:', error));
}

function loadBookedCars() {
    fetch('view_booked_cars.php')
    .then(response => response.json())
    .then(data => {
        const bookedCarsList = document.querySelector('#booked-cars-list');
        bookedCarsList.innerHTML = '';

        data.forEach(booking => {
            const bookingDiv = document.createElement('div');
            bookingDiv.classList.add('booking');
            bookingDiv.innerHTML = `
                <h3>Car: ${booking.model}</h3>
                <p>Customer Name: ${booking.name}</p>
                <p>Start Date: ${booking.start_date}</p>
                <p>Days: ${booking.days}</p>
            `;
            bookedCarsList.appendChild(bookingDiv);
        });
    })
    .catch(error => console.error('Error:', error));
}
