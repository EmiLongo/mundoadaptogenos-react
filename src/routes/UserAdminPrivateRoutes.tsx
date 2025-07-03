import { useUserStore } from '@/store/useUserStore';
import { Navigate } from 'react-router-dom';


export function UserAdminPrivateRoutes({ children }: { children: React.ReactNode }) {

  const isAuthenticated = useUserStore((state) => state.isAuthenticated());
  const user = useUserStore((state) => state.user);

    if ( !isAuthenticated ) {
        return <Navigate to="/login" replace />;
    }

    if ( user?.role !== 'ADMIN' && user?.role !== 'SUPER_ADMIN' ) {
        return <Navigate to="/" replace />;
    }

    return children;

}