import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
    return {
        sections: [
            { title: 'Account', slug: 'account' },
            { title: 'Security', slug: 'security' },
            { title: 'Privacy', slug: 'privacy' },
            { title: 'Notifications', slug: 'notifications' },
            { title: 'Appearance', slug: 'appearance' },
            { title: 'Advanced', slug: 'advanced' }
        ]
    };
};
