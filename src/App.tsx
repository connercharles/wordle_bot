import React, { useState, useEffect } from "react";
import { Alert, CircularProgress, Container, Divider, Typography } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Response from "./components/Response";
import History from "./components/History";
import { fetchWordleResult, WordleRequest } from "./api/api";
import NextButton from "./components/NextButton";

const MAX_TRIES = 5;
const CLUE_DEFAULT = "xxxxx";
const WINNER_CLUE = "ggggg";

function App() {
    const [clue, setClue] = useState<string>(CLUE_DEFAULT);
    const [suggestedWord, setSuggestedWord] = useState<string>("");
    const [history, setHistory] = useState<WordleRequest>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [tries, setTries] = useState<number>(0);

    const getNextSuggestion = async (history: WordleRequest) => {
        setLoading(true);
        try {
            const response = await fetchWordleResult(history);
            setSuggestedWord(response.guess);
        } catch (error: any) {
            setError(error.message);
        }
        setLoading(false);
    };

    const handleLetterClick = (letterFeedback: React.SetStateAction<string>) => {
        if (tries <= MAX_TRIES || !gameOver) {
            setClue(letterFeedback);
        }
    };

    const handleNextClick = async () => {
        setTries(tries + 1);
        const updatedHistory = [...history, { word: suggestedWord, clue }];
        setHistory(updatedHistory);
        if (tries <= MAX_TRIES) {
            getNextSuggestion(updatedHistory);
        }
        setClue(clue.replaceAll("y", "x"));
    };

    // initial state
    useEffect(() => {
        getNextSuggestion([]);
    }, []);

    useEffect(() => {
        if (tries >= MAX_TRIES) {
            setGameOver(true);
        }
    }, [tries]);

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
