import { describe, expect, it } from 'vitest';
import {
  buildWhatsAppMessage,
  createEmptyReservation,
  createReference,
  validateReservation,
} from './reservation';

const TODAY = '2026-11-17';

function makeValidInput() {
  return {
    ...createEmptyReservation(TODAY),
    fullName: 'Aminata Said',
    phone: '+269 773 00 31',
    email: 'aminata@example.com',
    date: TODAY,
    guests: '4',
    notes: 'Sans crustacés',
  };
}

describe('validateReservation', () => {
  it('accepte une demande complète et valide', () => {
    expect(validateReservation(makeValidInput(), TODAY)).toBeNull();
  });

  it('rejette un nom trop court', () => {
    const input = { ...makeValidInput(), fullName: 'A' };
    expect(validateReservation(input, TODAY)).toMatch(/nom complet/);
  });

  it('rejette un numéro de téléphone invalide', () => {
    const input = { ...makeValidInput(), phone: '123' };
    expect(validateReservation(input, TODAY)).toMatch(/téléphone/);
  });

  it('rejette un e-mail mal formé', () => {
    const input = { ...makeValidInput(), email: 'pas-un-email' };
    expect(validateReservation(input, TODAY)).toMatch(/e-mail/);
  });

  it('rejette une date passée', () => {
    const input = { ...makeValidInput(), date: '2026-11-16' };
    expect(validateReservation(input, TODAY)).toMatch(/à partir d’aujourd’hui/);
  });

  it('rejette un horaire ou un nombre de couverts non proposé', () => {
    expect(
      validateReservation({ ...makeValidInput(), timeSlot: '23:45' }, TODAY),
    ).toMatch(/horaire/);
    expect(validateReservation({ ...makeValidInput(), guests: '999' }, TODAY)).toMatch(
      /couverts/,
    );
  });
});

describe('buildWhatsAppMessage', () => {
  it('inclut toutes les informations de la réservation', () => {
    const message = buildWhatsAppMessage(makeValidInput(), 'LNS-1234');
    expect(message).toContain('référence LNS-1234');
    expect(message).toContain('Aminata Said');
    expect(message).toContain('aminata@example.com');
    expect(message).toContain('4 personne(s)');
    expect(message).toContain('Terrasse ombragée');
    expect(message).toContain('Sans crustacés');
  });

  it('omet les champs optionnels vides', () => {
    const input = { ...makeValidInput(), email: '', notes: '' };
    const message = buildWhatsAppMessage(input);
    expect(message).not.toContain('E-mail');
    expect(message).not.toContain('Notes');
  });
});

describe('createReference', () => {
  it('génère une référence au format LNS-XXXX', () => {
    expect(createReference()).toMatch(/^LNS-\d{4}$/);
  });
});
