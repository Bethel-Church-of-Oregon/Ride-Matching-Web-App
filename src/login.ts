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
          <p class="no-margin"><button type="button" id="forgot-password-btn" class="link-btn">Forgot password?</button></p>
          <p class="no-margin">Don't have an account? <button type="button" id="signup-btn" class="link-btn">Sign up</button></p>
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

    // Forgot password handler
    const forgotBtn = document.querySelector<HTMLButtonElement>('#forgot-password-btn')!;
    forgotBtn.addEventListener('click', () => {
      const emailInput = (document.querySelector<HTMLInputElement>('#email')!).value.trim();
      if (!emailInput) {
        const errorDisplay = document.querySelector<HTMLParagraphElement>('#login-error')!;
        errorDisplay.textContent = 'Please enter your email above to receive a password reset link.';
        return;
      }

      // Simulate password reset flow
      // In a real app this would call an API to send a reset email
      // Clear any previous error
      const errorDisplay = document.querySelector<HTMLParagraphElement>('#login-error')!;
      errorDisplay.textContent = '';
      // Use console/log helper for user feedback
      // Import showMessage if needed; currently using inline message display
      alert(`If an account exists for ${emailInput}, a password reset link has been sent.`);
    });
  }
}
