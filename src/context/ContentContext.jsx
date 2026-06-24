import { createContext, useContext, useEffect, useState } from "react";
import * as defaults from "../constants/content.js";

const ContentContext = createContext(null);

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export function ContentProvider({ children }) {
  const [content, setContent] = useState({
    party: defaults.party,
    mission: defaults.mission,
    vision: defaults.vision,
    coreObjectives: defaults.coreObjectives,
    workActions: defaults.workActions,
    focusAreas: defaults.focusAreas,
    initiatives: defaults.initiatives,
    supportCategories: defaults.supportCategories,
    interestedAreas: defaults.interestedAreas,
    officeBearers: defaults.officeBearers,
    spokespersons: defaults.spokespersons,
    joinTeams: defaults.joinTeams,
    donationAmounts: defaults.donationAmounts,
    donationPage: defaults.donationPage,
    homePage: defaults.homePage,
    newsPage: defaults.newsPage,
    newsEventSections: defaults.newsEventSections,
    newsItems: defaults.newsItems,
    contact: {
      address: "Office address placeholder, India",
      email: "info@infiindia.org",
      phone: "+91-00000-00000",
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/content`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data) {
          setContent((current) => ({ ...current, ...result.data }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <ContentContext.Provider value={{ ...content, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return ctx;
}
