// src/routes/UserAdminPrivateRoutes.tsx
import { useUserStore } from '@/store/useUserStore';
import { Navigate } from 'react-router-dom';


export function UserAuthenticatedPrivateRoutes({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useUserStore();
	if ( !isAuthenticated ) {
			return <Navigate to="/" replace />;
	}

	return children;
}