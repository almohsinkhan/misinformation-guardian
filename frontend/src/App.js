import React, { useState } from 'react';
import { Container, Grid, Tabs, Tab } from '@mui/material';
import CheckForm from './components/CheckForm';
import ResultsDisplay from './components/ResultsDisplay';
import LessonQuiz from './components/LessonQuiz';
import { useTranslation } from 'react-i18next';
import './App.css';  // Add basic CSS if needed

function App() {
  const { t } = useTranslation();
  const [results, setResults] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleResults = (data) => {
    setResults(data);
    setTabValue(0);  // Switch to results tab
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <h1>{t('appTitle')}</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {/* Left Pane: Input */}
          <CheckForm onResults={handleResults} />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Right Pane: Results / Teach Me */}
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Results" />
            <Tab label={t('teachMe')} />
          </Tabs>
          {tabValue === 0 && <ResultsDisplay results={results} />}
          {tabValue === 1 && <LessonQuiz lesson={results?.lesson_md} />}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;