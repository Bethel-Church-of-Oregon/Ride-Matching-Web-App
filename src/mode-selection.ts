import { UserMode } from './types';

export class ModeSelection {
  private onModeSelected: (mode: UserMode) => void;

  constructor(onModeSelected: (mode: UserMode) => void) {
    this.onModeSelected = onModeSelected;
  }

  public render(): void {
    const app = document.querySelector<HTMLDivElement>('#app')!;
    
    app.innerHTML = `
      <div class="container">
        <h1>🚗 Sign-Up for RideMatch</h1>
        <p class="subtitle">Choose how you want to use RideMatch</p>
        
        <div class="mode-selection">
          <button class="mode-btn passenger-btn" data-mode="passenger">
            <div class="mode-icon">🚶</div>
            <div class="mode-content">
              <h2>Looking for a Ride</h2>
              <p>Find a ride going your way</p>
            </div>
          </button>
          
          <button class="mode-btn driver-btn" data-mode="driver">
            <div class="mode-icon">🚗</div>
            <div class="mode-content">
              <h2>I can offer a ride</h2>
              <p>Share your car and help passengers</p>
            </div>
          </button>
        </div>
      </div>
    `;

    // Add event listeners for mode selection
    const modeButtons = document.querySelectorAll<HTMLButtonElement>('.mode-btn');
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode') as UserMode;
        this.onModeSelected(mode);
      });
    });
  }
}

