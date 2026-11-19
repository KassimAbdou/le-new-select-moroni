import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';

afterEach(() => {
  cleanup();
  window.location.hash = '';
  window.history.replaceState(null, '', '/');
});

describe('application', () => {
  it('affiche la page d’accueil par défaut', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 1, name: /cuisine française/i }),
    ).toBeInTheDocument();
  });

  it('navigue vers la réservation via le bouton du header', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Réserver' }));
    expect(
      screen.getByRole('heading', { level: 1, name: /réserver votre table/i }),
    ).toBeInTheDocument();
    expect(window.location.hash).toBe('#reservation');
    expect(document.title).toContain('Réservation');
  });

  it('donne un accès direct aux pizzas et aux plats du jour depuis le header', () => {
    render(<App />);
    const header = within(screen.getByRole('banner'));

    fireEvent.click(header.getByRole('link', { name: 'Pizzas' }));
    expect(window.location.hash).toBe('#pizzas');
    expect(document.title).toContain('Pizzas');
    expect(document.getElementById('menu-pizzas')).not.toBeNull();

    fireEvent.click(header.getByRole('link', { name: 'Plats du jour' }));
    expect(window.location.hash).toBe('#plats-du-jour');
    expect(document.getElementById('menu-daily-specials')).not.toBeNull();
  });

  it('affiche un panier flottant dès qu’un plat est ajouté', () => {
    render(<App />);
    window.location.hash = '#menu';
    fireEvent(window, new Event('hashchange'));

    expect(screen.queryByRole('button', { name: /voir le panier \(1\)/i })).toBeNull();

    fireEvent.click(screen.getAllByRole('button', { name: /^ajouter /i })[0]!);

    const floatingCart = screen
      .getAllByRole('button', { name: /voir le panier \(1\)/i })
      .find((button) => button.hasAttribute('aria-label'));
    expect(floatingCart).toBeDefined();

    fireEvent.click(floatingCart!);
    expect(
      screen.getAllByRole('button', { name: 'Fermer le panier' }).length,
    ).toBeGreaterThan(0);

    fireEvent.click(screen.getAllByRole('button', { name: 'Fermer le panier' })[0]!);
    expect(
      screen
        .getAllByRole('button', { name: /voir le panier \(1\)/i })
        .some((button) => button.hasAttribute('aria-label')),
    ).toBe(true);
  });

  it('suit les changements d’URL et les événements du navigateur', () => {
    render(<App />);

    window.location.hash = '#infos';
    fireEvent(window, new Event('hashchange'));
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /préparer votre venue/i,
      }),
    ).toBeInTheDocument();

    // Simule le bouton « retour » du navigateur.
    window.history.replaceState(null, '', '#galerie');
    fireEvent(window, new Event('popstate'));
    expect(
      screen.getByRole('heading', { level: 1, name: /badamiers et en cuisine/i }),
    ).toBeInTheDocument();
  });

  it('ouvre l’espace propriétaire via le lien profond #admin', () => {
    render(<App />);
    window.location.hash = '#admin';
    fireEvent(window, new Event('hashchange'));

    expect(screen.getByRole('link', { name: /retour au site/i })).toBeInTheDocument();
    expect(document.title).toContain('Administration');
  });

  it('valide et confirme une demande de réservation', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Réserver' }));

    fireEvent.click(screen.getByRole('button', { name: /confirmer la demande/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/nom complet/i);

    fireEvent.change(screen.getByLabelText(/nom complet/i), {
      target: { value: 'Aminata Said' },
    });
    fireEvent.change(screen.getByLabelText(/téléphone/i), {
      target: { value: '+269 773 00 31' },
    });
    fireEvent.click(screen.getByRole('button', { name: /confirmer la demande/i }));

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /demande de réservation enregistrée/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /confirmer via whatsapp/i }).getAttribute('href'),
    ).toMatch(/wa\.me/);
  });
});
