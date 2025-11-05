export async function login(email, password) {
  // Simulation — à remplacer quand le backend sera prêt
  if (email === "test@gmail.com" && password === "1234") {
    const fakeUser = {
      id: 1,
      firstname: "John",
      email: email,
    };

    const fakeToken = "FAKE_JWT_TOKEN_123";

    localStorage.setItem("user", JSON.stringify(fakeUser));
    localStorage.setItem("token", fakeToken);

    return fakeUser; // ✅ On renvoie l'utilisateur
  }

  // ❌ Si mauvais identifiants :
  throw new Error("Email ou mot de passe incorrect");
}

// ✅ Simulation d'une inscription
export async function register(firstname, lastname, email, password) {
  const newUser = {
    id: Date.now(),
    firstname,
    lastname,
    email,
  };

  console.log("📩 Fake register:", newUser);

  // On peut le connecter direct après inscription si on veut
  localStorage.setItem("user", JSON.stringify(newUser));
  localStorage.setItem("token", "FAKE_REGISTERED_TOKEN");

  return newUser;
}

// ✅ Logout = effacer les infos stockées
export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

// ✅ Savoir si quelqu’un est connecté
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
