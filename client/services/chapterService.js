// Client/services/chapterService.js
export async function completeChapter(chapterKey) {
    const token = localStorage.getItem("token");
    const resp = await fetch("http://localhost:5000/api/complete-chapter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ chapterKey })
    });
  
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.message || "Error al completar el capítulo");
    }
  
    const { user } = await resp.json();
    // Actualizar el usuario en localStorage
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
  