import styled from 'styled-components'
import { Animated } from 'react-native'

export const ModalBackGround = styled.View`
flex: 1;
background-color: 'rgba(0,0,0,0.5)';
justify-content: center;
align-items: center;
`

export const ModalContainer = styled(Animated.View).attrs({
    paddingHorizontal: 20, 
    paddingVertical: 30,
})`
width: 80%;
background-color: white;
border-radius: 20px;
elevation: 20;
`
