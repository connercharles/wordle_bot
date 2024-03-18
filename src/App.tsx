import React, { useState, useEffect } from "react";
import { Alert, CircularProgress, Container, Divider, Typography } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Response from "./components/Response";
import History from "./components/History";
import { generate } from "random-words";
import { fetchWordleResult, WordleRequest } from "./api/api";
import NextButton from "./components/NextButton";

const MAX_TRIES = 6;
const CLUE_DEFAULT = "xxxxx";
const WINNER_CLUE = "ggggg";

function App() {
    const [clue, setClue] = useState<string>(CLUE_DEFAULT);
    const [suggestedWord, setSuggestedWord] = useState<string>("");
    const [history, setHistory] = useState<WordleRequest>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [gameOver, setGameOver] = useState<boolean>(false);

    // The api requires a word and a clue to get response,
    // since I don't have a word for the initial state I generated a random word
    useEffect(() => {
        const newWord = generate({ minLength: 5, maxLength: 5, exactly: 1 })[0];
        setSuggestedWord(newWord);
    }, []);

    const handleLetterClick = (letterFeedback: React.SetStateAction<string>) => {
        if (!gameOver) {
            setClue(letterFeedback);
        }
    };

    const handleNextClick = async () => {
        setLoading(true);
        const updatedHistory = [...history, { word: suggestedWord, clue }];
        setHistory(updatedHistory);
        try {
            const response = await fetchWordleResult(updatedHistory);
            setSuggestedWord(response.guess);
        } catch (error: any) {
            setError(error.message);
        }
        setClue(clue.replaceAll("y", "x"));
        setLoading(false);
    };

    useEffect(() => {
        if (history.length >= MAX_TRIES) {
            setGameOver(true);
        }
    }, [history]);

    useEffect(() => {
        if (clue === WINNER_CLUE) {
            setGameOver(true);
        }
    }, [clue]);

    return (
        <Layout>
            <Container maxWidth="sm">
                <Header />
                {history.length > 0 && <History history={history} />}
                <Divider sx={{ margin: "1rem 0" }} />
                {loading ? (
                    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
                        <CircularProgress />
                    </Container>
                ) : (
                    <Response
                        suggestedWord={suggestedWord}
                        clue={clue}
                        onLetterClick={handleLetterClick}
                    />
                )}
                {!gameOver && <NextButton onClick={handleNextClick} loading={loading} />}
                {gameOver && clue === WINNER_CLUE && (
                    <Typography variant="h4" marginTop={"2rem"}>
                        Congrats, you won!
                    </Typography>
                )}
                {error && (
                    <Alert
                        variant="outlined"
                        severity="error"
                        onClose={() => setError("")}
                        sx={{ marginTop: "1rem" }}
                    >
                        {error}
                    </Alert>
                )}
            </Container>
        </Layout>
    );
}

export default App;
