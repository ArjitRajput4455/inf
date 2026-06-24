const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("inf-admin-token");
}

async function adminRequest(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const adminLogin = (payload) =>
  adminRequest("/auth/login", { method: "POST", body: JSON.stringify(payload) });

export const fetchAdminProfile = () => adminRequest("/auth/me");

export const fetchAdminContent = () => adminRequest("/admin/content");

export const updateAdminContent = (payload) =>
  adminRequest("/admin/content", { method: "PUT", body: JSON.stringify(payload) });

export const resetAdminContent = () =>
  adminRequest("/admin/content/reset", { method: "POST" });

export const uploadLeadershipPhoto = (file) => {
  const formData = new FormData();
  formData.append("photo", file);
  return adminRequest("/admin/upload/leadership-photo", {
    method: "POST",
    body: formData,
  });
};

export const uploadNewsImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return adminRequest("/admin/upload/news-image", {
    method: "POST",
    body: formData,
  });
};

export const uploadNewsVideo = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return adminRequest("/admin/upload/news-video", {
    method: "POST",
    body: formData,
  });
};

export const uploadDonationQr = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return adminRequest("/admin/upload/donation-qr", {
    method: "POST",
    body: formData,
  });
};

export const fetchDashboardStats = () => adminRequest("/admin/stats");

export const fetchDashboardOverview = () => adminRequest("/admin/dashboard");

export const fetchJoinSubmissions = () => adminRequest("/admin/submissions/join");

export const fetchSupportSubmissions = () =>
  adminRequest("/admin/submissions/support");

export const fetchContactSubmissions = () =>
  adminRequest("/admin/submissions/contact");

export const fetchDonationSubmissions = () =>
  adminRequest("/admin/submissions/donations");

export const logoutAdmin = () => localStorage.removeItem("inf-admin-token");

export const isAdminLoggedIn = () => !!getToken();

export const saveAdminToken = (token) => localStorage.setItem("inf-admin-token", token);
