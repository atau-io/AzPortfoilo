// dragon.js

const dragonTypes = ["Fire", "Ice", "Storm", "Shadow", "Earth", "Crystal"];
const dragonColors = ["Red", "Blue", "Black", "White", "Green", "Gold"];
const dragonAttacks = [
    "Flame Breath",
    "Ice Shard",
    "Lightning Bolt",
    "Void Pulse",
    "Rock Slam",
    "Blinding Flash"
];

function generateDragon() {
    const type = dragonTypes[Math.floor(Math.random() * dragonTypes.length)];
    const color = dragonColors[Math.floor(Math.random() * dragonColors.length)];
    const attack = dragonAttacks[Math.floor(Math.random() * dragonAttacks.length)];
    const hp = Math.floor(Math.random() * 300) + 200;

    const output = `
        <strong>Type:</strong> ${type}<br>
        <strong>Color:</strong> ${color}<br>
        <strong>Special Attack:</strong> ${attack}<br>
        <strong>HP:</strong> ${hp} HP
    `;

    const container = document.getElementById('dragon-output');
    if (container) {
        container.innerHTML = output;
    }
}// dragon.js

const dragonTypes = ["Fire", "Ice", "Storm", "Shadow", "Earth", "Crystal"];
const dragonColors = ["Red", "Blue", "Black", "White", "Green", "Gold"];
const dragonAttacks = [
    "Flame Breath",
    "Ice Shard",
    "Lightning Bolt",
    "Void Pulse",
    "Rock Slam",
    "Blinding Flash"
];

function generateDragon() {
    const type = dragonTypes[Math.floor(Math.random() * dragonTypes.length)];
    const color = dragonColors[Math.floor(Math.random() * dragonColors.length)];
    const attack = dragonAttacks[Math.floor(Math.random() * dragonAttacks.length)];
    const hp = Math.floor(Math.random() * 300) + 200;

    const output = `
        <strong>Type:</strong> ${type}<br>
        <strong>Color:</strong> ${color}<br>
        <strong>Special Attack:</strong> ${attack}<br>
        <strong>HP:</strong> ${hp} HP
    `;

    const container = document.getElementById('dragon-output');
    if (container) {
        container.innerHTML = output;
    }
}