// src/modules/admin/components/ManageAdmins.tsx
import React from "react"
import { Box } from "@mui/material"
import { Heading2, Heading3, SubHeading } from "@theme/textStyles"
import { WhiteButton } from "@shared/components/buttons/WhiteButton"
import { redColor } from "@theme/theme";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

export const ManageAdmins: React.FC = () => {
  const adminList = [
    {
      id: 1,
      name: "Juan Perez",
      email: "juanperez@gmail.com"
    },
    {
      id: 2,
      name: "Maria Gomez",
      email: "mariagomez@gmail.com"
    },
    {
      id: 3,
      name: "Pedro Rodriguez",
      email: "pedrorodriguez@gmail.com"
    }
  ]
  const handleDelete = (id: number) => {
    console.log(id)
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginY: {xs: '2rem', md: '3rem'},
    }}>
      <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
        <Heading2>
          Administradores
        </Heading2>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', gap: '2rem', flexDirection: 'column', marginX: "auto"}}>
        { adminList?.length > 0 
        ? 
          adminList.map((user, index) => (

          <Box 
            key={`user-${user.id}`}
            sx={{
              width: '100%',
              display: 'flex', 
              alignItems: 'center', 
              gap: '2rem', 
              justifyContent: 'space-between'}}
          >
  
            <SubHeading sx={{fontWeight: '600'}}>
              {index + 1}
            </SubHeading>
  
            <Box sx={{flexGrow: 1}}>
              <SubHeading sx={{fontSize: '1.1rem'}}>
                {user.name}
              </SubHeading>
            </Box>
            <Box sx={{flexGrow: 1}}>
              <SubHeading>
                {user.email}
              </SubHeading>
            </Box>
            <Box sx={{display: 'flex', gap: '1rem'}}>
              <WhiteButton
                id={`bt-delete-admin-${index}`}
                onClick={() => handleDelete(user.id)}
                isFetching={false}
                icon={<DeleteForeverOutlinedIcon sx={{color: redColor[500], fontSize: '1.3rem'}} />}
                disabled={false}
              />
              <WhiteButton
                id={`bt-edit-admin-${index}`}
                onClick={() => handleDelete(user.id)}
                isFetching={false}
                icon={<DriveFileRenameOutlineOutlinedIcon sx={{fontSize: '1.3rem'}} />}
                text="Editar"
                fetchingText="..."
                disabled={false}
              />
            </Box>
          </Box>
         ))
        :
        <Heading3 sx={{textAlign: 'center', fontWeight: '600'}}>
          No hay administradores registrados
        </Heading3>
      }
      </Box>
    </Box>
  )
}