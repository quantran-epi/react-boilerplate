import { Card } from "@components/Card"
import { useStore } from "@store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const UpdateATMCycleScreen = () => {
    const { t } = useTranslation('ATM', { keyPrefix: "UpdateATMCycle" });
    const setCurrentFunction = useStore((state: any) => state.setCurrentFunction);
    const services = useStore(state => state.services);

    useEffect(() => {
        setCurrentFunction(t("Header.Title"));

        return () => {
            setCurrentFunction("");
        }
    }, [])

    return <Card>update ATM cycle</Card>
}