import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const CheckForm = ({ onResults }) => {
  const { t, i18n } = useTranslation();
  const [text, setText] = useState('');
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/v1/check', { text, lang });
      onResults(response.data);
    } catch (err) {
      setError('Error checking: ' + err.message);
    }
    setLoading(false);
  };

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <TextField
        label={t('pasteText')}
        multiline
        rows={4}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>{t('language')}</InputLabel>
        <Select value={lang} onChange={handleLangChange}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="hi">Hindi</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : t('checkButton')}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default CheckForm;