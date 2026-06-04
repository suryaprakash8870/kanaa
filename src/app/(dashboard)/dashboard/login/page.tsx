import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", width: "100%", maxWidth: 400, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1209", margin: 0 }}>Kanna Dashboard</h1>
          <p style={{ color: "#6b7280", fontSize: 14, marginTop: 6, marginBottom: 0 }}>
            Sign in with your admin account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
