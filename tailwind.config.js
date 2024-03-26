
import  { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import withMT from "@material-tailwind/react/utils/withMT";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    fontFamily: {
      'poppins': ['Poppins'],
   },
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
 
      colors: {
        primary: "#6499E9",
        // sky: colors.sky,
      },
      screens: {
        mobile: "320px",
        mobileM: "475px",
        mobileL: "580px",
        mobileXL: "640px",
        tablet: "768px",
        tabletL: "962px",
        laptop: "1024px",
        laptopM: "1280px",
      },
     
    },

    screens: {
      mobile: "320px",
      mobileM: "475px",
      mobileL: "580px",
      mobileXL: "640px",
      tablet: "768px",
      tabletL: "962px",
      laptop: "1024px",
      laptopM: "1280px",
    },
  },
  plugins: [],
};
export default withMT(config);