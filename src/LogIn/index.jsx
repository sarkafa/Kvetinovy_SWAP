export const LogIn = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`Uzivatel ${user.email} sa zaregistroval`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(`Uzivatel ${user.email} sa prihlasil`);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  return (
    <>
      <div id="modal-signup" className="modal">
        <div className="modal-content">
          <h4>Prihlás sa</h4>
          <form id="signup-form" onSubmit={handleSubmit2}>
            <div className="input-field">
              <input
                type="email"
                id="signup-email"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
              <label for="signup-email">Emailová adresa</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                id="gignup-password"
                required
                onChange={(event) => setPassword(event.target.value)}
              />
              <label for="signup-password">Vaše heslo</label>
            </div>
            <button className="btn">Prihlásiť</button>
          </form>
        </div>
      </div>

      <div id="modal-login" className="modal">
        <div className="modal-content">
          <h4>Zaregistruj sa</h4>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="email"
                id="login-email"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
              <label for="login-email">Emailová adresa</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                id="login-password"
                required
                onChange={(event) => setPassword(event.target.value)}
              />
              <label for="login-password">Zadajte heslo</label>
            </div>
            <button className="btn">Zaregistrovať</button>
          </form>
        </div>
      </div>
    </>
  );
};
