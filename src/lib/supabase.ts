import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://your-project-url.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

if (
  !supabaseUrl ||
  supabaseUrl === "https://your-project-url.supabase.co" ||
  !supabaseAnonKey ||
  supabaseAnonKey === "your-anon-key"
) {
  console.warn(
    "Supabase credentials are missing or using placeholders. Authentication features will not work properly.",
  );
}

// Create a single supabase client instance
let supabase;

if (
  supabaseUrl === "https://your-project-url.supabase.co" ||
  supabaseAnonKey === "your-anon-key"
) {
  // Create a mock client that doesn't throw errors
  supabase = {
    auth: {
      signUp: () =>
        Promise.resolve({
          data: null,
          error: new Error("Using mock Supabase client"),
        }),
      signInWithPassword: () =>
        Promise.resolve({
          data: null,
          error: new Error("Using mock Supabase client"),
        }),
      signOut: () => Promise.resolve({ error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () =>
        Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: (callback) => {
        // Mock implementation of onAuthStateChange
        console.log("Mock onAuthStateChange called");
        // Return an object with data.subscription.unsubscribe method
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
    },
  };
} else {
  // Create the real client
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Export the supabase client
export { supabase };

// Helper functions for authentication
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
};
