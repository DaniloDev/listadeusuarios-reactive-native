import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StatusBar, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Container, List, ViewModalUser, HeaderModalUser, AreaText, TextDetail, Search } from './styles';
import api from './services/api';
import Users from './components/users';
import ModalUser from './screens/ModalUser';

const App = () => {
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [users, setUSers] = useState([])
  const [auxUsers, setauxUSers] = useState([])
  const [picture, setPicture] = useState('');
  const [name, setName]  = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [visible, setVisible] = useState(false);
  const endpoint = `?results=20&format=json&inc=gender,name,email,picture&nat=br&page=${page}`


  useEffect(()=>{
    getUsers()
  }, [])
  
  const getUsers = async() => {
    if(loading) return;

    setLoading(true)

    const response = api.get(endpoint)
  
    setUSers([...users, ...(await response).data.results])
    setauxUSers([...users, ...(await response).data.results])
    setPage(page + 1)
    setLoading(false)
  }

  const FooterList = (load: any) => {
    if(!load) return null;

    if(users.length > 0){
    return(
      <View style={{ padding: 10}}>
           <ActivityIndicator size={25} color="#121212"/>
          <Text style={{ textAlign: 'center', fontSize: 20}}>Carregando...
          </Text>
      </View>
    )
  }else{
    return(
      <Text style={{ textAlign: 'center'}}>Nenhum usuário encontrado !</Text>
    )
    
  }
  }

  const removeAccent = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  const searchUsers = (str: string) => {
    const arrUsers = auxUsers
    str =  removeAccent(str).toUpperCase()
    setUSers(arrUsers.filter((s) => 
      (removeAccent(s.name.first).toUpperCase() + ' ' + removeAccent(s.name.last).toUpperCase()).includes(str)
      || s.email.toUpperCase().includes(str) 
      || (s.gender.toUpperCase() == "MALE" ? "MASCULINO" : "FEMININO").includes(str)
    ))
  }

  return(
    <Container>
      <StatusBar backgroundColor="#000"/>
      <Search onChangeText={(str: string) => searchUsers(str)}
      autoCapitalize="none"
      />
     <List
      contentContainerStyle={{ marginHorizontal: 20 }}
      showVerticalScrollIndicator={false}
      keyboardShouldPersistTops="handled"
      data={users}
      renderItem={

         ({ item } : any) => ( 
          <TouchableHighlight
          
            onPress={() => {

              setPicture(item.picture.large)
              setName(item.name.first + ' ' + item.name.last),
              setEmail(item.email),
              setGender(item.gender),

              setVisible(true)

          }}
          >
            <View style={{ backgroundColor: 'white' }}>
              <Users 
              data={item} 
              /> 
              </View>
          </TouchableHighlight>
          ) }
          onEndReached={getUsers}
          onEndReachedThreshold={0.1}
          ListFooterComponent={ <FooterList load={loading}/>}
      />


<ViewModalUser>
      <ModalUser visible={visible}>
        <View style={{alignItems: 'center'}}>
          <HeaderModalUser>
            <AreaText>
              <TextDetail>Detalhes do usuário</TextDetail>
            </AreaText>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require('./assets/x.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </HeaderModalUser>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{ uri: picture }}
            style={{height: 150, width: 150, marginVertical: 10, borderRadius: 25}}
          />
        </View>

        <Text style={{marginVertical: 30, fontSize: 16, textAlign: 'left'}}>
          <Text style={{ fontWeight: 'bold'}}>Nome:</Text> <Text style={{ fontWeight: 'bold'}}>{name} {'\n'}</Text>
          <Text style={{ fontWeight: 'bold'}}>Email:</Text> <Text>{email} {'\n'}</Text>
          <Text style={{ fontWeight: 'bold'}}>Sexo:</Text> <Text></Text>{gender ==  'male' ? 'Masculino' : 'Feminino'}
        </Text>
      </ModalUser>
    </ViewModalUser>

    </Container>
  )
}

export default App