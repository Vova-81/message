export default `
  <h1 class="sign-form__heading sign-up-form__heading">Sign Up</h1>

  <div class="form-fields-wrapper sign-up-form-fields-wrapper">
    <!-- <div class="form-field">
      <div class="form-field__control">
        <input id="email" name="email" type="email" class="form-field__input" placeholder=" "  />
        <label for="email" class="form-field__label">Email</label>
        <div class="form-field__bar"></div>
      </div>
    </div> -->

    <div class="form-field">
      <div class="form-field__control">
        <input id="login" name="username" type="text" class="form-field__input" placeholder=" "  />
        <label for="login" class="form-field__label">Login (username)</label>
        <div class="form-field__bar"></div>
      </div>
    </div>

    <div class="form-field">
      <div class="form-field__control">
        <input id="first_name" name="firstName" type="text" class="form-field__input" placeholder=" "  />
        <label for="first_name" class="form-field__label">Name</label>
        <div class="form-field__bar"></div>
      </div>
    </div>

    <div class="form-field">
      <div class="form-field__control">
        <input id="second_name" name="lastName" type="text" class="form-field__input" placeholder=" "  />
        <label for="second_name" class="form-field__label">Surname</label>
        <div class="form-field__bar"></div>
      </div>
    </div>

    <!-- <div class="form-field">
      <div class="form-field__control">
        <input id="phone" name="phone" type="tel" class="form-field__input" placeholder=" "  />
        <label for="phone" class="form-field__label">Phone</label>
        <div class="form-field__bar"></div>
      </div>
    </div> -->

    <div class="form-field">
      <div class="form-field__control">
        <input id="password" name="password" type="password" class="form-field__input" placeholder=" "  />
        <label for="password" class="form-field__label">Password</label>
        <div class="form-field__bar"></div>
      </div>
    </div>

    <div class="form-field">
      <div class="form-field__control">
        <input id="password_repeat" name="password_repeat" type="password" class="form-field__input" placeholder=" "  />
        <label for="password_repeat" class="form-field__label">Repeat password</label>
        <div class="form-field__bar"></div>
      </div>
    </div>

    <div class="signup-error">
      <span></span>
    </div>
  </div>
`;
