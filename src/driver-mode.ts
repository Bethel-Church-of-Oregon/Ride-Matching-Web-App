import { showMessage } from './utils';

export class DriverMode {
  private onBack: () => void;

  constructor(onBack: () => void) {
    this.onBack = onBack;
  }

  public render(): void {
    const app = document.querySelector<HTMLDivElement>('#app')!;

    app.innerHTML = `
      <div class="container">
        <div class="header-actions">
          <button class="back-btn" id="back-btn">← Back</button>
        </div>
        
        <h1>🚗 Driving a Vehicle</h1>
        <p class="subtitle">Offer rides to passengers</p>
        
        <div class="driver-form">
          <div class="form-group">
            <label for="driver-name">Name</label>
            <input type="text" id="driver-name" placeholder="Enter your name" required />
          </div>
          
          <div class="form-group">
            <label for="driver-phone">Phone</label>
            <input type="tel" id="driver-phone" placeholder="000-000-0000" required />
          </div>
          
          <div class="form-group">
            <label for="driver-email">Email</label>
            <input type="email" id="driver-email" placeholder="you@example.com" required />
          </div>

          <div class="form-group">
            <label for="driver-password">Password</label>
            <input type="password" id="driver-password" placeholder="Create a password" required />
          </div>

          <div class="form-group">
            <label for="driver-password-confirm">Confirm Password</label>
            <input type="password" id="driver-password-confirm" placeholder="Confirm password" required />
          </div>
          
          <div class="form-group">
            <label for="driver-address">Home address</label>
            <input type="text" id="driver-address" placeholder="Enter your home address" required />
          </div>
          
          <div class="form-group">
            <label for="vehicle-type">Vehicle Type</label>
            <select id="vehicle-type" required>
              <option value="">Select...</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="van">Van</option>
              <option value="truck">Truck</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="available-seats">Available Seats</label>
            <input type="number" id="available-seats" min="1" max="8" value="4" required />
          </div>
          
          <div class="form-group">
            <label for="available-days">Available Days</label>
            <div class="checkbox-group">
              <label><input type="checkbox" name="days" value="monday" /> Monday</label>
              <label><input type="checkbox" name="days" value="tuesday" /> Tuesday</label>
              <label><input type="checkbox" name="days" value="wednesday" /> Wednesday</label>
              <label><input type="checkbox" name="days" value="thursday" /> Thursday</label>
              <label><input type="checkbox" name="days" value="friday" /> Friday</label>
              <label><input type="checkbox" name="days" value="saturday" /> Saturday</label>
              <label><input type="checkbox" name="days" value="sunday" /> Sunday</label>
            </div>
          </div>
          
          <button class="primary-btn" id="register-driver-btn">Register Driver</button>
        </div>
        
        <div id="driver-results" class="results-container"></div>
      </div>
    `;

    // Add back button handler
    const backBtn = document.querySelector<HTMLButtonElement>('#back-btn')!;
    backBtn.addEventListener('click', () => this.onBack());

    // Add register button handler
    const registerBtn = document.querySelector<HTMLButtonElement>('#register-driver-btn')!;
    registerBtn.addEventListener('click', () => this.registerDriver());
  }

  private registerDriver(): void {
    const name = (document.querySelector<HTMLInputElement>('#driver-name')?.value || '').trim();
    const phone = (document.querySelector<HTMLInputElement>('#driver-phone')?.value || '').trim();
    const email = (document.querySelector<HTMLInputElement>('#driver-email')?.value || '').trim();
    const address = (document.querySelector<HTMLInputElement>('#driver-address')?.value || '').trim();
    const vehicleType = (document.querySelector<HTMLSelectElement>('#vehicle-type')?.value || '').trim();
    const availableSeats = parseInt(document.querySelector<HTMLInputElement>('#available-seats')?.value || '1');
    const password = (document.querySelector<HTMLInputElement>('#driver-password')?.value || '').trim();
    const passwordConfirm = (document.querySelector<HTMLInputElement>('#driver-password-confirm')?.value || '').trim();

    // Get selected days
    const dayCheckboxes = document.querySelectorAll<HTMLInputElement>('input[name="days"]:checked');
    const selectedDays = Array.from(dayCheckboxes).map(cb => cb.value);

    if (!name || !phone || !email || !address || !vehicleType || selectedDays.length === 0 || !password || !passwordConfirm) {
      showMessage('Please fill in all fields, including password and confirmation', 'error');
      return;
    }

    if (password.length < 6) {
      showMessage('Password must be at least 6 characters long', 'error');
      return;
    }

    if (password !== passwordConfirm) {
      showMessage('Passwords do not match', 'error');
      return;
    }

    const daysText = selectedDays.join(', ');
    const results = document.querySelector<HTMLDivElement>('#driver-results')!;
    results.innerHTML = `
      <div class="success-message">
        <p>✅ Driver information has been registered!</p>
        <div class="ride-details">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Home Address:</strong> ${address}</p>
          <p><strong>Vehicle Type:</strong> ${vehicleType}</p>
          <p><strong>Available Seats:</strong> ${availableSeats}</p>
          <p><strong>Available days:</strong> ${daysText}</p>
        </div>
      </div>
    `;
  }
}

