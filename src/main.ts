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
    this.registerServiceWorker();
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

  private async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        
        console.log('[Service Worker] Registered successfully:', registration.scope);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available, prompt user to reload
                console.log('[Service Worker] New version available');
                if (confirm('A new version is available. Reload to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      } catch (error) {
        console.error('[Service Worker] Registration failed:', error);
      }
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RideMatchingApp();
});
