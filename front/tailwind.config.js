module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            screens: {
                "max-md": { max: "768px" },
                "max-lg": { max: "1024px" },
                "max-570": { max: "570px" },
                "max-400": { max: "400px" },
            },
            backgroundImage: {
                "background-pattern": "url('/imgs/background.svg')",
            },
            colors: {
                "back-yellow": "#FEED9F",
                "shinhan-red": "#E11A1A",
                "shinhan-blue": "#2173CF",
            },
        },
    },
    plugins: [],
};
