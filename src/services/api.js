const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, payload) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Submission failed. Please try again.");
  }

  return data;
}

export const submitJoin = (payload) => request("/join", payload);
export const submitSupport = (payload) => request("/support", payload);
export const submitContact = (payload) => request("/contact", payload);
export const submitDonationInterest = (payload) =>
  request("/donate-interest", payload);
