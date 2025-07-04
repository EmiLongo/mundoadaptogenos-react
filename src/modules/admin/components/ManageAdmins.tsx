// src/modules/admin/components/ManageAdmins.tsx
import React from "react"
import { Box } from "@mui/material"
import { Title2, Title3, Subtitle } from "@/theme/textStyles"
import { WhiteButton } from "@/shared/components/buttons/WhiteButton"
import { errorColor } from "@/theme/theme";
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
        <Title2>
          Administradores
        </Title2>
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
  
            <Subtitle sx={{fontWeight: '600'}}>
              {index + 1}
            </Subtitle>
  
            <Box sx={{flexGrow: 1}}>
              <Subtitle sx={{fontSize: '1.1rem'}}>
                {user.name}
              </Subtitle>
            </Box>
            <Box sx={{flexGrow: 1}}>
              <Subtitle>
                {user.email}
              </Subtitle>
            </Box>
            <Box sx={{display: 'flex', gap: '1rem'}}>
              <WhiteButton
                onClick={() => handleDelete(user.id)}
                isFetching={false}
                icon={<DeleteForeverOutlinedIcon sx={{color: errorColor[500], fontSize: '1.3rem'}} />}
                disabled={false}
              />
              <WhiteButton
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
        <Title3 sx={{textAlign: 'center', fontWeight: '600'}}>
          No hay administradores registrados
        </Title3>
      }
      </Box>
    </Box>
  )
}