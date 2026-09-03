/**
 * Classe Team - Représentation d'une équipe
 */
class Team {
  constructor(id, name, logo, groupIdx) {
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.groupIdx = groupIdx;
    this.stats = {
      pts: 0,
      played: 0,
      bp: 0,      // Buts pour
      bc: 0       // Buts contre
    };
    this.pos = 1; // Position finale
  }

  /**
   * Calcule la différence de buts
   */
  get diff() {
    return this.stats.bp - this.stats.bc;
  }

  /**
   * Réinitialise les statistiques
   */
  reset() {
    this.stats = { pts: 0, played: 0, bp: 0, bc: 0 };
  }

  /**
   * Enregistre un match joué
   * @param {number} goalsFor - Buts marqués
   * @param {number} goalsAgainst - Buts encaissés
   * @param {number} points - Points à ajouter (3, 1, 0)
   */
  recordMatch(goalsFor, goalsAgainst, points) {
    this.stats.played++;
    this.stats.bp += goalsFor;
    this.stats.bc += goalsAgainst;
    this.stats.pts += points;
  }

  /**
   * Retourne un objet pour sérialisation
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      logo: this.logo,
      groupIdx: this.groupIdx,
      stats: this.stats,
      pos: this.pos
    };
  }
}
