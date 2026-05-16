import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, Image, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

//Componente de Texto
import Texto from '../componentes/Texto'

export default function Perfil() {

  // Estados dos campos de perfil
  const [nome, setNome] = useState('Vinicius Porcionato');
  const [email, setEmail] = useState('vinicius.porcionato@email.com');
  const [whatsapp, setWhatsapp] = useState('(11) 98765-4321');
  
  // Estado para modo de edição
  const [modoEdicao, setModoEdicao] = useState(false);

  // Função para lidar com mudança de foto
  const handleMudarFoto = () => {
    // Aqui você implementará a lógica de câmera/galeria
    alert('Funcionalidade de câmera será implementada');
  };

  // Função para salvar alterações
  const handleSalvar = () => {
    setModoEdicao(false);
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* Header Vermelho com Logo */}
      <View style={styles.header}>
        <Image source={require('../assets/Logo-White.png')} style={styles.logo} resizeMode="contain"/>
      </View>

      {/* Seção de Perfil */}
      <View style={styles.perfilSection}>
        
        {/* Foto de Perfil */}
        <View style={styles.fotoContainer}>
          <Image 
            source={require('../assets/casaImage.jpg')} 
            style={styles.fotoPerfil}
            resizeMode="cover"
          />
          
          {/* Botão de Câmera */}
          <TouchableOpacity 
            style={styles.botaoCamera}
            onPress={handleMudarFoto}
          >
            <Ionicons name="camera" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Título */}
        <Text style={styles.sectionTitulo}>Meu Perfil</Text>
      </View>

      {/* Campos de Informações */}
      <View style={styles.informacoesSection}>
        
        {/* Campo Nome */}
        <View style={styles.campoContainer}>
          <View style={styles.campoHeader}>
            <Ionicons name="person" size={20} color="#C70039" />
            <Text style={styles.campoLabel}>Nome</Text>
          </View>
          {modoEdicao ? (
            <TextInput
              style={styles.campoInput}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite seu nome"
            />
          ) : (
            <Text style={styles.campoValor}>{nome}</Text>
          )}
        </View>

        {/* Campo Email */}
        <View style={styles.campoContainer}>
          <View style={styles.campoHeader}>
            <Ionicons name="mail" size={20} color="#C70039" />
            <Text style={styles.campoLabel}>Email</Text>
          </View>
          {modoEdicao ? (
            <TextInput
              style={styles.campoInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu email"
              keyboardType="email-address"
            />
          ) : (
            <Text style={styles.campoValor}>{email}</Text>
          )}
        </View>

        {/* Campo WhatsApp */}
        <View style={styles.campoContainer}>
          <View style={styles.campoHeader}>
            <Ionicons name="logo-whatsapp" size={20} color="#C70039" />
            <Text style={styles.campoLabel}>WhatsApp</Text>
          </View>
          {modoEdicao ? (
            <TextInput
              style={styles.campoInput}
              value={whatsapp}
              onChangeText={setWhatsapp}
              placeholder="Digite seu WhatsApp"
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.campoValor}>{whatsapp}</Text>
          )}
        </View>
      </View>

      {/* Botões de Ação */}
      <View style={styles.botoesSection}>
        {!modoEdicao ? (
          <TouchableOpacity 
            style={styles.botaoEditar}
            onPress={() => setModoEdicao(true)}
          >
            <Ionicons name="pencil" size={18} color="#FFFFFF" />
            <Text style={styles.botaoEditarTexto}>Editar Perfil</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.botoesDuplados}>
            <TouchableOpacity 
              style={[styles.botaoAcao, styles.botaoCancelar]}
              onPress={() => setModoEdicao(false)}
            >
              <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.botaoAcao, styles.botaoSalvar]}
              onPress={handleSalvar}
            >
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
              <Text style={styles.botaoSalvarTexto}>Salvar</Text>
            </TouchableOpacity>
          </View>
        )}
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

  // Seção Perfil
  perfilSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },

  // Foto de Perfil
  fotoContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  fotoPerfil: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#C70039',
  },

  // Botão Câmera
  botaoCamera: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#C70039',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  // Título Seção
  sectionTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'FontePadrao',
    color: '#333333',
  },

  // Seção de Informações
  informacoesSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // Campo
  campoContainer: {
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  campoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },

  campoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'FontePadrao',
    color: '#C70039',
  },

  campoValor: {
    fontSize: 16,
    fontFamily: 'FontePadrao',
    color: '#333333',
    lineHeight: 24,
  },

  campoInput: {
    borderWidth: 2,
    borderColor: '#C70039',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'FontePadrao',
    fontSize: 16,
    color: '#333333',
  },

  // Seção Botões
  botoesSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  botaoEditar: {
    backgroundColor: '#C70039',
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  botaoEditarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'FontePadrao',
  },

  botoesDuplados: {
    flexDirection: 'row',
    gap: 12,
  },

  botaoAcao: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  botaoCancelar: {
    backgroundColor: '#E0E0E0',
    borderWidth: 2,
    borderColor: '#808080',
  },

  botaoCancelarTexto: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'FontePadrao',
  },

  botaoSalvar: {
    backgroundColor: '#C70039',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  botaoSalvarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'FontePadrao',
  },
});
