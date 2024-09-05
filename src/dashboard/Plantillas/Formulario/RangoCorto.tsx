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
});

export default function Rango() {
  const styles = useStyles();
  const [value, setValue] = useState(5); // Valor inicial

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10));
  };

  return (
    <div className={styles.container}>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={handleRangeChange}
        className={styles.rangeInput}
      />
      <div className={styles.rangeValue}>Valor seleccionado: {value}</div>
    </div>
  );
}
