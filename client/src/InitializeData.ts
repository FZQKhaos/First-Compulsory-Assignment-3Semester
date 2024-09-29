import { useEffect } from "react";
import { customerAtom } from "./components/atoms/CustomerAtom.tsx";
import { useAtom } from "jotai";
import { http } from "./http.ts";

export function useInitializeData() {

    const [customers, setCustomers] = useAtom(customerAtom);

  useEffect(() => {
    http.api
        .customersGetCustomers()
        .then((response) => {
            setCustomers(response.data);
        }).catch((error) => {
            console.error(error);
        });
  }, []);
}