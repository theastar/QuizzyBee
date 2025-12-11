import { create } from 'zustand';
import { authAPI } from '../services/api';

// Parse pomodoro setting to get minutes
const parsePomodoroSetting = (setting) => {
    switch (setting) {
        case "Short (15/5)":
            return { study: 15, break: 5 };
        case "Medium (25/5)":
            return { study: 25, break: 5 };
        case "Long (50/10)":
            return { study: 50, break: 10 };
        default:
            return { study: 25, break: 5 };
    }
};

export const useSettingsStore = create((set, get) => ({
    // Pomodoro settings
    pomodoroSetting: "Medium (25/5)",
    studyMinutes: 25,
    breakMinutes: 5,

    // Notification settings
    notificationsEnabled: true,

    // Loading state
    isLoading: false,

    // Load settings from backend
    loadSettings: async (userId) => {
        if (!userId) {
            console.log('No userId provided, using defaults');
            return;
        }

        try {
            set({ isLoading: true });
            const response = await authAPI.getSettings(userId);

            if (response.success && response.settings) {
                const { pomodoroSetting, notificationsEnabled } = response.settings;
                const times = parsePomodoroSetting(pomodoroSetting);

                set({
                    pomodoroSetting,
                    studyMinutes: times.study,
                    breakMinutes: times.break,
                    notificationsEnabled,
                    isLoading: false,
                });

                console.log('Settings loaded from backend:', response.settings);
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
            set({ isLoading: false });
        }
    },

    // Update pomodoro setting and save to backend
    setPomodoroSetting: async (setting, userId) => {
        const times = parsePomodoroSetting(setting);
        set({
            pomodoroSetting: setting,
            studyMinutes: times.study,
            breakMinutes: times.break,
        });

        // Save to backend if userId is provided
        if (userId) {
            try {
                const { notificationsEnabled } = get();
                await authAPI.updateSettings(userId, setting, notificationsEnabled);
                console.log('Pomodoro setting saved to backend:', setting);
            } catch (error) {
                console.error('Failed to save pomodoro setting:', error);
            }
        }
    },

    // Update notification setting and save to backend
    setNotificationsEnabled: async (enabled, userId) => {
        set({ notificationsEnabled: enabled });

        // Save to backend if userId is provided
        if (userId) {
            try {
                const { pomodoroSetting } = get();
                await authAPI.updateSettings(userId, pomodoroSetting, enabled);
                console.log('Notification setting saved to backend:', enabled);
            } catch (error) {
                console.error('Failed to save notification setting:', error);
            }
        }
    },
}));
