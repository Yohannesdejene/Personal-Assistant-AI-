export const theme = {
  colors: {
    primary: "#6366F1",
    primaryLight: "#818CF8",
    primaryDark: "#4F46E5",
    secondary: "#8B5CF6",
    secondaryLight: "#A78BFA",
    secondaryDark: "#7C3AED",
    white: "#FFFFFF",
    background: "#E5E7EB",
    backgroundLight: "#F3F4F6",
    backgroundDark: "#D1D5DB",
    text: {
      primary: "#1F2937",
      secondary: "#4B5563",
      light: "#9CA3AF",
    },
  },
  gradients: {
    primaryToSecondary: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    primaryLight: "linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)",
    primaryDark: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    full: "9999px",
  },
} as const;

// Type for the theme
export type Theme = typeof theme;

// Helper function to get gradient background
export const getGradientBackground = (
  gradient: keyof typeof theme.gradients
) => {
  return {
    background: theme.gradients[gradient],
  };
};

// Helper function to get color
export const getColor = (color: keyof typeof theme.colors) => {
  return theme.colors[color];
};
