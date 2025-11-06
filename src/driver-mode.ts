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
            <label for="vehicle-type">Vehicle Type</label>
            <select id="vehicle-type">
              <option value="car">Car</option>
              <option value="suv">SUV</option>
              <option value="van">Van</option>
              <option value="truck">Truck</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="available-seats">Available Seats</label>
            <input type="number" id="available-seats" min="1" max="8" value="4" />
          </div>
          
          <div class="form-group">
            <label for="start-location">Start Location</label>
            <input type="text" id="start-location" placeholder="Enter starting address" />
          </div>
          
          <div class="form-group">
            <label for="end-location">Destination</label>
            <input type="text" id="end-location" placeholder="Enter destination address" />
          </div>
          
          <div class="form-group">
            <label for="departure-time">Departure Time</label>
            <input type="datetime-local" id="departure-time" />
          </div>
          
          <div class="form-group">
            <label for="price-per-seat">Price per Seat ($)</label>
            <input type="number" id="price-per-seat" min="0" step="0.01" placeholder="0.00" />
          </div>
          
          <button class="primary-btn" id="post-ride-btn">Post Ride</button>
        </div>
        
        <div id="driver-results" class="results-container"></div>
      </div>
    `;

    // Add back button handler
    const backBtn = document.querySelector<HTMLButtonElement>('#back-btn')!;
    backBtn.addEventListener('click', () => this.onBack());

    // Add post ride button handler
    const postBtn = document.querySelector<HTMLButtonElement>('#post-ride-btn')!;
    postBtn.addEventListener('click', () => this.postRide());
  }

  private postRide(): void {
    const vehicleType = (document.querySelector<HTMLSelectElement>('#vehicle-type')?.value || '').trim();
    const availableSeats = parseInt(document.querySelector<HTMLInputElement>('#available-seats')?.value || '1');
    const startLocation = (document.querySelector<HTMLInputElement>('#start-location')?.value || '').trim();
    const endLocation = (document.querySelector<HTMLInputElement>('#end-location')?.value || '').trim();
    const departureTime = document.querySelector<HTMLInputElement>('#departure-time')?.value;
    const pricePerSeat = parseFloat(document.querySelector<HTMLInputElement>('#price-per-seat')?.value || '0');

    if (!startLocation || !endLocation) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }

    const results = document.querySelector<HTMLDivElement>('#driver-results')!;
    results.innerHTML = `
      <div class="success-message">
        <p>✅ Ride posted successfully!</p>
        <div class="ride-details">
          <p><strong>Vehicle:</strong> ${vehicleType.toUpperCase()}</p>
          <p><strong>Available Seats:</strong> ${availableSeats}</p>
          <p><strong>Route:</strong> ${startLocation} → ${endLocation}</p>
          ${departureTime ? `<p><strong>Departure:</strong> ${new Date(departureTime).toLocaleString()}</p>` : ''}
          ${pricePerSeat > 0 ? `<p><strong>Price per Seat:</strong> $${pricePerSeat.toFixed(2)}</p>` : ''}
        </div>
      </div>
    `;
  }
}

