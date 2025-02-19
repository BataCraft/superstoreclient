/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		colors:{
			primaryColor : {
				DEFAULT : "#df4a4a",
			},
			secondaryColor : "#fafafa",
			assentColor: "#283138",
			textColor: "#283138",
			textNormal : "#b3b3b3",
			blueColor: "#0062bd",
			hoverPrimaryColor : "#E56D6D",
		},
		fontFamily:{
			para:["Open Sans", "serif"],
		},

		keyframes: {
			fadeIn: {
			  '0%': { opacity: '0' },
			  '100%': { opacity: '1' },
			},
			slideInLeft: {
			  '0%': { transform: 'translateX(-100%)', opacity: '0' },
			  '100%': { transform: 'translateX(0)', opacity: '1' },
			},
			slideInRight: {
			  '0%': { transform: 'translateX(100%)', opacity: '0' },
			  '100%': { transform: 'translateX(0)', opacity: '1' },
			},
		  },
		  animation: {
			fadeIn: 'fadeIn 0.5s ease-out',
			slideInLeft: 'slideInLeft 0.5s ease-out',
			slideInRight: 'slideInRight 0.5s ease-out',
		  },
		
  	
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
