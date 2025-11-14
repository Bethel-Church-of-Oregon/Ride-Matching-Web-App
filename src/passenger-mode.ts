import { showMessage } from './utils';

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
            <input type="email" id="passenger-email" placeholder="example@email.com" required />
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

  private registerPassenger(): void {
    const name = (document.querySelector<HTMLInputElement>('#passenger-name')?.value || '').trim();
    const phone = (document.querySelector<HTMLInputElement>('#passenger-phone')?.value || '').trim();
    const email = (document.querySelector<HTMLInputElement>('#passenger-email')?.value || '').trim();
    const address = (document.querySelector<HTMLInputElement>('#passenger-address')?.value || '').trim();
    const passengerCount = parseInt(document.querySelector<HTMLInputElement>('#passenger-count')?.value || '1');

    if (!name || !phone || !email || !address) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    const results = document.querySelector<HTMLDivElement>('#rides-results')!;
    results.innerHTML = `
      <div class="success-message">
        <p>✅ Passenger information has been registered!</p>
        <div class="ride-details">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Home Address:</strong> ${address}</p>
          <p><strong>Passengers needed:</strong> ${passengerCount} passengers</p>
        </div>
      </div>
    `;
  }
}

