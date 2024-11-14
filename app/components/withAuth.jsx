import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      if (!token) {
        router.push('/auth/login');
        return;
      }

      fetch('/api/auth/verify-token', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.message === 'Authorized') {
            setIsAuthenticated(true);
          } else {
            router.push('/login');
          }
        })
        .catch(() => {
          router.push('/login');
        });
    }, [router]);

    if (!isAuthenticated) {
      return null; // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;
  return WithAuthComponent;
};

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withAuth;
