/**
 * Service d'algorithmes de tournoi
 */
class AlgorithmService {
  /**
   * Appaire les équipes pour l'élimination directe
   * IMPORTANT: Pas de poule au 1er tour
   */
  static pairForBracket(q1, q2, q3, bracketFormat, numGroups) {
    // Construire le pool
    let pool = [...q1, ...q2, ...q3];

    // Compléter avec des équipes fantômes si nécessaire
    while (pool.length < bracketFormat) {
      pool.push({
        id: null,
        name: 'À déterminer',
        logo: 'data:image/svg+xml;utf8,<svg></svg>',
        groupIdx: -1
      });
    }

    // Sériation simple: 1er de chaque groupe, puis 2e, puis 3e
    const seeded = [];
    for (let i = 0; i < q1.length; i++) {
      seeded.push(q1[i]);
      if (i < q2.length) seeded.push(q2[i]);
    }
    seeded.push(...q3);

    while (seeded.length < bracketFormat) {
      seeded.push({ id: null, name: 'À déterminer', logo: '', groupIdx: -1 });
    }

    // Créer les matchs du 1er tour
    const pairs = [];
    const half = bracketFormat / 2;

    for (let i = 0; i < half; i++) {
      let t1 = seeded[i];
      let t2 = seeded[bracketFormat - 1 - i];

      // Vérification: pas du même groupe au 1er tour
      if (t1.groupIdx !== -1 && t2.groupIdx !== -1 && t1.groupIdx === t2.groupIdx) {
        // Chercher une alternative
        const alt = seeded.find((t, idx) => 
          idx > i && 
          idx !== bracketFormat - 1 - i &&
          t.groupIdx !== t1.groupIdx &&
          t.groupIdx !== -1 &&
          !pairs.some(p => p.t1 === t || p.t2 === t)
        );
        if (alt) t2 = alt;
      }

      pairs.push({ t1, t2 });
    }

    return pairs;
  }

  /**
   * Détermine le gagnant d'un match
   */
  static determineWinner(match) {
    if (match.s1 === null || match.s2 === null) return null;

    if (match.s1 > match.s2) return match.t1;
    if (match.s2 > match.s1) return match.t2;

    // Match nul - vérifier TAB
    if (match.pen1 !== null && match.pen2 !== null) {
      return match.pen1 > match.pen2 ? match.t1 : match.t2;
    }

    return null; // Pas décidé
  }

  /**
   * Génère les matchs de classement pour les non-qualifiés
   */
  static generatePlacementMatches(nonQualif3rd, all4th, bracketFormat) {
    const matches = [];

    // Matchs entre 3e non-qualifiés
    for (let i = 0; i < Math.floor(nonQualif3rd.length / 2); i++) {
      matches.push({
        id: `p_3rd_${i}`,
        title: '3e Place (Non-qualifiés)',
        t1: nonQualif3rd[i],
        t2: nonQualif3rd[nonQualif3rd.length - 1 - i],
        s1: null,
        s2: null
      });
    }

    // Matchs entre 4e
    for (let i = 0; i < Math.floor(all4th.length / 2); i++) {
      matches.push({
        id: `p_4th_${i}`,
        title: '4e Place',
        t1: all4th[i],
        t2: all4th[all4th.length - 1 - i],
        s1: null,
        s2: null
      });
    }

    // Structure 5-8 si quarts de finale
    if (bracketFormat >= 8) {
      matches.push(
        { id: 'p_5_8_semi1', title: '1/2 Finale 5-8 (Match 1)', t1: null, t2: null, s1: null, s2: null },
        { id: 'p_5_8_semi2', title: '1/2 Finale 5-8 (Match 2)', t1: null, t2: null, s1: null, s2: null },
        { id: 'p_5_8_5th', title: 'Match pour la 5e Place', t1: null, t2: null, s1: null, s2: null },
        { id: 'p_5_8_7th', title: 'Match pour la 7e Place', t1: null, t2: null, s1: null, s2: null }
      );
    }

    return matches;
  }
}
