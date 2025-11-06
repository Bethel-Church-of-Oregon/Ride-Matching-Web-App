import './style.css';
import { UserMode } from './types';
import { ModeSelection } from './mode-selection';
import { PassengerMode } from './passenger-mode';
import { DriverMode } from './driver-mode';

class RideMatchingApp {
  private modeSelection: ModeSelection;
  private passengerMode: PassengerMode;
  private driverMode: DriverMode;

  constructor() {
    this.passengerMode = new PassengerMode(() => this.showModeSelection());
    this.driverMode = new DriverMode(() => this.showModeSelection());
    this.modeSelection = new ModeSelection((mode) => this.selectMode(mode));
    this.initializeApp();
  }

  private initializeApp(): void {
    this.showModeSelection();
  }

  private showModeSelection(): void {
    this.modeSelection.render();
  }

  private selectMode(mode: UserMode): void {
    if (mode === 'passenger') {
      this.passengerMode.render();
    } else if (mode === 'driver') {
      this.driverMode.render();
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RideMatchingApp();
});
