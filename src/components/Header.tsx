import SmartToy from "@mui/icons-material/SmartToy";
import { Box, Typography } from "@mui/material";

const Header = () => {
    return (
        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Box mt={1} display="flex" columnGap={2} alignItems="center">
                <SmartToy color="primary" sx={{ fontSize: 60 }} />
                <Typography variant="h1" color="primary">
                    Wordle Bot
                </Typography>
            </Box>
            <Box mt={1}>
                <Typography variant="subtitle1" color="primary">
                    Use these suggestions to help with Wordle
                </Typography>
            </Box>
        </Box>
    );
};

export default Header;
