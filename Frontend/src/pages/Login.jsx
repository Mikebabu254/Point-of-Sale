function Login() {
  return (
    <div className="login-container">
        <form className="login-card">
            <h2>🔐 POS Login</h2>
            <input type="text" name="username" placeholder="JohnDoe"/>
            <input type="password" name="password" placeholder="********"/>
            <button type="submit" className="btn-primary">Login</button>
        </form>
    </div>
  );
}

export default Login;