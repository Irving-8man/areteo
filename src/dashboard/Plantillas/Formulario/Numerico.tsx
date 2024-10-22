import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        marginBottom: '20px',
    },
    input: {
        padding: '8px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
        textAlign: 'left',
        marginBottom: '10px',
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
    }
});

export default function EntradaNumerica() {
    const styles = useStyles();
    const [score, setScore] = useState<number | ''>('');  

    return (
        <div className={styles.container}>
            <input
                type="number"
                placeholder="Introduce un número aquí"
                className={styles.input}
                min="0"
                max="1000"
                step="0.01" 
            />
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
