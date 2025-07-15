import { OnlyTextButton } from "@/shared/components/buttons/OnlyTextButton";
import React from "react";
import { useNavigate } from "react-router-dom";

export const ContactButton: React.FC = () => {
  const navigate = useNavigate();
  const handleContactButton = () => {
    navigate("./contact")
  } 

  return (
    <OnlyTextButton 
    id="bt-navbar-contact"
    type= "primaryButton"
    size= "L"
    onClick={handleContactButton}
    text="contacto"
    isFetching={false}
    disabled={false}
    />
  )
}