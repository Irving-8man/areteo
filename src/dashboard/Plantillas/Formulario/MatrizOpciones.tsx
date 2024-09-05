import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    marginBottom: '20px',
  },
  gridInput: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  button: {
    margin: '5px',
    padding: '8px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#0078d4',
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#005a9e',
    },
  },
  header: {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  section: {
    marginBottom: '20px',
  },
});

export default function MatrizOpciones() {
  const styles = useStyles();
  const [rows, setRows] = useState<number>(2);
  const [columns, setColumns] = useState<number>(2);
  const [columnLabels, setColumnLabels] = useState<string[]>(Array(columns).fill(''));
  const [rowLabels, setRowLabels] = useState<string[]>(Array(rows).fill(''));

  const handleAddRow = () => {
    setRows(rows + 1);
    setRowLabels([...rowLabels, '']);
  };

  const handleAddColumn = () => {
    setColumns(columns + 1);
    setColumnLabels([...columnLabels, '']);
  };

  const handleRemoveRow = () => {
    if (rows > 1) {
      setRows(rows - 1);
      setRowLabels(rowLabels.slice(0, -1));
    }
  };

  const handleRemoveColumn = () => {
    if (columns > 1) {
      setColumns(columns - 1);
      setColumnLabels(columnLabels.slice(0, -1));
    }
  };

  const handleColumnLabelChange = (index: number, label: string) => {
    const newLabels = [...columnLabels];
    newLabels[index] = label;
    setColumnLabels(newLabels);
  };

  const handleRowLabelChange = (index: number, label: string) => {
    const newLabels = [...rowLabels];
    newLabels[index] = label;
    setRowLabels(newLabels);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.section}>
          <h3>Opciones de Filas:</h3>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <input
              key={`row-label-${rowIndex}`}
              type="text"
              value={rowLabels[rowIndex] || ''}
              onChange={(e) => handleRowLabelChange(rowIndex, e.target.value)}
              placeholder={`Fila ${rowIndex + 1}`}
              className={styles.gridInput}
            />
          ))}
          <div>
            <button onClick={handleAddRow} className={styles.button}>Agregar Fila</button>
            <button onClick={handleRemoveRow} className={styles.button}>Eliminar Fila</button>
          </div>
        </div>
        <div className={styles.section}>
          <h3>Opciones de Columnas:</h3>
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <input
              key={`col-label-${columnIndex}`}
              type="text"
              value={columnLabels[columnIndex] || ''}
              onChange={(e) => handleColumnLabelChange(columnIndex, e.target.value)}
              placeholder={`Columna ${columnIndex + 1}`}
              className={styles.gridInput}
            />
          ))}
          <div>
            <button onClick={handleAddColumn} className={styles.button}>Agregar Columna</button>
            <button onClick={handleRemoveColumn} className={styles.button}>Eliminar Columna</button>
          </div>
        </div>
      </div>
    </div>
  );
}
