import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, Image, View, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useState } from 'react';

//Componente de Texto
import Texto from '../componentes/Texto'

export default function Sobre() {

  //Indica o vídeo e coloca ele em loop
  const player = useVideoPlayer(require('../assets/VideoImobiliaria.mp4'), player => {
      player.loop = true
      //player.play()
  })

  // Estado para o carrossel
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Array de imagens do carrossel
  const imagens = [
    require('../assets/casaImage.jpg'),
    require('../assets/casaImage.jpg'),
    require('../assets/casaImage.jpg'),
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / 350);
    setCurrentIndex(index);
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* Header Vermelho com Logo */}
      <View style={styles.header}>
        <Image source={require('../assets/Logo-White.png')} style={styles.logo} resizeMode="contain"/>
      </View>
      
      {/* Seção de Título */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Talisma Imóveis</Text>
        <View style={styles.divider}/>
      </View>
      
      {/* Conteúdo Principal */}
      <Texto estiloEspecifico={styles.texto}>Imobiliaria Talisma é uma empresa especializada em soluções imobiliárias que começou com o objetivo de oferecer os melhores serviços no mercado de imóveis. Com uma equipe dedicada, a empresa se destaca pela qualidade, transparência e atendimento ao cliente.
      {'\n'}{'\n'}
      Hoje contamos com clientes em várias cidades, estados e até em outras regiões! 
      {'\n'}
      Todos ficam satisfeitos com os serviços que oferecemos!!!!
      {'\n'}
      Todos os atendimentos são feitos com muito carinho, dedicação e profissionalismo, disponíveis por WhatsApp ou Instagram.
      {'\n'}{'\n'}
      Veja como funciona nosso processo: nossa equipe analisa criteriosamente cada oportunidade e propriedade para oferecer as melhores soluções aos clientes.
      </Texto>
      
      {/* Carrossel de Imagens */}
      <View style={styles.carrosselContainer}>
        <FlatList
          data={imagens}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.carrosselItem}>
              <Image source={item} style={styles.imagem} resizeMode="contain"/>
            </View>
          )}
          horizontal
          scrollEventThrottle={16}
          onScroll={handleScroll}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
        {/* Indicadores de página */}
        <View style={styles.dotsContainer}>
          {imagens.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot
              ]}
            />
          ))}
        </View>
      </View>
      
      <StatusBar style="dark" animated />
      <View style={styles.videoSection}>
        <Text style={styles.videoTitle}>Conheça Nosso Trabalho</Text>
        <VideoView player={player} style={styles.video} allowsPictureInPicture/>
      </View>
      
      <StatusBar style="dark" animated />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#810025',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 200,
    alignSelf: "center",
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'FontePadrao',
  },
  divider: {
    height: 3,
    backgroundColor: '#C70039',
    marginTop: 12,
    borderRadius: 2,
  },
  texto:{
    color: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    lineHeight: 28,
  },
  imagem:{
    width: '90%',
    height: 350,
    alignSelf: "center",
    marginVertical: 20,
  },
  carrosselContainer: {
    marginVertical: 20,
  },
  carrosselItem: {
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#C70039',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  videoSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#F5F5F5',
    marginVertical: 20,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C70039',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'FontePadrao',
  },
  video: {
    width: 350,
    height: 275,
    alignSelf: "center",
  },
});