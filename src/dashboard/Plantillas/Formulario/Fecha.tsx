import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        marginBottom: '20px',
    },
    input: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
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

export default function Fecha() {
    const styles = useStyles();
    const [score, setScore] = useState<number | ''>('');  

    return (
        <div className={styles.container}>
            <input type="date" className={styles.input} />
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
