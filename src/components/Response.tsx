import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { green, grey, yellow } from "@mui/material/colors";

interface ResponseProps {
    suggestedWord: string;
    clue: string;
    onLetterClick: (feedback: string) => void;
}

const Response: React.FC<ResponseProps> = ({ suggestedWord, clue, onLetterClick }) => {
    const [feedback, setFeedback] = useState(clue.split(""));
    const [expandedAccordion, setExpandedAccordion] = useState<number | false>(false);
    const [backgroundColors, setBackgroundColors] = useState<string[]>(Array(5).fill(grey[200]));

    const handleClick = (index: number, type: string, color: string) => {
        const newFeedback = [...feedback];
        newFeedback[index] = type;
        setFeedback(newFeedback);
        onLetterClick(newFeedback.join(""));

        const newBackgroundColors = [...backgroundColors];
        newBackgroundColors[index] = color;
        setBackgroundColors(newBackgroundColors);
    };

    const handleChange = (index: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedAccordion(isExpanded ? index : false);
    };

    // This was done intentionally. Just need to set the background color on first render
    useEffect(() => {
        const newBackgroundColors = clue.split("").map((letter) => {
            if (letter === "g") {
                return green[200];
            } else {
                return grey[200];
            }
        });
        setBackgroundColors(newBackgroundColors);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container spacing={1} justifyContent={"center"}>
            <Grid item xs={12}>
                <Typography variant="body1" textAlign={"center"}>
                    Try this word, click on the letters to input response
                </Typography>
            </Grid>
            {suggestedWord.split("").map((letter, index) => (
                <Grid item key={index} xs={2}>
                    <Accordion
                        expanded={expandedAccordion === index}
                        onChange={handleChange(index)}
                    >
                        <AccordionSummary
                            sx={{ height: "4rem", backgroundColor: backgroundColors[index] }}
                        >
                            <Typography textAlign={"center"} width={"100%"} variant="h3">
                                {letter}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: 0 }}>
                            <Stack spacing={1} mt={1}>
                                <Button
                                    variant="outlined"
                                    style={{
                                        backgroundColor: green[200],
                                        height: "4rem",
                                        minWidth: "fit-content",
                                        border: "None",
                                    }}
                                    onClick={() => {
                                        handleClick(index, "g", green[200]);
                                        setExpandedAccordion(false);
                                    }}
                                />
                                <Button
                                    style={{
                                        backgroundColor: yellow[200],
                                        height: "4rem",
                                        minWidth: "fit-content",
                                    }}
                                    onClick={() => {
                                        handleClick(index, "y", yellow[200]);
                                        setExpandedAccordion(false);
                                    }}
                                />
                                <Button
                                    style={{
                                        backgroundColor: grey[200],
                                        height: "4rem",
                                        minWidth: "fit-content",
                                    }}
                                    onClick={() => {
                                        handleClick(index, "x", grey[200]);
                                        setExpandedAccordion(false);
                                    }}
                                />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            ))}
        </Grid>
    );
};

export default Response;
