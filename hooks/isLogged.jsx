import { useEffect } from "react";
import { useRouter } from "next/router";

export function useIsLogged(redirectPath = "/") {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push(redirectPath);
        }
    }, [router, redirectPath]);
}