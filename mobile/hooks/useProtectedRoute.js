import { useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../context/AuthStore';

export function useProtectedRoute() {
    const segments = useSegments();
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const [isMounted, setIsMounted] = useState(false);

    // Wait for component to mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Don't run navigation logic until mounted
        if (!isMounted) return;

        const currentPath = `/${segments.join('/')}`;
        const inAdminGroup = segments[0] === 'admin';
        const inTabsGroup = segments[0] === 'tabs';
        const inDashboardGroup = segments[0] === 'dashboard';

        // Auth pages that should be accessible when not logged in
        const authPages = ['/', '/login', '/signup', '/forgotpass', '/index'];
        const isAuthPage = authPages.includes(currentPath) || currentPath === '';

        // Protected routes that require authentication
        const protectedRoutes = ['tabs', 'dashboard', 'admin', 'edit-profile', 'app-settings', 'startquiz', 'endquiz'];
        const isProtectedRoute = protectedRoutes.some(route => segments.includes(route));

        // If not authenticated and trying to access protected routes
        if (!isAuthenticated && isProtectedRoute) {
            router.replace('/');
        }
        // If authenticated and on index/welcome page, redirect based on role
        else if (isAuthenticated && (currentPath === '/' || currentPath === '/index' || currentPath === '')) {
            if (user?.role === 'admin') {
                router.replace('/admin/dashboard');
            } else {
                router.replace('/tabs/home');
            }
        }
        // If regular user trying to access admin routes
        else if (isAuthenticated && user?.role !== 'admin' && inAdminGroup) {
            router.replace('/tabs/home');
        }
    }, [isAuthenticated, segments, user, isMounted]);
}
