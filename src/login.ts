import './style.css';

export class LoginScreen {
  private onAuthenticated: () => void;

  constructor(onAuthenticated: () => void) {
    this.onAuthenticated = onAuthenticated;
  }

  public render(): void {
    const app = document.querySelector<HTMLDivElement>('#app')!;

    app.innerHTML = `
      <div class="container">
        <h1>Welcome to RideMatch</h1>
        <p class="subtitle">Sign in to continue or sign up to create a new account.</p>

        <form id="login-form" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />
          </div>

          <button type="submit" class="primary-btn">Log in</button>
        </form>

        <div class="login-footer">
          <p>Don't have an account? <button id="signup-btn" class="signup-btn">Sign up</button></p>
          <p class="error-message" id="login-error" aria-live="polite"></p>
        </div>
      </div>
    `;

    const loginForm = document.querySelector<HTMLFormElement>('#login-form')!;
    const signupBtn = document.querySelector<HTMLButtonElement>('#signup-btn')!;
    const errorDisplay = document.querySelector<HTMLParagraphElement>('#login-error')!;

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = (document.querySelector<HTMLInputElement>('#email')!).value.trim();
      const password = (document.querySelector<HTMLInputElement>('#password')!).value.trim();

      // Minimal front-end validation
      if (!email || !password) {
        errorDisplay.textContent = 'Please enter both email and password.';
        return;
      }

      try {
        localStorage.setItem('rideMatch:userEmail', email);
        errorDisplay.textContent = '';
        this.onAuthenticated();
      } catch (err) {
        console.error('Login failed', err);
        errorDisplay.textContent = 'Login failed. Try again.';
      }
    });

    signupBtn.addEventListener('click', () => {
      // When signup is clicked, show the current start screen (ModeSelection)
      this.onAuthenticated();
    });
  }
}
