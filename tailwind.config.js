/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "var(--bg-primary)",
        bgSecondary: "var(--bg-secondary)",
        bgTertiary: "var(--bg-tertiary)",
        borderColor: "var(--border-color)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textTertiary: "var(--text-tertiary)",
        brandEmerald: "var(--brand-emerald)",
        brandEmeraldHover: "var(--brand-emerald-hover)",
        googleBlue: "var(--google-blue)",
        googleBlueHover: "var(--google-blue-hover)",
        googleRed: "var(--google-red)",
        googleYellow: "var(--google-yellow)",
        googleGreen: "var(--google-green)",
        accentBlack: "var(--accent-black)",
        statusUrgentBg: "var(--status-urgent-bg)",
        statusUrgentText: "var(--status-urgent-text)",
        statusNormalBg: "var(--status-normal-bg)",
        statusNormalText: "var(--status-normal-text)",
        statusLowBg: "var(--status-low-bg)",
        statusLowText: "var(--status-low-text)",
        statusHighBg: "var(--status-high-bg)",
        statusHighText: "var(--status-high-text)",
        statusProductiveBg: "var(--status-productive-bg)",
        statusProductiveText: "var(--status-productive-text)",
        statusDeepworkBg: "var(--status-deepwork-bg)",
        statusDeepworkText: "var(--status-deepwork-text)",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
