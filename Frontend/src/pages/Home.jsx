import {Link} from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="logo">💳 POS System</h1>
        <nav>
          <Link to="/login" className="btn-primary">Login</Link>
        </nav>
      </header>

      <main className="home-main">
        <div className="intro">
          <h2>Welcome to Your Point of Sale</h2>
          <p>
            Manage products, process orders, and track sales in one simple
            dashboard.
          </p>
          <Link to="/dashboard" className="btn-secondary">
            Go to Dashboard →
          </Link>
        </div>

        <div className="features">
          <div className="feature-card">
            <h3>🛍 Manage Products</h3>
            <p>Add, edit, and organize your products effortlessly.</p>
          </div>
          <div className="feature-card">
            <h3>📦 Track Orders</h3>
            <p>Stay on top of all customer orders in real-time.</p>
          </div>
          <div className="feature-card">
            <h3>📊 View Sales Reports</h3>
            <p>Analyze sales trends to grow your business.</p>
          </div>
        </div>
      </main>

      <footer className="home-footer">
        <p>© {new Date().getFullYear()} POS System. All rights reserved.</p>
      </footer>
    </div>

  );
}

export default Home;