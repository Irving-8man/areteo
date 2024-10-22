import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        marginBottom: '20px',
    },
    optionWrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: '1px',
        marginBottom: '10px',
    },
    checkboxWrapper: {
        width: '30px',
        textAlign: 'center',
        marginRight: '10px',
    },
    optionInput: {
        flex: 1,
        marginRight: '0px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    removeButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '7px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    addButton: {
        backgroundColor: '#0078ff',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '5px',
    },
    scoreInput: {
        padding: '8px',
        width: '100%',
        marginTop: '5px', 
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    label: {
        marginTop: '10px', 
        fontWeight: 'bold',
        display: 'block', 
    },
    scoreWrapper: {
        marginTop: '20px', 
    }
});

export default function CasillaV() {
    const [options, setOptions] = useState<string[]>(['', '']);
    const [score, setScore] = useState<number | ''>(''); // Manejamos el puntaje como un número
    const styles = useStyles();

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index: number) => {
        if (index >= 2) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    return (
        <div className={styles.container}>
            {options.map((option, index) => (
                <div key={index} className={styles.optionWrapper}>
                    <div className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            checked={true}
                        />
                    </div>
                    <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Opción ${index + 1}`}
                        className={styles.optionInput}
                    />
                    {index >= 2 && (
                        <button
                            onClick={() => removeOption(index)}
                            className={styles.removeButton}
                        >
                            Eliminar
                        </button>
                    )}
                </div>
            ))}
            <button
                onClick={addOption}
                className={styles.addButton}
            >
                Agregar opción
            </button>
            <div className={styles.scoreWrapper}>
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
        </div>
    );
}
