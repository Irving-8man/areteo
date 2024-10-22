import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    marginBottom: '20px',
  },
  scaleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
    
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '10px',
    
  },
  input: {
    width: '50px',
    textAlign: 'center',
    margin: '0 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px',
    
  },
  textInput: {
    width: '100px',
    textAlign: 'center',
    margin: '0 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px',
    
  },
  rangeInput: {
    flexGrow: 1,
    margin: '0 10px',
    
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

export default function Escala() {
  const styles = useStyles();
  const [minValue, setMinValue] = useState(0); // Valor mínimo inicial
  const [maxValue, setMaxValue] = useState(5); // Valor máximo inicial
  const [minLabel, setMinLabel] = useState(''); // Etiqueta para el mínimo
  const [maxLabel, setMaxLabel] = useState(''); // Etiqueta para el máximo
  const [score, setScore] = useState<number | ''>(''); // Puntaje inicial

  const handleMinValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 1 && value < maxValue) { // Restricción: 0 o 1 y menor que maxValue
      setMinValue(value);
    }
  };

  const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 2 && value <= 10 && value > minValue) { // Restricción: entre 2 y 10 y mayor que minValue
      setMaxValue(value);
    }
  };

  const handleMinLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinLabel(event.target.value);
  };

  const handleMaxLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxLabel(event.target.value);
  };

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 1) { // Asegurar que el puntaje sea al menos 1
      setScore(value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.scaleContainer}>
        <select
          value={minValue}
          onChange={handleMinValueChange}
          className={styles.input}
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
        </select>
        <span>to</span>
        <input
          type="number"
          value={maxValue}
          min="2"
          max="10"
          onChange={handleMaxValueChange}
          className={styles.input}
          placeholder="Max"
        />
      </div>

      <div className={styles.labelContainer}>
        <input
          type="text"
          value={minLabel}
          onChange={handleMinLabelChange}
          placeholder="Etiqueta Mínimo"
          className={styles.textInput}
        />
        <input
          type="text"
          value={maxLabel}
          onChange={handleMaxLabelChange}
          placeholder="Etiqueta Máximo"
          className={styles.textInput}
        />
      </div>

      <div className={styles.scaleContainer}>
        {Array.from({ length: maxValue - minValue + 1 }, (_, i) => i + minValue).map((value) => (
          <label key={value} style={{ textAlign: 'center', margin: '0 10px' }}>
            {value}
            <input type="radio" name="escala" value={value} />
          </label>
        ))}
      </div>

      <div className={styles.labelContainer}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>

      <label className={styles.label}>Puntaje:</label>
      <input
        type="number"
        min={1} 
        value={score}
        onChange={handleScoreChange}
        className={styles.scoreInput}
        placeholder="Asigna un puntaje"
        
      />
    </div>
  );
}
