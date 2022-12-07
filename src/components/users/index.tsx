import React from "react";
import { Container, ViewUsers, ImgUser, AreaTexts, Nome, Email, Gender  } from './styles'

const Users = ( { ...obj } ) => {
    return(
        <Container>
            <ViewUsers>
                <ImgUser 
                source={{ uri : obj.data.picture.large }}
                />
                <AreaTexts>
                    <Nome>{obj.data.name.first + ' ' + obj.data.name.last + '\n'}</Nome>
                    <Email>{obj.data.email}</Email>
                    { /*<Gender>{obj.data.gender}</Gender> */}
                </AreaTexts>  
            </ViewUsers>
        </Container>
    )

}
export default Users