import { create } from 'zustand';

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

    // Load settings (placeholder for future AsyncStorage implementation)
    loadSettings: () => {
        // Settings are already in state, no need to load from storage for now
        console.log('Settings loaded');
    },

    // Update pomodoro setting
    setPomodoroSetting: (setting) => {
        const times = parsePomodoroSetting(setting);
        set({
            pomodoroSetting: setting,
            studyMinutes: times.study,
            breakMinutes: times.break,
        });
    },

    // Update notification setting
    setNotificationsEnabled: (enabled) => {
        set({ notificationsEnabled: enabled });
    },
}));
