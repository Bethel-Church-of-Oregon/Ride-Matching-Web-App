import { showMessage } from './utils';
import { registerPassenger } from './api';

export class PassengerMode {
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
        
        <h1>🚶 Looking for a Ride</h1>
        <p class="subtitle">Find available drivers</p>
        
        <div class="passenger-form">
          <div class="form-group">
            <label for="passenger-name">Name</label>
            <input type="text" id="passenger-name" placeholder="Enter your name" required />
          </div>
          
          <div class="form-group">
            <label for="passenger-phone">Phone</label>
            <input type="tel" id="passenger-phone" placeholder="000-000-0000" required />
          </div>
          
          <div class="form-group">
            <label for="passenger-email">Email</label>
            <input type="email" id="passenger-email" placeholder="you@example.com" required />
          </div>

          <div class="form-group">
            <label for="passenger-password">Password</label>
            <input type="password" id="passenger-password" placeholder="Create a password" required />
          </div>

          <div class="form-group">
            <label for="passenger-password-confirm">Confirm Password</label>
            <input type="password" id="passenger-password-confirm" placeholder="Confirm password" required />
          </div>
          
          <div class="form-group">
            <label for="passenger-address">Home address</label>
            <input type="text" id="passenger-address" placeholder="Enter your home address" required />
          </div>
          
          <div class="form-group">
            <label for="passenger-count">Number of passengers needed</label>
            <input type="number" id="passenger-count" min="1" max="8" value="1" required />
          </div>
          
          <button class="primary-btn" id="register-passenger-btn">Register Passenger</button>
        </div>
        
        <div id="rides-results" class="results-container"></div>
      </div>
    `;

    // Add back button handler
    const backBtn = document.querySelector<HTMLButtonElement>('#back-btn')!;
    backBtn.addEventListener('click', () => this.onBack());

    // Add register button handler
    const registerBtn = document.querySelector<HTMLButtonElement>('#register-passenger-btn')!;
    registerBtn.addEventListener('click', () => this.registerPassenger());
  }

  private async registerPassenger(): Promise<void> {
    const name = (document.querySelector<HTMLInputElement>('#passenger-name')?.value || '').trim();
    const phone = (document.querySelector<HTMLInputElement>('#passenger-phone')?.value || '').trim();
    const email = (document.querySelector<HTMLInputElement>('#passenger-email')?.value || '').trim();
    const address = (document.querySelector<HTMLInputElement>('#passenger-address')?.value || '').trim();
    const passengerCount = parseInt(document.querySelector<HTMLInputElement>('#passenger-count')?.value || '1');
    const password = (document.querySelector<HTMLInputElement>('#passenger-password')?.value || '').trim();
    const passwordConfirm = (document.querySelector<HTMLInputElement>('#passenger-password-confirm')?.value || '').trim();

    if (!name || !phone || !email || !address || !password || !passwordConfirm) {
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

    const results = document.querySelector<HTMLDivElement>('#rides-results')!;
    results.innerHTML = '<p>Registering...</p>';

    try {
      const response = await registerPassenger({
        name,
        phone,
        email,
        password,
        address,
        passengerCount
      });

      results.innerHTML = `
        <div class="success-message">
          <p>✅ Passenger information has been registered!</p>
          <div class="ride-details">
            <p><strong>Name:</strong> ${response.name}</p>
            <p><strong>Phone:</strong> ${response.phone}</p>
            <p><strong>Email:</strong> ${response.email}</p>
            <p><strong>Home Address:</strong> ${response.address}</p>
            <p><strong>Passengers needed:</strong> ${response.passengerCount} passengers</p>
          </div>
        </div>
      `;
      showMessage('Successfully registered!', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to register';
      results.innerHTML = `<p class="error-message">${errorMessage}</p>`;
      showMessage(errorMessage, 'error');
    }
  }
}

