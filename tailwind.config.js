/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto'],
            },
            colors: {
                primary: '#FFFFFF',
                base_stroke: '#333535',
                base_inputs: '#2A2B31',
                error: '#E76143',
                my_yellow: '#FBE54D',
                my_black: '#161616',
                base_secondary: '#242529',
                disable_text: '#848484',
                tooltip: '#41434E',
            },
        },
        screens: {
            tablet: { max: '1140px' },
            mobile: { max: '890px' },
        },
    },
    plugins: [],
};
