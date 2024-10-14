export function getRandomFruit(): string {
    const fruits = [
        "Mango",
        "Piña",
        "Manzana",
        "Pera",
        "Plátano",
        "Fresa",
        "Uva",
        "Sandía",
        "Durazno",
        "Kiwi",
        "Papaya",
        "Cereza",
        "Naranja",
        "Limón",
        "Melón",
    ];

    const randomIndex = Math.floor(Math.random() * fruits.length);
    return fruits[randomIndex];
}
