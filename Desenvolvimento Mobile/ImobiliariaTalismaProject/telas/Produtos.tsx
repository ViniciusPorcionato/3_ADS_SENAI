import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, Image, View, FlatList, TouchableOpacity, Modal, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

//Componente de Texto
import Texto from '../componentes/Texto'

export default function Produtos() {

  // Estado para o filtro selecionado
  const [filtroSelecionado, setFiltroSelecionado] = useState('Todos');
  
  // Estado para o modal - statusModal guarda true/false
  const [statusModal, setStatusModal] = useState(false);
  const [imovelSelecionado, setImovelSelecionado] = useState<any>(null);
  const [indiceCarrossel, setIndiceCarrossel] = useState(0);

  // Função para abrir/fechar o modal
  const acaoAbreFecha = (status: boolean) => {
    setStatusModal(status);
    if (!status) {
      setImovelSelecionado(null);
    }
  };

  // Array de imóveis
  const imoveis = [
    {
      id: '1',
      titulo: 'Casa Moderna com Piscina',
      tipo: 'Venda',
      preco: 'R$ 450.000',
      localizacao: 'Bairro Centro, São Paulo',
      imagem: require('../assets/casaImage.jpg'),
      quartos: 3,
      banheiros: 2,
      descricao: 'Magnífica casa moderna localizada no coração do bairro Centro. Possui amplo hall de entrada, salas de estar e jantar integradas, cozinha gourmet com ilha central, 3 suítes sendo uma master com hidromassagem. Confortável piscina com deck em madeira, área de churrasco equipada, jardim planejado. Garagem para 2 veículos. Completa infraestrutura e segurança 24h.',
      imagens: [
        require('../assets/casaImage.jpg'),
        require('../assets/casaImage.jpg'),
        require('../assets/casaImage.jpg'),
      ]
    },
    {
      id: '2',
      titulo: 'Apartamento Aconchegante',
      tipo: 'Locação',
      preco: 'R$ 2.500/mês',
      localizacao: 'Vila Mariana, São Paulo',
      imagem: require('../assets/casaImage.jpg'),
      quartos: 2,
      banheiros: 1,
      descricao: 'Aconchegante apartamento de 2 dormitórios localizado em excelente endereço da Vila Mariana. Ambientes bem distribuídos, living com sacada, cozinha planejada, banheiro social e suíte. Bloco com 20 andares, elevador social, salão de festas, academia, piscina infantil e adulto. Portaria 24h. Seguro e tranquilo para família ou casal.',
      imagens: [
        require('../assets/casaImage.jpg'),
        require('../assets/casaImage.jpg'),
        require('../assets/casaImage.jpg'),
      ]
    },
    {
      id: '3',
      titulo: 'Casa Ampla com Quintal',
      tipo: 'Venda',
      preco: 'R$ 380.000',
      localizacao: 'Zona Leste, São Paulo',
      imagem: require('../assets/casaImage.jpg'),
      quartos: 4,
      banheiros: 2,
      descricao: 'Casa ampla e espaçosa na Zona Leste com 4 dormitórios. Sala grande, cozinha acessível, área de serviço, 2 banheiros. Quintal grande ideal para diversas possibilidades. Piso em cerâmica durável. Estrutura sólida, pronta para morar. Ótima localização próximo comércios e transporte público. Excelente oportunidade de investimento.',
      imagens: [
        require('../assets/casaImage.jpg'),
        require('../assets/casaImage.jpg'),
        require('../assets/casaImage.jpg'),
      ]
    },
    {
      id: '4',
      titulo: 'Studio Moderno',
      tipo: 'Locação',
      preco: 'R$ 1.800/mês',
      localizacao: 'Consolação, São Paulo',
      imagem: require('../assets/casaImage.jpg'),
      quartos: 1,
      banheiros: 1,
      descricao: 'Studio moderno e funcional na Consolação, região nobre de São Paulo. Ambiente integrado com cozinha americana, banheiro completo, área pequena mas bem aproveitada. Prédio com segurança 24h, interfone, elevador. Localização estratégica próximo a metrô, bares, restaurantes e comércio em geral. Perfeito para solteiros ou casais.',
      imagens: [
        require('../assets/casaImage.jpg'),
        require('../assets/casaImage.jpg'),
        require('../assets/casaImage.jpg'),
      ]
    },
    {
      id: '5',
      titulo: 'Casa de Condomínio',
      tipo: 'Venda',
      preco: 'R$ 520.000',
      localizacao: 'Alphaville, Barueri',
      imagem: require('../assets/casaImage.jpg'),
      quartos: 3,
      banheiros: 2,
      descricao: 'Excelente casa em condomínio de luxo em Alphaville. Acabamentos sofisticados, 3 quartos sendo 2 suítes, cozinha ampla, sala com piscina privativa, área verde preservada. Condomínio completo com club house, piscina olímpica, quadra poliesportiva, academia, segurança rígida com vigilância 24h. Lugar seguro e tranquilo para família.',
      imagens: [
        require('../assets/casaImage.jpg'),
        require('../assets/casaImage.jpg'),
        require('../assets/casaImage.jpg'),
      ]
    },
    {
      id: '6',
      titulo: 'Penthouse Luxuoso',
      tipo: 'Locação',
      preco: 'R$ 4.500/mês',
      localizacao: 'Vila Madalena, São Paulo',
      imagem: require('../assets/casaImage.jpg'),
      quartos: 3,
      banheiros: 3,
      descricao: 'Penthouse de luxo na famosa Vila Madalena com vista panorâmica da cidade. 3 suítes amplas com closet, living espaçoso com pé direito duplo, cozinha gourmet, adega, terraço com piscina privativa e spa. Acabamentos premium, tecnologia inteligente, home cinema. Prédio cinco estrelas com todos os serviços. Privacidade e sofisticação garantidas.',
      imagens: [
        require('../assets/casaImage.jpg'),
        require('../assets/casaImage.jpg'),
        require('../assets/casaImage.jpg'),
      ]
    },
  ];

  // Função para filtrar imóveis
  const imovelsFiltrados = filtroSelecionado === 'Todos' 
    ? imoveis 
    : imoveis.filter(imovel => imovel.tipo === filtroSelecionado);

  // Função para abrir modal com detalhes
  const abrirDetalhes = (imovel: any) => {
    setImovelSelecionado(imovel);
    setIndiceCarrossel(0);
    setModalVisivel(true);
  };

  // Função para lidar com scroll do carrossel
  const handleScrollCarrossel = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const indice = Math.round(scrollX / 350);
    setIndiceCarrossel(indice);
  };

  // Componente do Card de Imóvel
  const CardImovel = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.imagem} style={styles.cardImage} resizeMode="cover" />
      
      {/* Badge de tipo */}
      <View style={[
        styles.badge,
        { backgroundColor: item.tipo === 'Venda' ? '#C70039' : '#1E88E5' }
      ]}>
        <Text style={styles.badgeText}>{item.tipo}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitulo}>{item.titulo}</Text>
        
        <Text style={styles.cardPreco}>{item.preco}</Text>
        
        <View style={styles.localizacaoContainer}>
          <Ionicons name="location" size={16} color="#C70039" />
          <Text style={styles.cardLocalizacao}>{item.localizacao}</Text>
        </View>

        <View style={styles.detalhesContainer}>
          <View style={styles.detalhe}>
            <Ionicons name="bed" size={16} color="#808080" />
            <Text style={styles.detalheTexto}>{item.quartos}</Text>
          </View>
          
          <View style={styles.detalhe}>
            <Ionicons name="water" size={16} color="#808080" />
            <Text style={styles.detalheTexto}>{item.banheiros}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.botaoDetalhes}
          onPress={() => abrirDetalhes(item)}
        >
          <Text style={styles.botaoDetalhesTexto}>Ver Detalhes</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      {/* Header Vermelho com Logo */}
      <View style={styles.header}>
        <Image source={require('../assets/Logo-White.png')} style={styles.logo} resizeMode="contain"/>
      </View>

      {/* Seção de Filtros */}
      <View style={styles.filtrosSection}>
        <Text style={styles.filtroTitulo}>Filtrar por:</Text>
        <View style={styles.filtrosContainer}>
          {['Todos', 'Venda', 'Locação'].map((filtro) => (
            <TouchableOpacity
              key={filtro}
              style={[
                styles.filtroButton,
                filtroSelecionado === filtro && styles.filtroButtonActive
              ]}
              onPress={() => setFiltroSelecionado(filtro)}
            >
              <Text
                style={[
                  styles.filtroButtonText,
                  filtroSelecionado === filtro && styles.filtroButtonTextActive
                ]}
              >
                {filtro}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Contador de resultados */}
      <View style={styles.resultadosContainer}>
        <Text style={styles.resultadosTexto}>
          {imovelsFiltrados.length} imóvel{imovelsFiltrados.length !== 1 ? 's' : ''} encontrado{imovelsFiltrados.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* FlatList de Imóveis */}
      <FlatList
        data={imovelsFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CardImovel item={item} />}
        contentContainerStyle={styles.flatListContent}
        scrollEnabled={true}
      />
      <StatusBar style="dark" animated />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Header
  header: {
    backgroundColor: '#C70039',
    paddingVertical: 20,
    alignItems: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 150,
    height: 60,
  },

  // Filtros
  filtrosSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  filtroTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'FontePadrao',
    color: '#333333',
    marginBottom: 12,
  },
  filtrosContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  filtroButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  filtroButtonActive: {
    backgroundColor: '#C70039',
    borderColor: '#C70039',
  },
  filtroButtonText: {
    fontFamily: 'FontePadrao',
    fontSize: 14,
    color: '#808080',
    fontWeight: 'bold',
  },
  filtroButtonTextActive: {
    color: '#FFFFFF',
  },

  // Resultados
  resultadosContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  resultadosTexto: {
    fontFamily: 'FontePadrao',
    fontSize: 14,
    color: '#808080',
  },

  // FlatList
  flatListContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  // Card de Imóvel
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#FFFFFF',
    fontFamily: 'FontePadrao',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 16,
  },
  cardTitulo: {
    fontFamily: 'FontePadrao',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  cardPreco: {
    fontFamily: 'FontePadrao',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C70039',
    marginBottom: 10,
  },
  localizacaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  cardLocalizacao: {
    fontFamily: 'FontePadrao',
    fontSize: 13,
    color: '#666666',
    flex: 1,
  },
  detalhesContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  detalhe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detalheTexto: {
    fontFamily: 'FontePadrao',
    fontSize: 13,
    color: '#666666',
  },
  botaoDetalhes: {
    backgroundColor: '#C70039',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoDetalhesTexto: {
    fontFamily: 'FontePadrao',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
