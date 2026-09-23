import * as React from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Constants from 'expo-constants';

const Item = ({ id, titulo, descricao, imagem }) => {
  return (
    <View style={estilo.item}>
      <Image 
        source={{ uri: imagem }}
        style={{ width: '100%', height: 150, borderRadius: 8 }}
      />
      <Text >'ID: {id}'</Text>
      <Text style={estilo.title}>'TITULO: {titulo}'</Text>
      <Text style={estilo.subtitle}>'DESCRICAO: {descricao}'</Text>
    </View>
  );
};

export default function App() {
  const [dados, setDados] = React.useState(null);

  function obtemDadosApi2() {
    fetch(
      'https://raw.githubusercontent.com/professorgeorgeoliveira/api-podcast/master/db.json'
    )
      .then((resposta) => resposta.json())
      .then((dadosJson) => {
        setDados(dadosJson);
        console.log(dadosJson);
      })
      .catch((erro) => console.log('erro: ' + erro));
  }
  async function obtemDadosApi() {
    const resultado = await fetch(
      'https://raw.githubusercontent.com/professorgeorgeoliveira/api-podcast/master/db.json'
    );
    const dadosJson = await resultado.json();
    if (resultado.ok) {
      setDados(dadosJson);
      console.log(dadosJson);
    }
  }

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      titulo={item.title}
      descricao={item.description}
      imagem={item.img}
    />
  );

  return (
    <ScrollView style={estilo.container}>
      <View>
        <Button title="buscar dados " onPress={() => obtemDadosApi()} />
        {dados ? (
          <View>
            <FlatList
              data={dados.podcasts}
              keyExtractor={id => id}
              renderItem={ ({item}) => renderItem(item={item})}
            />
            <Text> {JSON.stringify(dados, null, 2)} </Text>
          </View>
        ) : (
          <Text> carregando dados...</Text>
        )}
      </View>
    </ScrollView>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'lightblue',
    padding: 8,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 12,
  },
});
