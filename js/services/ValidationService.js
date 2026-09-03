/**
 * Service de validation des données
 */
class ValidationService {
  /**
   * Valide le nom d'une équipe
   */
  static validateTeamName(name) {
    const trimmed = String(name).trim();
    return trimmed.length >= 2 && trimmed.length <= 50;
  }

  /**
   * Valide un score de match
   */
  static validateScore(score) {
    const num = parseInt(score, 10);
    return !isNaN(num) && num >= 0 && num <= 99 && Number.isInteger(num);
  }

  /**
   * Valide une URL de logo
   */
  static validateLogoURL(url) {
    if (!url) return true; // Optionnel
    try {
      new URL(url);
      return true;
    } catch {
      return url.startsWith('data:image');
    }
  }

  /**
   * Valide la configuration du tournoi
   */
  static validateTournamentConfig(config) {
    const errors = [];

    if (!config.tName || config.tName.trim().length < 3) {
      errors.push("Le nom du tournoi doit contenir au moins 3 caractères.");
    }

    if (config.numTeams < config.numGroups) {
      errors.push("Le nombre d'équipes doit être ≥ au nombre de groupes.");
    }

    if (config.bracketFormat > config.numTeams) {
      errors.push("Le format de phase finale ne peut pas dépasser le nombre d'équipes.");
    }

    // Le format de bracket doit être une puissance de 2
    if (!Number.isInteger(Math.log2(config.bracketFormat))) {
      errors.push("Le format de bracket doit être une puissance de 2 (2, 4, 8, 16, 32...).");
    }

    if (config.numGroups < 1 || config.numGroups > 16) {
      errors.push("Le nombre de groupes doit être entre 1 et 16.");
    }

    return { isValid: errors.length === 0, errors };
  }

  /**
   * Valide une équipe complète
   */
  static validateTeam(team) {
    const errors = [];

    if (!this.validateTeamName(team.name)) {
      errors.push(`Nom invalide: "${team.name}"`);
    }

    if (!Number.isInteger(team.groupIdx) || team.groupIdx < 0) {
      errors.push("Groupe invalide.");
    }

    if (!this.validateLogoURL(team.logo)) {
      errors.push("Logo invalide.");
    }

    return { isValid: errors.length === 0, errors };
  }
}
