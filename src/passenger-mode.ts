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
            <label for="pickup-location">Pickup Location</label>
            <input type="text" id="pickup-location" placeholder="Enter pickup address" />
          </div>
          
          <div class="form-group">
            <label for="destination">Destination</label>
            <input type="text" id="destination" placeholder="Enter destination address" />
          </div>
          
          <div class="form-group">
            <label for="passenger-count">Number of Passengers</label>
            <input type="number" id="passenger-count" min="1" max="8" value="1" />
          </div>
          
          <div class="form-group">
            <label for="preferred-time">Preferred Time</label>
            <input type="datetime-local" id="preferred-time" />
          </div>
          
          <button class="primary-btn" id="search-rides-btn">Search Available Rides</button>
        </div>
        
        <div id="rides-results" class="results-container"></div>
      </div>
    `;

    // Add back button handler
    const backBtn = document.querySelector<HTMLButtonElement>('#back-btn')!;
    backBtn.addEventListener('click', () => this.onBack());

    // Add search button handler
    const searchBtn = document.querySelector<HTMLButtonElement>('#search-rides-btn')!;
    searchBtn.addEventListener('click', () => this.searchRides());
  }

  private searchRides(): void {
    const pickup = (document.querySelector<HTMLInputElement>('#pickup-location')?.value || '').trim();
    const destination = (document.querySelector<HTMLInputElement>('#destination')?.value || '').trim();
    const passengerCount = parseInt(document.querySelector<HTMLInputElement>('#passenger-count')?.value || '1');
    const preferredTime = document.querySelector<HTMLInputElement>('#preferred-time')?.value;

    if (!pickup || !destination) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }

    const results = document.querySelector<HTMLDivElement>('#rides-results')!;
    results.innerHTML = `
      <div class="success-message">
        <p>🔍 Searching for rides...</p>
        <p class="search-info">From: <strong>${pickup}</strong></p>
        <p class="search-info">To: <strong>${destination}</strong></p>
        <p class="search-info">Passengers: <strong>${passengerCount}</strong></p>
        ${preferredTime ? `<p class="search-info">Time: <strong>${new Date(preferredTime).toLocaleString()}</strong></p>` : ''}
      </div>
    `;
  }
}

