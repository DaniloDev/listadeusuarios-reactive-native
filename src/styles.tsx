import styled from "styled-components";

export const Container = styled.View`
    flex: 1;
`

export const List = styled.FlatList.attrs({
    contentContainerStyle: { paddingHorizontal: 20 }
})`
margin-top: 20px;
`

export const ViewModalUser = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const HeaderModalUser = styled.View`
width: 100%;
height: 40px;
align-items: flex-end;
justify-content: center;
`
export const AreaText = styled.View`
width: 100%;
height: 40px;
align-items: center;
justify-content: center;
`

export const TextDetail = styled.Text`
text-align: center;
font-size: 20px;
`
export const Search = styled.TextInput.attrs({
    placeholder: "Pesquisar",
    marginHorizontal: 20
})`
border-color: #000;
border-width: 1px;
border-radius: 25px;
height: 40px;
padding-left: 10px;
margin-top: 5px;
`

