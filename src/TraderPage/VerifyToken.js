// auth.js
export async function VerifyToken() {
  try {
    const res = await fetch("http://localhost:5000/verifyToken", {
      method: "GET",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("Usertoken")}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return false;   // ✅ server error

    const data = await res.json();
    return data.success === true; // ✅ return true/false
  } catch (err) {
    console.error("VerifyToken error:", err);
    return false; // ✅ fail closed
  }
}
