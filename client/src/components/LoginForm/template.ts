export default `
  <h1 class="sign-form__heading sign-in-form__heading">Sign In</h1>

  <div class="form-fields-wrapper sign-in-form-fields-wrapper">
    <div class="form-field">
      <div class="form-field__control">
        <input id="login" name="login" type="text" class="form-field__input" placeholder=" "  />
        <label for="login" class="form-field__label">Login</label>
        <div class="form-field__bar"></div>
      </div>
    </div>

    <div class="form-field">
      <div class="form-field__control">
        <input id="password" name="password" type="password" class="form-field__input" placeholder=" "  />
        <label for="password" class="form-field__label">Password</label>
        <div class="form-field__bar"></div>
      </div>
    </div>

    <div class="signin-error">
      <span></span>
    </div>
  </div>
`;
