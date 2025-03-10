import type { TikTokApiResponse } from "~~/types/tiktok";

const TIKTOK_API_BASE_URL = "https://open-api.tiktok.com/v2";

export class TikTokApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TikTokApiError";
  }
}

export const createTiktokApi = () => {
  const config = useRuntimeConfig();
  const TIKTOK_CLIENT_KEY = config.public.TIKTOK_CLIENT_KEY;
  const TIKTOK_REDIRECT_URL = config.public.TIKTOK_REDIRECT_URL;

  return {
    async generateCodeChallenge(verifier: string): Promise<string> {
      const encoder = new TextEncoder();
      const data = encoder.encode(verifier);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashBase64 = btoa(String.fromCharCode(...hashArray))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
      return hashBase64;
    },

    async getUserFeed(username: string): Promise<TikTokApiResponse> {
      if (!TIKTOK_CLIENT_KEY) {
        throw new TikTokApiError("TikTok API credentials are not configured");
      }

      try {
        const url = new URL(`${TIKTOK_API_BASE_URL}/video/list`);
        url.searchParams.append("username", username);
        url.searchParams.append("count", "20");

        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TIKTOK_CLIENT_KEY}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new TikTokApiError(
            errorData.message || "Failed to fetch TikTok feed"
          );
        }

        const data: TikTokApiResponse = await response.json();
        return data;
      } catch (error: any) {
        throw new TikTokApiError(
          error.message || "An unexpected error occurred"
        );
      }
    },

    async getAuthUrl(): Promise<void> {
      if (!TIKTOK_CLIENT_KEY || !TIKTOK_REDIRECT_URL) {
        throw new TikTokApiError("TikTok API credentials are not configured");
      }

      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      // Stockez le codeVerifier pour l'utiliser lors de l'échange du token
      console.log("Code Verifier:", codeVerifier);
      console.log("Code Challenge:", codeChallenge);

      const csrfState = Math.random().toString(36).substring(2);
      const clienKey = encodeURIComponent('sbawr83idje4vdr60h');
      const redirectUri = encodeURIComponent(
        "http://localhost:4000/auth/tiktok/callback"
      );
      const scope = encodeURIComponent("user.info.basic,video.list");

      let url = "https://www.tiktok.com/v2/auth/authorize/";

      // the following params need to be in `application/x-www-form-urlencoded` format.
      url += `?client_key=${clienKey}`;
      url += "&scope=user.info.basic";
      url += "&response_type=code";
      url += `&redirect_uri=${redirectUri}`;
      url += "&state=" + csrfState;
      url += "&code_challenge=" + codeChallenge;
      url += "&code_challenge_method=S256";


      // Utilisez l'endpoint et les paramètres conformes aux docs TikTok
      /*  const authUrl =
        `https://www.tiktok.com/auth/authorize/?client_key=${TIKTOK_CLIENT_KEY}` +
        `&redirect_uri=${encodeURIComponent(TIKTOK_REDIRECT_URL)}` +
        `&scope=${encodeURIComponent(scope)}` +
        `&state=${csrfState}` +
        `&response_type=code`; */

      console.info("authUrl", url);

      //  window.location.href = authUrl;
    },
  };

  // Fonction pour générer le code_challenge en utilisant SHA-256
  async function generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashBase64 = btoa(String.fromCharCode(...hashArray))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    return hashBase64;
  }
};

// Fonction pour générer un code_verifier aléatoire
function generateCodeVerifier(length = 128) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let verifier = "";
  for (let i = 0; i < length; i++) {
    verifier += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return verifier;
}
