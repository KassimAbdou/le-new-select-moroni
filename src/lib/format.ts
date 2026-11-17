const KMF_FORMATTER = new Intl.NumberFormat('fr-FR');

/** Formate un montant en francs comoriens (KMF). */
export function formatKmf(amount: number): string {
  return `${KMF_FORMATTER.format(amount)} KMF`;
}
