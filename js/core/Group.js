/**
 * Classe Group - Gestion d'une poule
 */
class Group {
  constructor(name, teams = []) {
    this.name = name;
    this.teams = teams;
    this.rounds = [];
  }

  /**
   * Génère un calendrier Round-Robin
   * @returns {Array} Tableau des rounds avec matchs
   */
  generateRoundRobin() {
    let list = [...this.teams];
    
    // Ajouter équipe fantôme si nombre impair
    if (list.length % 2 !== 0) {
      list.push(null);
    }

    const n = list.length;
    const roundsCount = n - 1;
    const half = n / 2;
    const schedule = [];

    for (let r = 0; r < roundsCount; r++) {
      const roundMatches = [];
      
      for (let i = 0; i < half; i++) {
        const home = list[i];
        const away = list[n - 1 - i];
        
        if (home !== null && away !== null) {
          // Alternance home/away
          if (r % 2 === 0) {
            roundMatches.push({
              id: `g${this.name}_r${r}_m${i}`,
              homeId: home.id,
              awayId: away.id,
              scoreHome: null,
              scoreAway: null
            });
          } else {
            roundMatches.push({
              id: `g${this.name}_r${r}_m${i}`,
              homeId: away.id,
              awayId: home.id,
              scoreHome: null,
              scoreAway: null
            });
          }
        }
      }
      
      schedule.push({ roundNum: r + 1, matches: roundMatches });
      list.splice(1, 0, list.pop());
    }

    return schedule;
  }

  /**
   * Calcule le classement de la poule
   */
  calculateStandings() {
    // Réinitialiser les stats
    this.teams.forEach(t => t.reset());

    // Appliquer les matchs
    this.rounds.forEach(round => {
      round.matches.forEach(match => {
        if (match.scoreHome !== null && match.scoreAway !== null) {
          const home = this.teams.find(t => t.id === match.homeId);
          const away = this.teams.find(t => t.id === match.awayId);

          if (!home || !away) return;

          let pointsHome = 0, pointsAway = 0;

          if (match.scoreHome > match.scoreAway) {
            pointsHome = 3;
          } else if (match.scoreHome < match.scoreAway) {
            pointsAway = 3;
          } else {
            pointsHome = 1;
            pointsAway = 1;
          }

          home.recordMatch(match.scoreHome, match.scoreAway, pointsHome);
          away.recordMatch(match.scoreAway, match.scoreHome, pointsAway);
        }
      });
    });

    // Trier
    this.teams.sort((a, b) => {
      // 1. Points
      if (b.stats.pts !== a.stats.pts) return b.stats.pts - a.stats.pts;
      // 2. Différence
      if (b.diff !== a.diff) return b.diff - a.diff;
      // 3. Buts pour
      if (b.stats.bp !== a.stats.bp) return b.stats.bp - a.stats.bp;
      // 4. H2H (simplifié)
      const h2h = this._getH2HResult(a, b);
      return h2h;
    });

    return this.teams;
  }

  /**
   * Résultat H2H simplifié
   */
  _getH2HResult(teamA, teamB) {
    const match = this.rounds
      .flatMap(r => r.matches)
      .find(m => 
        (m.homeId === teamA.id && m.awayId === teamB.id) ||
        (m.homeId === teamB.id && m.awayId === teamA.id)
      );

    if (!match || match.scoreHome === null) return 0;

    if (match.homeId === teamA.id) {
      return match.scoreHome > match.scoreAway ? 1 : match.scoreHome < match.scoreAway ? -1 : 0;
    } else {
      return match.scoreAway > match.scoreHome ? 1 : match.scoreAway < match.scoreHome ? -1 : 0;
    }
  }

  /**
   * Retourne les N meilleures équipes
   */
  getQualified(n) {
    return this.teams.slice(0, n);
  }
}
