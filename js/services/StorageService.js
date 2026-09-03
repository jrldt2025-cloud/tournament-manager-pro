/**
 * Service de persistance localStorage
 */
class StorageService {
  static STORAGE_KEY = 'tournament-pro-data-v2';

  /**
   * Sauvegarde l'état complet du tournoi
   */
  static save(state) {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(this.STORAGE_KEY, serialized);
      return { success: true };
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Charge l'état du tournoi
   */
  static load() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error('Erreur chargement:', error);
      return null;
    }
  }

  /**
   * Exporte le tournoi en JSON
   */
  static export(state) {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tournament-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Importe un tournoi depuis JSON
   */
  static async import(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          resolve(data);
        } catch (error) {
          reject(new Error('Format JSON invalide'));
        }
      };
      reader.onerror = () => reject(new Error('Erreur lecture fichier'));
      reader.readAsText(file);
    });
  }

  /**
   * Efface les données
   */
  static clear() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
