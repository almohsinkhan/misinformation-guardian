import React from 'react';
import { Typography, Box, List, ListItem, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useTranslation } from 'react-i18next';

const ResultsDisplay = ({ results }) => {
  const { t } = useTranslation();
  if (!results) return <Typography>{t('loading')}</Typography>;

  const { risk, explanation_md, lesson_md, evidence } = results;

  const handleShare = async () => {
    const input = document.getElementById('report-content');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
    pdf.save('misinfo-report.pdf');
  };

  return (
    <Box id="report-content">
      <Typography variant="h5">{t('riskScore')}: {risk.score}/100 {risk.score >= 70 ? `(${t('highRisk')})` : ''}</Typography>
      <ReactMarkdown>{explanation_md}</ReactMarkdown>
      <Typography variant="h6">Evidence:</Typography>
      <List>
        {evidence.map((ev, i) => (
          <ListItem key={i}>
            <a href={ev.url} target="_blank" rel="noopener noreferrer">{ev.title || ev.source}</a> ({ev.stance})
          </ListItem>
        ))}
      </List>
      <ReactMarkdown>{lesson_md}</ReactMarkdown>
      <Button variant="outlined" onClick={handleShare}>{t('shareReport')}</Button>
    </Box>
  );
};

export default ResultsDisplay;