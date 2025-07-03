import React from "react"
import { CreateAdmin } from "../components/CreateAdmin"
import { ManageAdmins } from "../components/ManageAdmins"

export const ManageAdminsPage: React.FC = () => {
  return (
    <>
      <CreateAdmin />
      <ManageAdmins />
    </>
  )
}