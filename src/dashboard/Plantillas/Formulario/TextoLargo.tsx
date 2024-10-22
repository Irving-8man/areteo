import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        marginBottom: '20px',
    },
    input: {
        padding: '8px',
        width: '100%',
        height: '100px', 
        border: '1px solid #ccc',
        borderRadius: '4px',
        resize: 'vertical', 
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

export default function TextoLargo() {
    const styles = useStyles();
    const [score, setScore] = useState<number | ''>(''); 

    return (
        <div className={styles.container}>
            <textarea
                placeholder="Escribe tu respuesta aquí"
                maxLength={200} 
                className={styles.input}
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
