import type React from 'react';
import type { UIApi, UIComponentProps, UIRegistration } from 'spotifyplus';
import { screenTargets } from './model';

export type ScreenTarget = typeof screenTargets[number];
export type Renderers = Record<ScreenTarget, React.ComponentType<UIComponentProps>>;
export function createThemeController(ui: UIApi, renderers: Renderers) {
    const registrations = new Map<ScreenTarget, UIRegistration>();
    const listeners = new Set<() => void>();
    let snapshot: readonly ScreenTarget[] = [];
    const publish = () => { snapshot = [...registrations.keys()]; listeners.forEach(listener => listener()); };
    return {
        getSnapshot: () => snapshot,
        subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
        toggle(target: ScreenTarget) {
            const existing = registrations.get(target);
            if (existing) { existing.dispose(); registrations.delete(target); }
            else registrations.set(target, ui.replace(target, renderers[target]));
            publish();
        },
        enable(targets: readonly ScreenTarget[] = screenTargets) {
            const created: ScreenTarget[] = [];
            try {
                for (const target of targets) if (!registrations.has(target)) {
                    registrations.set(target, ui.replace(target, renderers[target])); created.push(target);
                }
            } catch (error) {
                for (const target of created) { registrations.get(target)?.dispose(); registrations.delete(target); }
                throw error;
            } finally { publish(); }
        },
        disable() { registrations.forEach(registration => registration.dispose()); registrations.clear(); publish(); },
    };
}
