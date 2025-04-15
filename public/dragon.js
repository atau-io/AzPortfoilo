window.generateDragon = function () {
    const types = ["Fire", "Ice", "Storm", "Shadow", "Earth", "Crystal"];
    const colors = ["Red", "Blue", "Black", "White", "Green", "Gold"];
    const attacks = ["Flame Breath", "Ice Shard", "Lightning Bolt", "Void Pulse", "Rock Slam", "Blinding Flash"];

    const type = types[Math.floor(Math.random() * types.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const attack = attacks[Math.floor(Math.random() * attacks.length)];
    const hp = Math.floor(Math.random() * 300) + 200;

    const output = `
        <strong>Type:</strong> ${type}<br>
        <strong>Color:</strong> ${color}<br>
        <strong>Special Attack:</strong> ${attack}<br>
        <strong>HP:</strong> ${hp} HP
    `;

    const container = document.getElementById('dragon-output');
    container.innerHTML = output;
    container.style.opacity = 1;
}
