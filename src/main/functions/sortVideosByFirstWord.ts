import * as fs from 'fs';
import * as path from 'path';

export default async function sortVideosByFirstWord(dir: string) {
  // Zielordner
  const targetDir = dir;

  // Interface für Spiel
  interface Game {
    name: string;
    dir: string;
  }
  if (!fs.existsSync(targetDir))
    return { completed: false, message: 'Directory does not exist' };
  // Map für Spiele
  const games = new Map<string, Game>();

  // Über Dateien im Zielordner iterieren
  fs.readdirSync(targetDir).forEach(async (file) => {
    if (file.endsWith('.mp4')) {
      // Spielname extrahieren
      const gameName = file.split(' ')[0];

      // Unterordner für Spiel anlegen, falls nicht vorhanden
      if (!games.has(gameName)) {
        const gameDir = path.join(targetDir, gameName);
        if (!fs.existsSync(gameDir)) fs.mkdirSync(gameDir);
        games.set(gameName, { name: gameName, dir: gameDir });
      }

      // In Spiel-Ordner verschieben
      const game = games.get(gameName)!;
      fs.renameSync(path.join(targetDir, file), path.join(game.dir, file));
    }
  });

  return { completed: true, message: 'Clips Sorted' };
}
