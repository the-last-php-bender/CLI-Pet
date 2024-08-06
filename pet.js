// pet.js
import fs from 'fs';
import path from 'path';

class Pet {
  constructor() {
    this.dataFilePath = path.join(__dirname, 'data.json');
  }

  getPetData() {
    return JSON.parse(fs.readFileSync(this.dataFilePath));
  }

  savePetData(data) {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(data));
  }

  createPet(name, type, color) {
    const petData = { name, type, color, mood: 'happy', health: 100 };
    this.savePetData({ pet: petData, mood: 'happy', health: 100 });
    return petData;
  }

  feedPet() {
    const data = this.getPetData();
    data.health = Math.min(100, data.health + 10);
    data.mood = 'happy';
    this.savePetData(data);
  }

  playWithPet() {
    const data = this.getPetData();
    data.health = Math.min(100, data.health + 5);
    data.mood = 'excited';
    this.savePetData(data);
  }

  trainPet() {
    const data = this.getPetData();
    data.health = Math.max(0, data.health - 5);
    data.mood = 'tired';
    this.savePetData(data);
  }
}

export default Pet;
