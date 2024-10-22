import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    marginBottom: '20px',
  },
  rangeInput: {
    width: '100%',
    margin: '10px 0',
  },
  rangeValue: {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '16px',
  },
  scoreInput: {
    padding: '8px',
    width: '100%',
    marginTop: '5px',  
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  label: {
    fontWeight: 'bold',
  },
});

export default function RangoLargo() {
  const styles = useStyles();
  const [value, setValue] = useState(50); // Valor inicial
  const [score, setScore] = useState<number | ''>('');  // Manejamos el puntaje como un número

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10));
  };

  return (
    <div className={styles.container}>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleRangeChange}
        className={styles.rangeInput}
      />
      <div className={styles.rangeValue}>Valor seleccionado: {value}</div>
      <label className={styles.label}>Puntaje:</label>
      <input
        type="number"
        min={1}  
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}  
        className={styles.scoreInput}
        placeholder="Asigna un puntaje"
      />
    </div>
  );
}
