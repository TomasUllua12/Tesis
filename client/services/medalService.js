// Client/services/medalService.js
export async function claimMedal(medalKey) {
    const token = localStorage.getItem("token");
    const resp = await fetch("http://localhost:5000/api/claim-medal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ medalKey }),
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.message || "Error al reclamar medalla");
    }
    return await resp.json();
  }
  