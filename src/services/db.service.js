import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname

export class JSONDbManager {
    constructor() {
        this.data = [];
        this.fileName = path.join(__dirname, '..', '..', 'db', 'db.json');

        if (!fs.existsSync(this.fileName)) {
            const dirPath = path.dirname(this.fileName);

            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            this.save()
        }

        this.load();
    }

    load() {
        try {
            const fileContent = fs.readFileSync(this.fileName, 'utf-8');
            this.data = JSON.parse(fileContent);

        } catch (error) {
            console.error('Error loading file:', error);
            this.data = [];
        }
        return this.data;
    }

    save() {
        try {

            fs.writeFileSync(this.fileName, JSON.stringify(this.data, null, 4));
            return true;
        } catch (error) {
            console.error('Error saving file:', error);
            return false;
        }
    }

    getPage(url) {
        return this.data.find(e => e.name === url);
    }

    generateId() {
        return this.data.reduce((maxId, page) => Math.max(maxId, page.index), 0) + 1;
    }
}
