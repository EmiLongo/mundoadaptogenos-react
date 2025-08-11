// src/routes/UserAdminPrivateRoutes.tsx
import { useUserStore } from '@/store/useUserStore';
import { Navigate } from 'react-router-dom';


export function UserAdminPrivateRoutes({ children }: { children: React.ReactNode }) {

	const { isAuthenticated, isAdmin } = useUserStore();

    if ( !isAuthenticated ) {
        return <Navigate to="/login" replace />;
    }

    if ( !isAdmin() ) {
        return <Navigate to="/" replace />;
    }

    return children;

}