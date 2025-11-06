import './style.css';

// Example TypeScript code
export interface User {
  id: number;
  name: string;
  email: string;
}

class RideMatchingApp {
  constructor() {
    this.initializeApp();
  }

  private initializeApp(): void {
    const app = document.querySelector<HTMLDivElement>('#app')!;
    
    app.innerHTML = `
      <div class="container">
        <h1>🚗 Ride Matching Web App</h1>
        <p>Welcome to your TypeScript-powered ride matching application!</p>
        <button id="demo-btn">Click me!</button>
        <div id="output"></div>
      </div>
    `;

    // Add event listener with proper TypeScript typing
    const button = document.querySelector<HTMLButtonElement>('#demo-btn')!;
    button.addEventListener('click', () => this.handleButtonClick());
  }

  private handleButtonClick(): void {
    const output = document.querySelector<HTMLDivElement>('#output')!;
    const message = `Button clicked at ${new Date().toLocaleTimeString()}`;
    output.innerHTML = `<p class="message">${message}</p>`;
    console.log('Button clicked!', message);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RideMatchingApp();
});
