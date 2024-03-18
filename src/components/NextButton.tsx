import { Container, Fab } from "@mui/material";
import React from "react";

export interface NextButtonProps {
    onClick: () => void;
    loading: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick, loading }) => {
    return (
        <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}>
            <Fab
                variant="extended"
                disabled={loading}
                color="primary"
                onClick={onClick}
                sx={{ position: "fixed", bottom: "2rem" }}
            >
                Get Next Suggestion
            </Fab>
        </Container>
    );
};

export default NextButton;
