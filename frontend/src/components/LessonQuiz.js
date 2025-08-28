import React, { useState } from 'react';
import { Typography, Button, Radio, RadioGroup, FormControlLabel, Box } from '@mui/material'; // Add Box here
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

const LessonQuiz = ({ lesson }) => {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleQuizSubmit = () => {
    if (answer === '1') {
      setFeedback(t('quizCorrect'));
    } else {
      setFeedback(t('quizIncorrect'));
    }
  };

  return (
    <Box> {/* Use Box component */}
      <ReactMarkdown>{lesson}</ReactMarkdown>
      <Typography variant="h6">{t('quizQuestion')}</Typography>
      <RadioGroup value={answer} onChange={(e) => setAnswer(e.target.value)}>
        <FormControlLabel value="1" control={<Radio />} label={t('quizOption1')} />
        <FormControlLabel value="2" control={<Radio />} label={t('quizOption2')} />
      </RadioGroup>
      <Button variant="contained" onClick={handleQuizSubmit}>Submit Quiz</Button>
      <Typography>{feedback}</Typography>
    </Box>
  );
};

export default LessonQuiz;