import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import { WordleRequest } from "../api/api";
import { green, grey, yellow } from "@mui/material/colors";

interface HistoryProps {
    history: WordleRequest;
}

function getColor(letter: string) {
    if (letter === "g") {
        return green[200];
    } else if (letter === "y") {
        return yellow[200];
    } else {
        return grey[200];
    }
}

const History: React.FC<HistoryProps> = ({ history }) => {
    return (
        <Container maxWidth="sm" style={{ padding: "0", marginTop: "1rem" }}>
            <Grid container spacing={1}>
                {history.map((item, index) => (
                    <Grid item container spacing={1} key={index} justifyContent={"center"}>
                        {item.word.split("").map((letter, index) => (
                            <Grid key={index} item xs={2}>
                                <Container
                                    sx={{
                                        borderRadius: "4px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "4rem",
                                        display: "flex",
                                        backgroundColor: getColor(item.clue[index]),
                                    }}
                                >
                                    <Typography variant="h3">{letter}</Typography>
                                </Container>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default History;
