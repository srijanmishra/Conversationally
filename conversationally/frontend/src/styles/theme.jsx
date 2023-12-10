import { createTheme } from '@mui/material/styles';

const primary = '#A8C6F5';
const secondary = '#fcfaeb';
const background = '#343541';

const theme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#343541',
        },
        primary: {
            main: primary,
        },
        secondary: {
            main: secondary,
        },
    },
    typography: {
        fontFamily: '"Poppins"',
        allVariants: {
        color: secondary,
        },
    },
    components: {
        MuiDialog: {
            defaultProps: {
                sx: { //You can copy the code below in your theme
                    // background: '#000',
                    '& .MuiPaper-root': {
                        background: background
                    },
                    // '& .MuiBackdrop-root': {
                    // backgroundColor: 'transparent' // Try to remove this to see the result
                    // }
                }
            }
        }
    }
});

export default theme;