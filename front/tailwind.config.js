module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            screens: {
                "3xl": "1820px",
                "2xl": "1700px",
                "xl": "1600px",
                "l": "1500px",
            },
            backgroundImage: {
                "background-pattern": "url('/imgs/background.svg')",
            },
            backgroundColor: {
                "wood-opacity-50": "rgba(255, 255, 255, 0.4)",
            },
            colors: {
                "back-yellow": "#FEED9F",
                "shinhan-red": "#E11A1A",
                "shinhan-blue": "#2173CF",
                "select-green": "#88C9A1",
                "back-red": "#FDE6EA",
                "back-blue": "#F2F5FC",
                "modal-yellow": "#FDF9EA",
                "back-grey": "#EFF0F6",
                "button-yellow": "#FFD101",
            },
            animation: {
                "spin-fast": "spin 0.3s linear infinite",
            },
        },
    },
    plugins: [],
};
